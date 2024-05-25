import { readFileSync, writeFileSync } from 'fs';

const data = readFileSync('./datos.txt')

const datos = data.toString().split(' ')

let datosPares = [];

datos.forEach((dato) => {
  if (parseInt(dato) % 2 == 0) datosPares.push(dato)
})

console.log(datosPares.length)

writeFileSync('./datosPares.txt', `Existen ${datosPares.length} números pares, que son: \n${datosPares}`)

//DESAFIO
const contarHasta10 = () => {
  const SEGUNDOENMS = 1000

  for (let segundos = 1; segundos <= 10; segundos++) {
    setTimeout(() => {
      console.log(segundos)
    }, segundos*SEGUNDOENMS)
  }
}

contarHasta10()

const contarHasta10ConVar = () => {
  //Funciona mal y no lo pude solucionar

  //Ahí vi la resolución de santi en discord, no lo entiendo del todo pero bueno, entiendo que no hay uqe usar var je 
  const SEGUNDOENMS = 1000

  for (var segundos = 1; segundos <= 10; segundos++) {
    setTimeout(() => {
      console.log(segundos)
    }, segundos*SEGUNDOENMS)
  }
}

contarHasta10ConVar()