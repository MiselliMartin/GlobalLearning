/*
True || (1 > 3) && (10 == 5)  =>
!(5 < 5) && (40%10 == 0) && !(False) || (2 * 5 >= 11)  =>
(33%2 == 0) || (2**3 + 1 == 9) || (4 >=4) && False => 
Voy a andar en bicicleta cuando el día esté soleado o nublado y si es fin de semana.
Tengo que comprar frutas, si están frescas y el precio está dentro de mi presupuesto, las compro.
*/
true || (1 > 3 && 10 == 5);
//true or false and false => true
(!(5 < 5) && 40 % 10 == 0 && !false) ||
  (2 * 5 >= 11)(
    //true  and     true      and   true   or     false     => true
    33 % 2 == 0
  ) ||
  2 ** 3 + 1 == 9 ||
  (4 >= 4 && false);
//false       or       true        or  true    and false => true
let sunny = true;
let weekend = false;
if (sunny && weekend) {
  //Si está soleado y es fin de semana entonces
  console.log("Bicicleta");
} else {
  //Si alguna de las condiciones no se cumplen entonces
  console.log("No bicicleta");
}

if (freshFruits && goodPrice) {
  //Si están frescas y el precio está dentro de mi presupuesto entonces
  console.log("Comprar frutas");
} else {
  //Si alguna de las condiciones no se cumplen entonces
  console.log("No compro frutas");
}
