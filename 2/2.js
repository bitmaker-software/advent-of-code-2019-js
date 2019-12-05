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

const onLine = (line) => {
  fileLines.push(line);
};

const onClose = () => {
  processReadLines();
};

readFileUtil(onLine, onClose);

const processReadLines = () => {
  fileLines.forEach(line => {
    code = line.split(',');
  });

  let hrStart;
  let hrEnd;

  console.log('\n--- Part 1 ---');
  hrStart = process.hrtime();
  console.log(`Answer: ${part1()}`); // 3101844
  hrEnd = process.hrtime(hrStart);
  console.info('Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000);

  console.log('\n--- Part 2 ---');
  hrStart = process.hrtime();
  console.log(`Answer: ${part2()}`); // 8478
  hrEnd = process.hrtime(hrStart);
  console.info('Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000);

  console.log('\n--------------');
};

const OPCODES = {
  1: { operation: '+', arity: 3 },
  2: { operation: '*', arity: 3 },
  99: { operation: 'halt', arity: 0 },
};

const runComputer = (code, pointer = 0) => {
  const opcode = code[pointer];

  if (!Object.keys(OPCODES).includes(opcode)) {
    throw new Error(`Invalid opcode: ${opcode} (pointer: ${pointer})`);
  }

  const instruction = OPCODES[opcode];

  if (instruction.operation === 'halt') {
    return code[0];
  }

  let evalString = code[code[pointer + 1]]; // start with the first parameter
  for (let i = 2; i < instruction.arity; i += 1) {
    evalString = `${evalString}${instruction.operation}${code[code[pointer + i]]}`; // add the remaining parameters
  }
  code[code[pointer + instruction.arity]] = eval(evalString); // save the result at the address of the last parameter

  return runComputer(code, pointer + 1 + instruction.arity); // continue increment the instruction pointer by 1 opcode + x parameters
};

const part1 = () => {
  const inputA = '12';
  const inputB = '2';
  return runComputer([...code.slice(0, 1), inputA, inputB, ...code.slice(3)]);
};

const part2 = () => {
  /**
   * Find the input noun and verb that cause the program to produce the output 19690720.
   * What is 100 * noun + verb? (For example, if noun=12 and verb=2, the answer would be 1202.)
   */
  const expectedOutput = 19690720;

  const runLoopsUntilAnswerIsFound = ({ nounCfg = { min: 0, max: 99 }, verbCfg = { min: 0, max: 99 }, expectedOutput }) => {
    for (let noun = nounCfg.min; noun < nounCfg.max; noun += 1) {
      for (let verb = verbCfg.min; verb < verbCfg.max; verb += 1) {
        if (runComputer([...code.slice(0, 1), noun, verb, ...code.slice(3)]) === expectedOutput) {
          return `${100 * noun + verb} (noun: ${noun}, verb: ${verb})`;
        }
      }
    }
  };

  return runLoopsUntilAnswerIsFound({ expectedOutput });
};
