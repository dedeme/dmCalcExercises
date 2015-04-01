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
goog.require("dmjs.cryp");
goog.require("dmjs.Date");

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

  /**
   * Encodes a pair (id, userName)
   * @param {!string} id
   * @param {!string} userName
   * @return {!string}
   */
  ns.setUserKey = function (id, userName) {
    var
      user;

    user = {"id" : id, "userName" : userName};

    return dmjs.cryp.autoCryp(4, JSON.stringify(user));
  };

  /**
   * Decodes a user's key created with 'setUserKey()'
   * @param {!string} key Key codified with 'setUserKey()'
   * @return {!Object.<!string, !string>} This object has next values:
   * <pre>
   * "id" : string
   * "userName" : string
   * </pre>
   */
  ns.getUserKey = function (key) {
    var
      r;

    r = /** @private @type {!Object.<!string, !string>} */
      (JSON.parse(dmjs.cryp.autoDecryp(key)));
    return r;
  };

  /**
   * Returns a unique key for identifying an user-exercise.
   * @param {!string} userId
   * @param {!string} userName
   * @param {!string} exerciseName Identifier of exercise.
   * @param {!dmjs.Dec} mark Mark of exercise
   * @return {!string} A unique key.
   */
  ns.markKey = function (userId, userName, exerciseName, mark) {
    var
      key,
      data;

    data = JSON.stringify({
      "userId" : userId,
      "userName" : userName,
      "date" : new dmjs.Date().toString(),
      "exerciseName" : exerciseName,
      "mark" : mark.toEs()
    });
    key = dmjs.cryp.keyCrypAll(data, 15);

    return key + dmjs.cryp.cryp(key, data);
  };

  /**
   * Tests if a key created with 'markKey()' is valid.
   * @param {!string} key Key to tests
   * @return {!boolean} True if key is valid.
   */
  ns.markKeyControl = function (key) {
    var
      k,
      msg;

    if (key < 30) {
      return false;
    }
    k = key.substring(0, 15);
    msg = dmjs.cryp.decryp(k, key.substring(15));
    return dmjs.cryp.keyCrypAll(msg,  15) === k;
  };

  /**
   * Returns value encoded in 'key' with 'markKey()'
   * @param {!string} key
   * @return {!Object.<!string, !string>|null} This object has next values:
   * <pre>
   * "userId" : string
   * "userName" : string
   * "date" : string
   * "exerciseName" : string
   * "mark" : string
   * </pre>
   */
  ns.markKeyValue = function (key) {
    var
      k,
      r;

    if (key < 30) {
      return null;
    }
    k = key.substring(0, 15);

    try {
      r = /** @private @type {!Object.<!string, !string>} */
        (JSON.parse(dmjs.cryp.decryp(k, key.substring(15))));
      return r;
    } catch (ex) {
      return null;
    }

  };

  /**
   * Utility to easy copying a text line on clipboard.
   * @param {!string} text Text to copy.
   */
  ns.clip = function (text) {
    window.prompt(
      "Para copiar al portapapeles pulsa [Ctrl]+[C] y después [Entrar]",
      text
    );
  };

}(calex.util));
