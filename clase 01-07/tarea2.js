//Ejercicio 1:

class Heroe {
  constructor(name = "Héroe") {
    this.name = name;
    this.ranking = "00";
    this.health = 100;
    this.damage = 5;
    this.experience = 0;
    this.isAlive = true;
  }
  talk(name) {
    console.log(`Hi ${name}!`);
  }
  attack(enemy) {
    if (!enemy.isAlive) {
      console.log(`Ten piedad! ${enemy.name} ya ha sido derrotado!`);
      console.log(
        `Como castigo por tu comportamiento se te quitarán 5 puntos de experiencia`
      );
      this.experience -= 5;
      return;
    }
    console.log(`Poder de ataque de ${this.name}: ${this.damage}`);
    enemy.health -= this.damage;
    if (enemy.health <= 0) {
      enemy.health = 0;
      enemy.isAlive = false;
      console.log(
        `${enemy.name} fue asesinado! \n${this.name} es el ganador! Aumenta su experiencia 💪🏽`
      );
      this.experience += 10;
      return;
    }
    console.log(
      `La salud de ${enemy.name} es ${enemy.health}. La batalla continuará.`
    );
  }
  takeDamage(damage) {
    this.health -= damage;
    console.log(`Health left: ${this.health}`);
  }
}

const spiderman = new Heroe("Spiderman");
const anonimus = new Heroe();

console.log(spiderman);
console.log(anonimus);

for (i = 0; i <= 20; i++) {
  spiderman.attack(anonimus);
}
console.log(spiderman);
console.log(anonimus);

const list = [
  {
    firstName: "Noah",
    country: "Switzerland",
    continent: "Europe",
    age: 19,
    language: "JavaScript",
  },
  {
    firstName: "Carla",
    country: "Tahiti",
    continent: "Oceania",
    age: 28,
    language: "JavaScript",
  },
  {
    firstName: "Maria",
    country: "Taiwan",
    continent: "Asia",
    age: 35,
    language: "HTML",
  },
  {
    firstName: "Ramiro",
    country: "Tajikistan",
    continent: "Asia",
    age: 30,
    language: "CSS",
  },
];

function howMany(people, place) {
  const total = people.filter(
    (person) => person.continent.toLowerCase() === place.toLowerCase()
  );
  return total.length;
}

console.log(howMany(list, "Asia"));

const list1 = [
  {
    firstName: "Sofia",
    country: "Argentina",
    continent: "Americas",
    age: 35,
    language: "Java",
  },
  {
    firstName: "Lukas",
    country: "Croatia",
    continent: "Europe",
    age: 35,
    language: "Python",
  },
  {
    firstName: "Madison",
    country: "United States",
    continent: "Americas",
    age: 32,
    language: "Ruby",
  },
];

function addGreetings(list) {
  const listWithGreetings = list.map((element) => {
    return {
      ...element,
      greeting: `Hi ${element.firstName}, what do you like the most about ${element.language}?`,
    };
  });
  return listWithGreetings;
}

const list2 = addGreetings(list1);
console.log(list2.map((person) => person.greeting));

const list3 = [
  {
    firstName: "Emma",
    country: "Netherlands",
    continent: "Europe",
    age: 29,
    language: "Ruby",
  },
  {
    firstName: "Piotr",
    country: "Poland",
    continent: "Europe",
    age: 28,
    language: "Javascript",
  },
  {
    firstName: "Jayden",
    country: "Jamaica",
    continent: "Americas",
    age: 42,
    language: "JavaScript",
  },
];

function verifyLanguage(people, lan) {
  return people.some(
    (person) => person.language.toLowerCase() === lan.toLowerCase()
  );
}

const seraReal = verifyLanguage(list3, "javascript");
console.log(seraReal);
