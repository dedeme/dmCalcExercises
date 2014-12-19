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

/** Group element */
goog.provide("calex.GroupElement");


/**
 * @constructor
 * @param {!string} exercise
 * @param {!number} ponderation
 */
calex.GroupElement = function (exercise, ponderation) {
  "use strict";

  /** @return {!string} */
  this.exercise = function () {
    return exercise;
  };

  /** @return {!number} ponderation */
  this.ponderation = function () {
    return ponderation;
  };
};
