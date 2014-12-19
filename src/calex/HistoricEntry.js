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

/** Historic entry */
goog.provide("calex.HistoricEntry");


/**
 * @constructor
 * @param {!string} question
 * @param {!string} solution
 * @param {!string} response
 * @param {!number} maxPoints
 * @param {!number} points
 */
calex.HistoricEntry = function (
  question,
  solution,
  response,
  maxPoints,
  points
) {
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
  this.response = function () {
    return response;
  };

  /** @return {!number} */
  this.maxPoints = function () {
    return maxPoints;
  };

  /** @return {!number} */
  this.points = function () {
    return points;
  };

  /**
   * @param {?calex.HistoricEntry} other
   * @return {!boolean}
   */
  this.eq = function (other) {
    if (other) {
      return question === other.question() &&
        solution === other.solution() &&
        response === other.response() &&
        maxPoints === other.maxPoints() &&
        points === other.points();
    }
    return false;
  };

  /** @return {!string} */
  this.serialize = function () {
    return JSON.stringify([question, solution, response, maxPoints, points]);
  };
};

/**
 * @param {!string} serial
 * @return {!calex.HistoricEntry}
 */
calex.HistoricEntry.restore = function (serial) {
  "use strict";

  var
    rs;

  rs = JSON.parse(serial);
  return new calex.HistoricEntry(rs[0], rs[1], rs[2], rs[3], rs[4]);
};

