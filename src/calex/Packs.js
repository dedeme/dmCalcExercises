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

/*globals goog, dmjs, calex */


/** Group of pack */
goog.provide("calex.Packs");

goog.require("calex.Pack");
goog.require("dmjs.It");

/**
 * @constructor
 * @param {!Array.<!calex.Pack>} packs
 */
calex.Packs = function (packs) {
  "use strict";

  var
    it;

  it = dmjs.It.from;

  /**
   * @return {!Array.<!calex.Pack>}
   */
  this.packs = function () {
    return packs;
  };

  /**
   * If calling fails throws an error.
   * @param {!string} name
   * @return {!calex.Pack}
   */
  this.pack = function (name) {
    var
      r;

    r = it(packs).find(function (e) {
      return e.name() === name;
    });

    if (r === undefined) {
      throw new Error("Pack '" + name + "' not found");
    }
    return r;
  };

  /**
   * @param {?calex.Packs} other
   * @return {!boolean}
   */
  this.eq = function (other) {
    if (other) {
      return it(packs).eq(it(other.packs()), function (pk1, pk2) {
        return pk1.eq(pk2);
      });
    }
    return false;
  };

  /** @return {!string} */
  this.serialize = function () {
    var
      arr;
    arr = dmjs.It.from(packs).map(function (pk) {
      return pk.serialize();
    }).toArray();
    return JSON.stringify(arr);
  };

};

/**
 * @param {!string} serial
 * @return {!calex.Packs}
 */
calex.Packs.restore = function (serial) {
  "use strict";

  var
    jarr,
    arr;

  jarr = /** @private @type{!Array} */ (JSON.parse(serial));
  arr = dmjs.It.from(jarr).map(function (s) {
    return calex.Pack.restore(s);
  }).toArray();

  return new calex.Packs(arr);
};
