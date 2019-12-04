console.log('--- Day 2: 1202 Program Alarm ---');

/**
 * An Intcode program is a list of integers separated by commas (like 1,0,0,3,99).
 * To run one, start by looking at the first integer (called position 0).
 * Here, you will find an opcode - either 1, 2, or 99. The opcode indicates what to do;
 * for example, 99 means that the program is finished and should immediately halt.
 * Encountering an unknown opcode means something went wrong.
 */

import { readFileUtil } from '../utils/readFileUtil';

const fileLines = [];
let code;
let pointer = 0;

const onLine = (line) => {
  fileLines.push(line);
};

const onClose = () => {
  processReadLines();
};

readFileUtil(onLine, onClose);

const OPCODES = {
  1: '+',
  2: '*',
  99: 'halt',
};

const processReadLines = () => {
  fileLines.forEach(line => {
    code = line.split(',');
  });

  console.log(`Part 1: ${part1()}`); // 3101844
  console.log(`Part 2: ${part2()}`); // 8478
};

const runComputer = (code) => {
  // console.log(JSON.stringify(code));

  pointer = 0;
  while (true) {
    const opcode = parseInt(code[pointer]);
    if (isNaN(opcode)) {
      console.log(`Not a number: ${code[pointer]} (pointer: ${pointer})`);
      continue;
    }

    if (opcode === 99) {
      // console.log(`Will halt. Value at position 0: ${code[0]}`);
      pointer += 1; // 1 opcode
      return code[0];
    }

    if (opcode === 1 || opcode === 2) {
      const val1Address = code[pointer + 1];
      const val2Address = code[pointer + 2];
      let resultAddress = code[pointer + 3];
      let val1Parameter = code[val1Address];
      let val2Parameter = code[val2Address];

      code[resultAddress] = eval(`${val1Parameter} ${OPCODES[opcode]} ${val2Parameter}`);
      pointer += 4; // 1 opcode + 3 parameters
      continue;
    }

    console.log(`Invalid opcode: ${code[pointer]}`);
    return;
  }
};

const part1 = () => {
  let inputA = 12;
  let inputB = 2;
  return runComputer([...code.slice(0, 1), inputA, inputB, ...code.slice(3)]);
};

const part2 = () => {
  /**
   * determine what pair of inputs produces the output 19690720
   */
  let noun = 0; // 0 to 99
  let verb = 0; // 0 to 99
  const expectedOutput = 19690720;

  /**
   * Find the input noun and verb that cause the program to produce the output 19690720.
   * What is 100 * noun + verb? (For example, if noun=12 and verb=2, the answer would be 1202.)
   */
  for (noun = 0; noun < 100; noun += 1) {
    for (verb = 0; verb < 100; verb += 1) {
      if (runComputer([...code.slice(0, 1), noun, verb, ...code.slice(3)]) === expectedOutput) {
        console.log(`Found noun and verb: ${noun} ${verb}`);
        const answer = 100 * noun + verb;
        console.log(`Answer is: ${answer}`);
        return answer;
      }
    }
  }
};
