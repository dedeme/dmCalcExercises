/*
 * Copyright 18-Aug-2013 ºDeme
 *
 * This file is part of 'dmCalcExercises'.
 *
 * 'dmCalcExercises' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * 'dmCalcExercises' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'dmCalcExercises'.  If not, see <http://www.gnu.org/licenses/>.
 */

/*globals goog, dmjs, packsTest, calex, is1 */

goog.provide("sessionTest");

goog.require("dmjs.Test");
goog.require("calex.Pack");
goog.require("calex.Packs");
goog.require("calex.Group");
goog.require("calex.Session");
goog.require("calex.Historic");
goog.require("calex.HistoricEntry");
goog.require("calex.maker");
goog.require("calex.MakerConstants");

(function (ns) {
  "use strict";

  var
    maker;

  maker = function (ex, p) {
    return calex.maker.run(
      calex.MakerConstants.some(),
      ex,
      p);
  }

  ns.run = function () {
    var
      historic,
      exercise,
      packs,
      group,
      ss,
      t;

    t = new dmjs.Test("Session tests");

    packs = new calex.Packs([
      new calex.Pack(
        "si1", 1, /** @private @type{!Array} */ (eval("si1Questions()"))
      ),
      new calex.Pack(
        "si2", 1, /** @private @type{!Array} */ (eval("si2Questions()"))
      )
    ]);

    group = new calex.Group(packs, [
      ["si1", 1]
    , ["si2", 2]
    ]);

    ss = new calex.Session(maker, "", "test", group, historic, exercise);

    t.yes(group.eq(ss.group()));
    t.yes(new calex.Historic([]).eq(ss.historic()));
    t.yes(3, ss.maxPoints());
    t.yes(ss.eq(calex.Session.restore(maker, ss.serialize())));

    historic = new calex.Historic([
      new calex.HistoricEntry("q1", "s1", "r1", 2, 2),
      new calex.HistoricEntry("q2", "s2", "r2", 2, 1),
      new calex.HistoricEntry("q3", "s3", "r3", 3, 0)
    ]);
    exercise = ss.exercise();

    ss = new calex.Session(maker, "", "test", group, historic, exercise);

    t.yes(group.eq(ss.group()));
    t.yes(historic.eq(ss.historic()));
    t.yes("q1", ss.historic().entries()[0].question());
    t.yes("s1", ss.historic().entries()[0].solution());
    t.yes("r3", ss.historic().entries()[2].response());
    t.yes(2, ss.historic().entries()[1].maxPoints());
    t.yes(1, ss.historic().entries()[1].points());
    t.yes(exercise.eq(ss.exercise()));
    t.yes(ss.eq(calex.Session.restore(maker, ss.serialize())));

    ss.resolve("33", 1);
    t.yes("33", ss.historic().entries()[3].response());
    t.yes(1, ss.historic().entries()[3].points());
//    t.yes("4", ss.exercise().question());
//    t.yes("same", ss.exercise().solution());
//    t.yes("5", ss.exercise().solutionValue());
    t.yes(1, ss.exercise().maxPoints());

    t.log();
  };
}(sessionTest));
