console.log('--- Day 1: The Tyranny of the Rocket Equation ---');

import readline from 'readline';
import fs from 'fs';

const readInterface = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  console: false
});

const rocketModules = {};

readInterface.on('line', (line) => {
  const x = parseInt(line);
  if (!isNaN(x)) {
    // Add to the modules
    rocketModules[line] = {
      mass: x,
    };
  } else {
    console.log(`Not a number: ${line}`);
  }
});

readInterface.on('close', () => {
  processReadLines();
});

const fuelNeededForMass = (mass) => {
  return Math.floor(mass / 3) - 2;
};

const calcPart1 = () => {
  /**
   * Part 1:
   * Fuel required to launch a given module is based on its mass.
   * Specifically, to find the fuel required for a module,
   * take its mass, divide by three, round down, and subtract 2.
   */
  return Object.values(rocketModules).reduce((accumulator, currentValue, index) => {
    const fuel = fuelNeededForMass(currentValue.mass);
    currentValue.fuelPart1 = fuel;
    return accumulator + fuel;
  }, 0);
};

const calcPart2 = () => {
  /**
   * Part 2:
   * Fuel itself requires fuel just like a module - take its mass,
   * divide by three, round down, and subtract 2.
   * However, that fuel also requires fuel, and that fuel requires fuel, and so on.
   * Any mass that would require negative fuel should instead be treated as if it requires zero fuel
   */

  /**
   * What is the sum of the fuel requirements for all of the modules on your spacecraft
   * when also taking into account the mass of the added fuel? (Calculate the fuel
   * requirements for each module separately, then add them all up at the end.)
   */
  Object.values(rocketModules).forEach((module) => {
    let fuelPart2 = 0;
    let currentFuelMass = module.fuelPart1;
    while (currentFuelMass > 0) {
      let mass = fuelNeededForMass(currentFuelMass);
      if (mass < 0) {
        mass = 0;
      }
      fuelPart2 += mass;
      currentFuelMass = mass;
    }
    module.fuelPart2 = fuelPart2;
    // console.log(module.fuelPart2);
  });

  // Sum all the fuel masses
  return Object.values(rocketModules).reduce((accumulator, currentValue, index) => {
    return accumulator + currentValue.fuelPart1 + currentValue.fuelPart2;
  }, 0);
};

const processReadLines = () => {
  console.log(`Part 1: ${calcPart1()}`); // 3429947
  console.log(`Part 2: ${calcPart2()}`); // 5142043
};
