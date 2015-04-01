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

goog.provide("utilTest");

goog.require("dmjs.Test");
goog.require("calex.util");
goog.require("dmjs.Dec");

(function (ns) {
  "use strict";

  ns.run = function () {
    var
      key1,
      data,
      t;

    t = new dmjs.Test("util tests");

    key1 = calex.util.setUserKey("1241", "Jose Mª Rebollo Rebollo");
    t.yes(calex.util.getUserKey(key1)["id"], "1241");
    t.yes(calex.util.getUserKey(key1)["userName"],
      "Jose Mª Rebollo Rebollo");
    key1 = calex.util.setUserKey("", "");
    t.yes(calex.util.getUserKey(key1)["id"], "");
    t.yes(calex.util.getUserKey(key1)["userName"], "");

    key1 = calex.util.markKey("22", "Peter", "esto es", new dmjs.Dec(2.10, 2));
    t.yes(calex.util.markKeyControl(key1));
    t.yes(calex.util.markKeyControl(
      "160a86520f342d91050a290d576140dab810ff20a03ca74b10f1eff5b1a80c1ee9b929eff18478866718fd256d19d66cd0b73c9c430c34098c2350193e9f75e5301f60491f1b7220bb361b75fd0121064e37b8e7cf98962b5c2903dee465b3fb96ad30eb9"
    ));
    t.not(calex.util.markKeyControl(key1 + "a"));
    t.not(calex.util.markKeyControl(
      "160a86520f342d91050a290d576140dab810ff20a03ca74b10f1eff5b1a80c1ee9" +
        "c929eff18478866718fd256d19d66cd0b73c9c430c34098c2350193e9f75e530" +
        "1f60491f1b7220bb361b75fd0121064e37b8e7cf98962b5c2903dee465b3fb96" +
        "ad30eb9"
    ));

    data = calex.util.markKeyValue(key1);
    t.yes(data["userId"], "22");
    t.yes(data["userName"], "Peter");
    t.yes(data["date"].length, 10);
    t.yes(data["exerciseName"], "esto es");
    t.yes(data["mark"], "2,10");

    t.log();
  };

}(utilTest));
