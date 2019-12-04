console.log('--- Day 4: Secure Container ---');

/**
 You arrive at the Venus fuel depot only to discover it's protected by a password.
 The Elves had written the password on a sticky note, but someone threw it out.

 However, they do remember a few key facts about the password:

 It is a six-digit number.
 The value is within the range given in your puzzle input.
 Two adjacent digits are the same (like 22 in 122345).
 Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

 Other than the range rule, the following are true:

 111111 meets these criteria (double 11, never decreases).
 223450 does not meet these criteria (decreasing pair of digits 50).
 123789 does not meet these criteria (no double).

 How many different passwords within the range given in your puzzle input meet these criteria?
 */

import { readFileUtil } from '../utils/readFileUtil';

const fileLines = [];

const onLine = (line) => {
  fileLines.push(line);
};

const onClose = () => {
  processReadLines();
};

//
// Tests
//
if (!runTests()) {
  throw new Error('Tests failed. Stopping.');
}

//
// Start reading from file
//
readFileUtil(onLine, onClose);

const processReadLines = () => {
  fileLines.forEach(line => {
    // code = line.split(',');
  });

  console.log(`Part 1: ${part1()}`); // xxx
  console.log(`Part 2: ${part2()}`); // xxx
};

const part1 = () => {
  const [passwordMin, passwordMax] = fileLines[0].split('-');
  console.log(`From ${passwordMin} to ${passwordMax}`);
  let i = parseInt(passwordMin);
  let max = parseInt(passwordMax);
  let possiblePasswords = 0;
  for (; i <= max; i += 1) {
    if (possiblePart1(i.toString())) {
      possiblePasswords += 1;
    }
  }
  // console.log(`Password max: ${passwordMax}`);
  return possiblePasswords;
};

const part2 = () => {
  /**
   An Elf just remembered one more important detail:
   the two adjacent matching digits are not part of a larger group of matching digits.

   112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
   123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
   111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
   */
};

function digitsDoNotDecrease(input) {
  let numberString = input;
  if (typeof numberString === 'number') {
    numberString = numberString.toString();
  }

  let valid = true;

  const len = numberString.length;
  for (let i = 0; i < len; i += 1) {
    if (numberString.charAt(i) < numberString.charAt(i - 1)) {
      // Decreased!
      valid = false;
      break;
    }
  }

  return valid;
}

function possiblePart1(input) {
  /**
   It is a six-digit number.
   The value is within the range given in your puzzle input.
   Two adjacent digits are the same (like 22 in 122345).
   Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
   */
  const ruleSixDigitNumber = /^\d{6}$/;
  const twoAdjacentDigits = /.*(.)\1/;
  return ruleSixDigitNumber.test(input)
    && twoAdjacentDigits.test(input)
    && digitsDoNotDecrease(input);
}

function possiblePart2(input) {
  /**
   Same as part 1 + the two adjacent matching digits are not part of a larger group of matching digits.
   */
  const ruleSixDigitNumber = /^\d{6}$/;
  const twoAdjacentDigits = /.*(.)\1/;
  return ruleSixDigitNumber.test(input)
    && twoAdjacentDigits.test(input)
    && digitsDoNotDecrease(input);
}

function runTests() {
  let passing = true;

  //
  // Part 1
  //
  /**
   111111 meets these criteria (double 11, never decreases).
   223450 does not meet these criteria (decreasing pair of digits 50).
   123789 does not meet these criteria (no double).
   */
  const testInputsPart1 = [
    { value: '111111', expected: true },
    { value: '223450', expected: false },
    { value: '123789', expected: false },
  ];

  testInputsPart1.forEach(input => {
    if (possiblePart1(input.value) !== input.expected) {
      console.log(`Test failed: ${input.value}, expected: ${input.expected}`);
      passing = false;
    }
  });

  //
  // Part 2
  //
  /**
   112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
   123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
   111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
   */
  const testInputsPart2 = [
    { value: '112233', expected: true },
    { value: '123444', expected: false },
    { value: '111122', expected: true },
  ];

  testInputsPart2.forEach(input => {
    if (possiblePart2(input.value) !== input.expected) {
      console.log(`Test failed: ${input.value}, expected: ${input.expected}`);
      passing = false;
    }
  });

  return passing;
}
