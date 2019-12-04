import readline from 'readline';
import fs from 'fs';

export const readFileUtil = (onLine, onClose) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('input'),
    output: process.stdout,
    console: false
  });

  readInterface.on('line', (line) => {
    onLine(line);
  });

  readInterface.on('close', () => {
    onClose();
  });
};
