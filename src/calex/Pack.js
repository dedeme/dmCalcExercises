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


/** Collection of exercises in string format. */
goog.provide("calex.Pack");

goog.require("dmjs.It");

/**
 * @constructor
 * @param {!string} name
 * @param {!number} ponderation
 * @param {!Array.<!string>} exercises
 */
calex.Pack = function (name, ponderation, exercises) {
  "use strict";

  /**
   * @return {!string}
   */
  this.name = function () {
    return name;
  };

  /**
   * @return {!number}
   */
  this.ponderation = function () {
    return ponderation;
  };

  /**
   * @return {!Array.<!string>}
   */
  this.exercises = function () {
    return exercises;
  };

  /**
   * @param {?calex.Pack} other
   * @return {!boolean}
   */
  this.eq = function (other) {
    if (other) {
      return name === other.name();
    }
    return false;
  };

  /** @return {!string} */
  this.serialize = function () {
    return JSON.stringify([name, ponderation, exercises]);
  };
};

/**
 * @param {!string} serial
 * @return {!calex.Pack}
 */
calex.Pack.restore = function (serial) {
  "use strict";

  var
    rs;

  rs = JSON.parse(serial);
  return new calex.Pack(rs[0], rs[1], rs[2]);
};

