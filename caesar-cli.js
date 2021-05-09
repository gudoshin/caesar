const fs = require('fs');
const { Command } = require('commander'); // include commander in git clone of commander repo
const program = new Command();

program
  .requiredOption('-s, --shift <number>', 'shift')
  .option('-i, --input <path>', 'input file')
  .option('-o, --output <path>', 'output file')
  .requiredOption('-a, --action <type>', 'action')
  .action((options) => {
    console.log(options.shift);
    console.log(options.action);
  });

program.parse();









