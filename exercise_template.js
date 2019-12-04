console.log('--- Day X: xxxxx ---');

/**
 * Description
 */

import { readFileUtil } from '../utils/readFileUtil';

const fileLines = [];

const onLine = (line) => {
  fileLines.push(line);
};

const onClose = () => {
  processReadLines();
};

readFileUtil(onLine, onClose);

const processReadLines = () => {
  fileLines.forEach(line => {
    // code = line.split(',');
  });

  console.log(`Part 1: ${part1()}`); // xxx
  console.log(`Part 2: ${part2()}`); // xxx
};

const part1 = () => {
  //
};

const part2 = () => {
  //
};
