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

/** Student session */
goog.provide("calex.Session");

goog.require("calex.Group");
goog.require("calex.Historic");
goog.require("calex.Exercise");
goog.require("dmjs.It");
goog.require("dmjs.Dec");

/**
 * @constructor
 * @param {!function (!string, !number):!calex.Exercise} maker Parameters of
 *  function are: 'exercise text' and 'exercise ponderation'.
 * @param {!string} user
 * @param {!string} storeName
 * @param {!calex.Group} group
 * @param {!calex.Historic=} historic
 * @param {!calex.Exercise=} exercise
 */
calex.Session = function (maker, user, storeName, group, historic, exercise) {
  "use strict";

  var
    groupElement;

  historic = historic || new calex.Historic([]);

  if (!exercise) {
    groupElement = group.next();
    exercise = maker(groupElement.exercise(), groupElement.ponderation());
  }

  /** @return {!string} */
  this.user = function () {
    return user;
  };

  /** @return {!string} */
  this.storeName = function () {
    return storeName;
  };

  /** @return {!calex.Group} */
  this.group = function () {
    return group;
  };

  /** @return {!calex.Historic} */
  this.historic = function () {
    /*jslint closure: true */
    return /** @private @type{!calex.Historic} */ (historic);
  };

  /** @return {!calex.Exercise} */
  this.exercise = function () {
    /*jslint closure: true */
    return /** @private @type{!calex.Exercise} */ (exercise);
  };

  /** @return {!number} */
  this.maxPoints = function () {
    return group.maxPoints();
  };

  /** @return {{mark : number, maxMark : number}} */
  this.mark = function () {
    var
      points,
      max,
      maxmax,
      maxMark,
      mark;

    points = 0;
    max = 0;
    mark = 0;
    maxMark = 0;
    dmjs.It.from(historic.entries()).each(function (e) {
      points += e.points();
      max += e.maxPoints();
      maxmax = (max > group.maxPoints()) ? max : group.maxPoints();
      mark = 10 * points / maxmax;
      maxMark = (mark > maxMark) ? mark : maxMark;
    });
    return {"mark" : mark, "maxMark" : maxMark};
  };

  /**
   * Returns mark of historic entry number 'index'.
   * @param {!number} index (first is 0)
   * @param {!number} dec Number of decimals to round.
   * @return {!dmjs.Dec}
   */
  this.markEntry = function (index, dec) {
    var
      pointsPrevious,
      points,
      maxPrevious,
      max,
      maxmax,
      markPrevious,
      mark;

    pointsPrevious = 0;
    points = 0;
    maxPrevious = 0;
    max = 0;

    dmjs.It.from(historic.entries()).take(index + 1).eachIx(function (e, ix) {
      if (ix === index) {
        max = maxPrevious + e.maxPoints();
        points = pointsPrevious + e.points();
      } else {
        maxPrevious += e.maxPoints();
        pointsPrevious += e.points();
      }
    });

    maxmax = (maxPrevious > group.maxPoints())
      ? maxPrevious
      : group.maxPoints();
    markPrevious = 10 * pointsPrevious / maxmax;

    maxmax = (max > group.maxPoints()) ? max : group.maxPoints();
    mark = 10 * points / maxmax;

    return new dmjs.Dec(
      new dmjs.Dec(mark, dec).value() - new dmjs.Dec(markPrevious, dec).value(),
      dec
    );
  };

  /** @return {!number} */
  this.responseCount = function () {
    return historic.entries().length;
  };

  /**
   * Annotates on historic an answered exercise and creates another new.
   *
   * @param {!string} response
   * @param {!number} points
   */
  this.resolve = function (response, points) {
    historic.entries().push(
      new calex.HistoricEntry(
        exercise.question(),
        exercise.solution(),
        response,
        exercise.maxPoints(),
        points
      )
    );
    groupElement = group.next();
    exercise = maker(groupElement.exercise(), groupElement.ponderation());
  };

  /**
   * @param {?calex.Session} other
   * @return {!boolean}
   */
  this.eq = function (other) {
    if (other) {
      return storeName === other.storeName() &&
        group.eq(other.group()) &&
        historic.eq(other.historic()) &&
        exercise.eq(other.exercise());
    }
    return false;
  };

  /** @return {!string} */
  this.serialize = function () {
    return JSON.stringify([
      user,
      storeName,
      group.serialize(),
      historic.serialize(),
      exercise.serialize()
    ]);
  };

};

/**
 * @param {!function (!string, !number):!calex.Exercise} maker Parameters of
 *  function are: 'exercise text' and 'exercise ponderation'.
 * @param {!string} serial
 * @return {!calex.Session}
 */
calex.Session.restore = function (maker, serial) {
  "use strict";

  var
    rs;

  rs = JSON.parse(serial);
  return new calex.Session(
    maker,
    rs[0],
    rs[1],
    calex.Group.restore(rs[2]),
    calex.Historic.restore(rs[3]),
    calex.Exercise.restore(rs[4])
  );
};
