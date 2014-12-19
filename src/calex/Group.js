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

/** Set of questions from different packs */
goog.provide("calex.Group");

goog.require("dmjs.It");
goog.require("calex.util");
goog.require("calex.GroupElement");

/**
 * Group of exercises for a test.
 *
 * @constructor
 * @param {!calex.Packs} packs Packages from extracting group.
 * @param {!Array.<!Array.<!string|!number>>} selection For example:
 *  [["is1", 4"], ["is2", 6]]
 * @param {!Array.<calex.GroupElement>=} exercisesGroup
 * @param {!number=} exercisesIndex
 */
calex.Group = function (packs, selection, exercisesGroup, exercisesIndex) {
  "use strict";

  var
    it,
    group,
    index,
    createGroup,
    total;

  it = dmjs.It.from;

  createGroup = function () {
    return it(selection).reduce(dmjs.It.empty(), function (seed, sel) {
      return seed.addIt(
        it(calex.util.nOfN(sel[1], packs.pack(sel[0]).exercises().length))
          .map(function (n) {
            return [sel[0], n];
          })
      );
    }).shuffle();
  };

  group = exercisesGroup || createGroup().toArray();

  total = group.length;
  index = exercisesIndex || 0;

  if (total === 0) {
    throw new Error("Selection can not be empty");
  }

  /**
   * Returns next exercise.
   * @return {!calex.GroupElement}
   */
  this.next = function () {
    var
      sel,
      pack;

    if (index === total) {
      group = createGroup().toArray();
      index = 0;
    }
    sel = group[index++];
    pack = packs.pack(sel[0]);
    return new calex.GroupElement(
      pack.exercises()[sel[1]],
      pack.ponderation()
    );
  };

  /**
   * Returns the total number of one cycle.
   *
   * @return {!number}
   */
  this.size = function () {
    return total;
  };

  /**
   * Returns the maximum of point that it can be gotten.
   * @return {!number}
   */
  this.maxPoints = function () {
    return it(group).reduce(0, function (seed, sel) {
      return seed + packs.pack(sel[0]).ponderation();
    });
  };

  /** @return {!calex.Packs} */
  this.packs = function () {
    return packs;
  };

  /** @return {!Array.<!Array.<!string|!number>>} See constructor. */
  this.selection = function () {
    return selection;
  };

  /**
   * @return {!Array.<!Array.<!string|!number>>} See constructor.
   */
  this.group = function () {
    return group;
  };

  /**
   * Index of element which will be showed by next ()
   * @return {!number}
   */
  this.index = function () {
    return index;
  };

  /**
   * @param {?calex.Group} other
   * @return {!boolean}
   */
  this.eq = function (other) {
    if (other) {
      return packs.eq(other.packs()) &&
        it(selection).eq(it(other.selection()), function (s1, s2) {
          return s1[0] === s2[0] && s1[1] === s2[1];
        }) &&
        it(group).eq(it(other.group()), function (s1, s2) {
          return s1[0] === s2[0] && s1[1] === s2[1];
        }) &&
        index === other.index();
    }
    return false;
  };

  /**
   * @return {!string}
   */
  this.serialize = function () {
    return JSON.stringify([
      packs.serialize(),
      selection,
      group,
      index
    ]);
  };

};

/**
 * @param {!string} serial
 * @return {!calex.Group}
 */
calex.Group.restore = function (serial) {
  "use strict";

  var
    rs;

  rs = JSON.parse(serial);
  return new calex.Group(
    calex.Packs.restore(rs[0]),
    rs[1],
    rs[2],
    rs[3]
  );
};
