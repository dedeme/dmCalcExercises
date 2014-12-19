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

/** Current exercise */
goog.provide("calex.Exercise");


/**
 * @constructor
 * @param {!string} question
 * @param {!string} solution
 * @param {!string} solutionValue
 * @param {!number} maxPoints
 */
calex.Exercise = function (question, solution, solutionValue, maxPoints) {
  "use strict";

  /** @return {!string} */
  this.question = function () {
    return question;
  };

  /** @return {!string} */
  this.solution = function () {
    return solution;
  };

  /** @return {!string} */
  this.solutionValue = function () {
    return solutionValue;
  };

  /** @return {!number} */
  this.maxPoints = function () {
    return maxPoints;
  };

  /**
   * @param {?calex.Exercise} other
   * @return {!boolean}
   */
  this.eq = function (other) {
    if (other) {
      return question === other.question() &&
        solution === other.solution() &&
        solutionValue === other.solutionValue() &&
        maxPoints === other.maxPoints();
    }
    return false;
  };

  /** @return {!string} */
  this.serialize = function () {
    return JSON.stringify([question, solution, solutionValue, maxPoints]);
  };
};

/**
 * @param {!string} serial
 * @return {!calex.Exercise}
 */
calex.Exercise.restore = function (serial) {
  "use strict";

  var
    rs;

  rs = JSON.parse(serial);
  return new calex.Exercise(rs[0], rs[1], rs[2], rs[3]);
};
