/*
 * Copyright 18-aug-2013 ºDeme
 *
 * This file is part of 'GA2'.
 *
 * 'GA2' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * 'GA2' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'GA2'.  If not, see <http://www.gnu.org/licenses/>.
 */

/** Retrieves questions. */
function si1Questions() {
  var
    q;

  q = [];

  q.push("img;i;formulas/is/isInteres2.png</>c0;c</>i;%</>n;n;3;5;0</>I;=;<!c0>*<!i>*<!n>;2</>;$;<!I>;2;euros<//><p>Calcular el interés total que en <b>capitalización simple</b> producen <!c0>€ al <!i.%>% anual durante <!n> años.</p> <//> <p><b>Datos</b>:</p> <p> C<sub>0</sub> = <!c0>€<br> i = <!i><br> n = <!n> años<br> I<sub>T</sub>= ?€ </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>I<sub>T</sub> = <!I>€</p> ");

  q.push("img;i;formulas/is/isCapitalizacion.png</>c0;c</>i;%</>n;n;3;5;0</>Cn;=;<!c0>+<!c0>*<!i>*<!n>;2</>;$;<!Cn>;2;euros<//><p>Calcular el montante que en <b>capitalización simple</b> producen <!c0>€ al <!i.%>% anual durante <!n> años.</p> <//> <p><b>Datos</b>:</p> <p>C<sub>0</sub> = <!c0>€<br> i = <!i><br> n = <!n> años<br> C<sub>n</sub>= ?€ </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>C<sub>n</sub> = <!Cn>€</p> ");

  q.push("img;i;formulas/is/isActualizacion.png</>Cn;c</>i;%</>n;n;3;5;0</>C0;=;<!Cn>/(1+<!i>*<!n>);2</>I;=;<!Cn>-<!C0>;2</>;$;<!C0>;2;euros<//><p>Un inversor sabe que ha obtenido en <b>capitalización simple</b> un montante final de <!Cn>€ de los que <!I> corresponden a intereses. ¿Cuál fue el capital inicial de la operación?</p> <//> <p><b>Datos</b>:</p> <p>C<sub>n</sub> = <!Cn>€<br> I<sub>T</sub> = <!I><br> C<sub>0</sub>= ?€ </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>C<sub>0</sub> = <!C0>€</p> ");

  q.push("img;i;formulas/is/isInteres.png</>Cn;c</>i;%</>n;n;3;5;0</>C0;=;<!Cn>/(1+<!i>*<!n>);2</>I;=;<!Cn>-<!C0>;2</>;$;<!I>;2;euros<//><p>Un inversor sabe que ha obtenido en <b>capitalización simple</b> un montante final de <!Cn>€ manteniendo una inversión inicial de <!C0>€ durante <!n> años. ¿A cuánto ascienden los intereses totales obtenidos?</p> <//> <p><b>Datos</b>:</p> <p>C<sub>n</sub> = <!Cn>€<br> C<sub>0</sub> = <!C0><br> I<sub>T</sub>= ?€ </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>I<sub>T</sub> = <!I>€</p> ");

  q.push("img;i;formulas/is/isActualizacion2.png</>Cn;c</>i;%</>n;n;3;5;0</>C0;=;<!Cn>/(1+<!i>*<!n>);2</>;$;<!C0>;2;euros<//><p>El capital final obtenido en una operación de <b>capitalización simple</b> al <!i.%>% anual durante <!n> años fue de <!Cn>€. ¿Cual fue el capital inicial?</p> <//> <p><b>Datos</b>:</p> <p>C<sub>n</sub> = <!Cn>€<br> i = <!i><br> n = <!n> años<br> C<sub>0</sub>= ?€ </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>C<sub>0</sub> = <!C0>€</p> ");

  q.push("img;i;formulas/is/isActualizacion3.png</>Cn;c</>i;%</>n;n;3;5;0</>C00;=;<!Cn>/(1+<!i>*<!n>);2</>I;=;<!Cn>-<!C00>;2</>C0;=;<!I>/(<!i>*<!n>);2</>;$;<!C0>;2;euros<//><p>El interés total obtenido en una operación de <b>capitalización simple</b> al <!i.%>% anual durante <!n> años fue de <!I>€. ¿Cual fue el capital inicial?</p> <//> <p><b>Datos</b>:</p> <p>I<sub>T</sub> = <!I>€<br> i = <!i><br> n = <!n> años<br> C<sub>0</sub>= ?€ </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>C<sub>0</sub> = <!C0>€</p> ");

  q.push("img;i;formulas/is/isTiempo2.png</>Cn;c</>i;%</>n;n;2;9;0</>C0;=;<!Cn>/(1+<!i>*<!n>);2</>;$;<!n>;2;años<//><p>Sabemos que una inversión de <!C0>€ ha producido un capital final de <!Cn>€ al <!i.%>% anual. ¿Cuantos años se mantuvo la inversión?<br> [Utilizar la <b>capitalización simple</b>]</p> <//> <p><b>Datos</b>:</p> <p>C<sub>n</sub> = <!Cn>€<br> C<sub>0</sub>= <!C0>€<br> i = <!i><br> n = ? años </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>n = <!n> años</p> ");

  q.push("img;i;formulas/is/isTiempo.png</>I0;c</>I;=;<!I0>/6;2</>i;%</>n;n;2;9;0</>C0;=;<!I>/(<!i>*<!n>);2</>;$;<!n>;2;años<//><p>Sabemos que una inversión de <!C0>€ ha producido unos intereses totales de <!I>€ al <!i.%>% anual. ¿Cuantos años se mantuvo la inversión?<br> [Utilizar la <b>capitalización simple</b>]</p> <//> <p><b>Datos</b>:</p> <p>C<sub>0</sub> = <!C0>€<br> I<sub>T</sub>= <!I>€<br> i = <!i><br> n = ? años </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>n = <!n> años</p> ");

  q.push("img;i;formulas/is/isTipo2.png</>Cn;c</>i;%</>n;n;3;7;0</>C0;=;<!Cn>/(1+<!i>*<!n>);2</>;$;<!i.%>;2;%<//><p>Sabemos que una inversión de <!C0>€ ha producido un capital final de <!Cn>€ después de <!n> años. ¿Que tipo de interés porcentual anual se abonó por la inversión?<br> [Utilizar la <b>capitalización simple</b>]</p> <//> <p><b>Datos</b>:</p> <p>C<sub>n</sub> = <!Cn>€<br> C<sub>0</sub>= <!C0>€<br> n = <!n> años<br> i% = ?% </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>i% = <!i.%>%</p> ");

  q.push("img;i;formulas/is/isTipo.png</>I0;c</>I;=;<!I0>/7;2</>i;%</>n;n;3;7;0</>C0;=;<!I>/(<!i>*<!n>);2</>;$;<!i.%>;2;%<//><p>Sabemos que una inversión de <!C0>€ ha producido unos intereses totales de <!I>€ después de <!n> años. ¿Que tipo de interés porcentual anual se abonó por la inversión?<br> [Utilizar la <b>capitalización simple</b>]</p> <//> <p><b>Datos</b>:</p> <p>C<sub>0</sub> = <!C0>€<br> I<sub>T</sub>= <!I>€<br> n = <!n> años<br> i% = ?% </p> <p><b>Resultado</b>:</p> <p><!img></p> <p>i% = <!i.%>%</p> ");

  return q;
};
