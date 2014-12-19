/*
 * Copyright 19-Aug-2013 ºDeme
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

/** Responses historic */
goog.provide("calex.Historic");

goog.require("calex.HistoricEntry");
goog.require("dmjs.It");

/**
 * @constructor
 * @param {!Array.<calex.HistoricEntry>} entries
 */
calex.Historic = function (entries) {
  "use strict";

  var
    it;

  it = dmjs.It.from;

  /** @return {!Array.<calex.HistoricEntry>} */
  this.entries = function () {
    return entries;
  };

  /**
   * @param {?calex.Historic} other
   * @return {!boolean}
   */
  this.eq = function (other) {
    if (other) {
      return it(entries).eq(it(other.entries()), function (e1, e2) {
        return e1.eq(e2);
      });
    }
    return false;
  };

  /** @return {!string} */
  this.serialize = function () {
    return JSON.stringify(it(entries).map(function (e) {
      return e.serialize();
    }).toArray());
  };
};

/**
 * @param {!string} serial
 * @return {!calex.Historic}
 */
calex.Historic.restore = function (serial) {
  "use strict";

  var
    rs;

  rs = /** @private @type{!Array} */ (JSON.parse(serial));
  return new calex.Historic(
    dmjs.It.from(rs).map(function (s) {
      return calex.HistoricEntry.restore(s);
    }).toArray()
  );
};

