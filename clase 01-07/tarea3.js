//1
function CalculateTotal(items, tax, discount) {
  let valorTotal = 0;
  items.forEach((item) => {
    valorTotal += item;
  });
  valorTotal += valorTotal * tax;
  if (discount) {
    valorTotal -= valorTotal * discount;
    return valorTotal.toFixed(2);
  }
  return valorTotal.toFixed(2);
}

let items = [10, 20, 30];
let tax = 0.05;
let discount = 0.1;

let total = CalculateTotal(items, tax, discount);
console.log("Total: " + total);

//Ejercicio desafío:
const books = [
  { title: "El Aleph", author: "Jorge Luis Borges" },
  { title: "La ciudad y los perros", author: "Mario Vargas Llosa" },
  { title: "Cien años de soledad", author: "Gabriel García Márquez" },
  { title: "Rayuela", author: "Julio Cortázar" },
  { title: "Ficciones", author: "Jorge Luis Borges" },
  { title: "El hacedor", author: "Jorge Luis Borges" },
  { title: "Los pasos perdidos", author: "Alejo Carpentier" },
  { title: "El reino de este mundo", author: "Alejo Carpentier" },
  { title: "La fiesta del chivo", author: "Mario Vargas Llosa" },
  { title: "La tía Julia y el escribidor", author: "Mario Vargas Llosa" },
  {
    title: "Crónica de una muerte anunciada",
    author: "Gabriel García Márquez",
  },
  {
    title: "El amor en los tiempos del cólera",
    author: "Gabriel García Márquez",
  },
  { title: "Bestiario", author: "Julio Cortázar" },
  { title: "Las armas secretas", author: "Julio Cortázar" },
];

const filterBooksByAuthor = (array, author) => {
  return array.filter(
    (array) => array.author.toLowerCase() === author.toLowerCase()
  );
};

const arrayAuthor = filterBooksByAuthor(books, "Julio Cortázar");

console.log(arrayAuthor);

//Desafío 2
arrayAuthor.map((array) => (array.author = "Martín Miselli"));

console.log(arrayAuthor);

console.log(books);
//Se modifican ambos arrays.

//Desafío 3
const filterBooksByIncludesAuthor = (array, author) => {
  return array.filter((array) =>
    array.author.toLowerCase().includes(author.toLowerCase())
  );
};

const filtradoIncludes = filterBooksByIncludesAuthor(books, "Martín");
console.log(filtradoIncludes);

//Desafío 4
const filterBooksByAuthorReturnCopy = (array, author) => {
  return (filteredArray = structuredClone(
    array.filter((array) => array.author.toLowerCase() === author.toLowerCase())
  ));
};
