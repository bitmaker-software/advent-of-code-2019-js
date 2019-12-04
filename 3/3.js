console.log('--- Day 3: Crossed Wires ---');

/**
 * The wires twist and turn, but the two wires occasionally cross paths.
 * To fix the circuit, you need to find the intersection point closest
 * to the central port. Because the wires are on a grid, use the Manhattan
 * distance for this measurement. While the wires do technically cross right
 * at the central port where they both start, this point does not count, nor
 * does a wire count as crossing with itself.
 */

import { readFileUtil } from '../utils/readFileUtil';

const fileLines = [];
const cityMap = {};

const onLine = (line) => {
  fileLines.push(line);
};

const onClose = () => {
  processReadLines();
};

readFileUtil(onLine, onClose);

// let wires = {};
let currentWireNumber;
let map = {};
let crossings = [];

const processReadLines = () => {
  fileLines.forEach((line, index) => {
    currentWireNumber = index + 1
    // wires[currentWireNumber] = line.split(',');
    crossings = fillMapForWire(currentWireNumber, line.split(','))
  });

  console.log(`Part 1: ${part1()}`); // 403
  console.log(`Part 2: ${part2()}`); // xxx
};

const fillMapForWire = (wireNumber, wirePath) => {
  console.log(`Processing wire ${currentWireNumber}`);
  let coords = { x: 0, y: 0 }; // current wire coordinate
  let wireTotalSteps = 0;
  wirePath.forEach((position) => {
    const direction = position[0];
    const steps = parseInt(position.slice(1));

    // console.log(direction, steps);

    // Mark each step
    for (let i = 1; i <= steps; i += 1) {
      wireTotalSteps += 1;
      switch (direction) {
        case 'L':
          coords = { x: coords.x - 1, y: coords.y };
          break;
        case 'R':
          coords = { x: coords.x + 1, y: coords.y };
          break;
        case 'U':
          coords = { x: coords.x, y: coords.y + 1 };
          break;
        case 'D':
          coords = { x: coords.x, y: coords.y - 1 };
          break;
        default:
          console.log('Wrong direction:', direction);
      }
      //
      // Mark this coordinate, on the map, as visited by this wire
      //
      const coordsKey = `${coords.x},${coords.y}`;
      if (map[coordsKey]) {
        // Coordinate already visited by someone
        if (!Object.keys(map[coordsKey].visitors).includes(currentWireNumber)) {
          // Not visited by this wire
          map[coordsKey].visitors = {
            ...map[coordsKey].visitors,
            [currentWireNumber]: {
              number: currentWireNumber,
              stepsToReachThis: wireTotalSteps,
            }
          };
        }
      } else {
        map[coordsKey] = {
          x: coords.x,
          y: coords.y,
          distanceFromOrigin: Math.abs(coords.x) + Math.abs(coords.y),
          visitors: {
            [currentWireNumber]: {
              number: currentWireNumber,
              stepsToReachThis: wireTotalSteps,
            }
          },
        };
      }
    }
  });

  //
  // Find coordinates where the wires cross
  //
  const crossings = Object.values(map).filter(((value) => Object.keys(value.visitors).length > 1));
  // console.log(crossings);
  return crossings;
};

const part1 = () => {
  /**
   * What is the Manhattan distance from
   * the central port to the closest intersection?
   */
  const sortedByDistanceFromOrigin = crossings.sort((a, b) => a.distanceFromOrigin - b.distanceFromOrigin);
  return sortedByDistanceFromOrigin[0] && sortedByDistanceFromOrigin[0].distanceFromOrigin || 'not found';
};

const part2 = () => {
  /**
   * It turns out that this circuit is very timing-sensitive;
   * you actually need to minimize the signal delay.
   */

  /**
   * What is the fewest combined steps the wires must take to reach an intersection?
   */
    // Calculate combined steps and return the lowest
  let lowestCombinedSteps = 0;
  const combinedSteps = [];
  crossings.forEach((cross) => {
    combinedSteps.push(
      Object.values(cross.visitors)
        .reduce((prev, curr) => {
          return prev + curr.stepsToReachThis;
        }, 0)
    );
  });
  return combinedSteps.sort((a, b) => a - b)[0];
};
