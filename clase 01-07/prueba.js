function joinGuionAndCapital(array) {
  return array.join("_").toUpperCase();
}

const array1 = ["hola", "mundo", "es", "una", "prueba"];

const arrayPostFuncion = joinGuionAndCapital(array1);

console.log(arrayPostFuncion);
