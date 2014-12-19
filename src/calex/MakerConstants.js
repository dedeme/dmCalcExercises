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

/** Constants used by maker.run() */
goog.provide("calex.MakerConstants");


/**
 * @constructor
 * @param {!Array.<!string>} people
 * @param {!Array.<!string>} banks
 * @param {!Array.<!string>} enterprises
 * @param {!Array.<!string>} littleEnterprises
 */
calex.MakerConstants = function (
  people,
  banks,
  enterprises,
  littleEnterprises
) {
  "use strict";

  /** @return {!Array.<!string>} */
  this.people = function () {
    return people;
  };

  /** @param {!Array.<!string>} values */
  this.setPeople = function (values) {
    people = values;
  };

  /** @return {!Array.<!string>} */
  this.banks = function () {
    return banks;
  };

  /** @param {!Array.<!string>} values */
  this.setBanks = function (values) {
    banks = values;
  };

  /** @return {!Array.<!string>} */
  this.enterprises = function () {
    return enterprises;
  };

  /** @param {!Array.<!string>} values */
  this.setEnterprises = function (values) {
    enterprises = values;
  };

  /** @return {!Array.<!string>} */
  this.littleEnterprises = function () {
    return littleEnterprises;
  };

  /** @param {!Array.<!string>} values */
  this.setLittleEnterprises = function (values) {
    littleEnterprises = values;
  };

};

/**
 * Some constants
 * @return {!calex.MakerConstants}
 */
calex.MakerConstants.some = function () {
  "use strict";

  return new calex.MakerConstants(
    [ "María", "Laura", "Lucía", "Cristina", "Paula", "Marta", "Laura",
      "Sara", "Andrea", "Alba", "Ana", "Sandra", "Nerea", "Filomena",
      "Apolonio", "David", "Alejandro", "Daniel", "Javier", "Pablo", "Sergio",
      "Adrián", "Carlos", "Álvaro", "Iván", "Jorge", "Jose Luis", "Fernando",
      "Teodoro", "Anastasia" ],
    [ "Banco Popular", "Citibank", "Banco de Santander", "BBVA", "Bankia",
      "Openbank", "Banesto", "Bankinter", "Deutsche Bank", "Credit Suisse",
      "Banco Pastor", "BNP Paribas" ],
    [ "Movistar", "Iberdrola", "Inditex", "Repsol", "Mapfre", "Endesa",
      "Enagas", "FCC", "Acerinox", "Abertis", "Acciona", "IAG" ],
    [ "Fetinsa", "Reparaciones, S.L.", "Hnos. Santos", "Cartinsa",
      "Sara, S.A.", "Bloques, S.A.", "Viajes Serra",
      "Inhumaciones Franky, S.L." ]
  );
};
