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

/** Several utilities */
goog.provide("calex.util");

goog.require("dmjs.It");

(function (ns) {
  "use strict";

  /**
   * Returns an It of 'selectNumber' random numbers of range [0-totalNumber>.
   *
   * @param {!number} selectNumber
   * @param {!number} totalNumber
   * @return {!Array.<!number>}
   */
  ns.nOfN = function (selectNumber, totalNumber) {
    var
      createRandomArray,
      r;

    createRandomArray = function (n) {
      return dmjs.It.range(n).shuffle().toArray();
    };

    r = [];
    while (selectNumber > totalNumber) {
      r = r.concat(createRandomArray(totalNumber));
      selectNumber -= totalNumber;
    }

    return r.concat(
      dmjs.It.from(createRandomArray(totalNumber)).take(selectNumber).toArray()
    );
  };

}(calex.util));
