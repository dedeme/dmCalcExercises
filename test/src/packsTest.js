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

goog.provide("packsTest");

goog.require("dmjs.Test");
goog.require("calex.Pack");
goog.require("calex.Packs");
goog.require("calex.Group");

(function (ns) {
  "use strict";

  ns.run = function () {
    var
      pack1,
      pack2,
      packs,
      group,
      t;

    t = new dmjs.Test("Packs tests");

    pack1 = new calex.Pack("si1", 1,
      /** @private @type{!Array} */ (eval("si1Questions()")));
    pack2 = new calex.Pack("si2", 1,
      /** @private @type{!Array} */ (eval("si2Questions()")));

    t.yes(pack1.eq(calex.Pack.restore(pack1.serialize())));
    t.yes(pack2.eq(calex.Pack.restore(pack2.serialize())));

    packs = new calex.Packs([pack1, pack2]);

    t.yes(2, packs.packs().length);
    t.yes(10, packs.pack("si1").exercises().length);
    t.yes(24, packs.pack("si2").exercises().length);
    t.yes(packs.eq(calex.Packs.restore(packs.serialize())));

    group = new calex.Group(packs, [
      ["si1", 1]
    , ["si2", 2]
    ]);

    t.yes(3, group.size());
    t.yes(group.eq(calex.Group.restore(group.serialize())));

    group.next();
    t.yes(group.eq(calex.Group.restore(group.serialize())));
    t.yes(1, group.index());

    t.log();
  };

}(packsTest));
