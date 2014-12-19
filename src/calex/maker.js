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

/** Exercises constructor */
goog.provide("calex.maker");

goog.require("dmjs.It");
goog.require("dmjs.Dec");

(function (ns) {
  "use strict";

  var
    it,
    Dec,
    vars,
    question,
    solution,
    solutionValue,
    replaceAll,
    replaceVar,
    replaceDec,
    processSolution,
    processName,
    processNumberConstant,
    processNumber,
    processCapital,
    processPercentage,
    processPerThousand,
    processYear,
    processMonth,
    processDay,
    processCalculus,
    processCalculusTx,
    processImage;

  it = dmjs.It.from;
  Dec = dmjs.Dec;

  replaceAll = function (s, variable, value) {
    return s.split(variable).join(value);
  };

  /**
   * @private
   * @param {!string} variable,
   * @param {!string} value
   */
  replaceVar = function (variable, value) {
    variable = "<!" + variable + ">";
    vars = it(vars).map(function (v) {
      return replaceAll(v, variable, value);
    }).toArray();
    question = replaceAll(question, variable, value);
    solution = replaceAll(solution, variable, value);
  };

  /**
   * @private
   * @param {!string} variable
   * @param {!dmjs.Dec} value
   */
  replaceDec = function (variable, value) {
    variable = "<!" + variable + ">";
    vars = it(vars).map(function (v) {
      return replaceAll(v, variable, value.toString());
    }).toArray();
    question = replaceAll(question, variable, value.toEs());
    solution = replaceAll(solution, variable, value.toEs());
  };

  processSolution = function (els) {
    if (els.length !== 5) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    try {
      solutionValue = JSON.stringify([
        dmjs.Dec.from(els[2], parseInt(els[3], 10)).serialize(),
        els[4]
      ]);
    } catch (e) {
      throw new Error("'" + vars[0] + "': " + e.message);
    }
  };

  processName = function (els, arr) {
    if (els.length !== 2) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    replaceVar(els[0], arr[parseInt(Math.random() * arr.length, 10)]);
  };

  processNumberConstant = function (els) {
    if (els.length !== 4) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    try {
      replaceDec(els[0], dmjs.Dec.from(els[2], parseInt(els[3], 10)));
    } catch (e) {
      throw new Error("'" + vars[0] + "': bad number value\n(" +
        e.message + ")");
    }
  };

  processNumber = function (els) {
    if (els.length !== 5) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    try {
      replaceDec(els[0],
        new Dec(dmjs.Dec.rnd(parseFloat(els[2]), parseFloat(els[3])),
          parseInt(els[4], 10)));
    } catch (e) {
      throw new Error("'" + vars[0] + "': bad number value\n(" +
        e.message + ")");
    }
  };

  processCapital = function (els) {
    if (els.length !== 2) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    els.push("5000");
    els.push("75000");
    els.push("2");
    processNumber(els);
  };

  processPercentage = function (els) {
    var
      d;

    if (els.length !== 2) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    d = new Dec(dmjs.Dec.rnd(2, 12), 2);
    replaceDec(els[0] + ".%", d);
    replaceDec(els[0], new Dec(d.value() / 100, 4));
  };

  processPerThousand = function (els) {
    var
      d;

    if (els.length !== 2) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    d = new Dec(dmjs.Dec.rnd(2, 12), 2);
    replaceDec(els[0] + ".%", d);
    replaceDec(els[0], new Dec(d.value() / 1000, 5));
  };

  processYear = function (els) {
    if (els.length !== 2) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    els.push("2");
    els.push("12");
    els.push("0");
    processNumber(els);
  };

  processMonth = function (els) {
    if (els.length !== 2) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    if (parseInt(Math.random() * 2, 10) === 0) {
      els.push("3");
      els.push("12");
    } else {
      els.push("13");
      els.push("22");
    }
    els.push("0");
    processNumber(els);
  };

  processDay = function (els) {
    if (els.length !== 2) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    if (parseInt(Math.random() * 2, 10) === 0) {
      els.push("15");
      els.push("360");
    } else {
      els.push("366");
      els.push("711");
    }
    els.push("0");
    processNumber(els);
  };

  processCalculus = function (els) {
    if (els.length !== 4) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    replaceDec(els[0], new Dec(
      /** @private @type{!number} */
      (eval(els[2])),
      parseInt(els[3], 10)
    ));
  };

  processCalculusTx = function (els) {
    if (els.length !== 3) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    replaceVar(els[0], /** @private @type{!string} */ (eval(els[2])));
  };

  processImage = function (els) {
    if (els.length !== 3) {
      throw new Error("'" + vars[0] + "': bad number of elements");
    }
    replaceVar(els[0], "<img src='" + els[2] + "' border='1'>");
  };

  /**
   * Generates an exercise.
   * The paramenter solutionValue of returned exercise is a 'JSON.serialized'
   * array [Dec.serialize(), string] with [value, unit],
   *
   * @param {!calex.MakerConstants} cons
   * @param {!string} exercise
   * @param {!number} maxPoints
   * @return {!calex.Exercise}
   */
  ns.run = function (cons, exercise, maxPoints) {
    var
      v,
      parts,
      varEls;

    parts = exercise.split("<//>");
    if (parts.length !== 3) {
      throw new Error("'" + exercise + "'\nNumber of '<//>' not valid");
    }

    vars = parts[0].split("</>");
    question = parts[1];
    solution = parts[2];
    solutionValue = "";
    while (vars.length > 0) {
      v = vars.shift();
      if (v !== "") {
        varEls = v.split(";");
        if (varEls.length < 2) {
          throw new Error("'" + v + "': type is missing");
        }
        switch (varEls[1]) {
        case "$":
          processSolution(varEls);
          break;
        case "em":
          processName(varEls, cons.enterprises());
          break;
        case "lem":
          processName(varEls, cons.littleEnterprises());
          break;
        case "pe":
          processName(varEls, cons.people());
          break;
        case "ba":
          processName(varEls, cons.banks());
          break;
        case "nc":
          processNumberConstant(varEls);
          break;
        case "n":
          processNumber(varEls);
          break;
        case "c":
          processCapital(varEls);
          break;
        case "%":
          processPercentage(varEls);
          break;
        case "%0":
          processPerThousand(varEls);
          break;
        case "a":
          processYear(varEls);
          break;
        case "y":
          processYear(varEls);
          break;
        case "m":
          processMonth(varEls);
          break;
        case "d":
          processDay(varEls);
          break;
        case "=":
          processCalculus(varEls);
          break;
        case ":=":
          processCalculusTx(varEls);
          break;
        case "i":
          processImage(varEls);
          break;
        default:
          throw new Error("'" + v + "': type is unknown");
        }
      }
    }

    if (solutionValue === "") {
      throw new Error("Solution value is missing");
    }
    return new calex.Exercise(question, solution, solutionValue, maxPoints);
  };

}(calex.maker));
