"use strict";

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const path = require('path');

function myParseInt(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new commander.InvalidOptionArgumentError('Not a number.');
    }
    return parsedValue;
  }
program
  .requiredOption('-s, --shift <number>', 'shift', )
  .option('-i, --input <path>', 'input file')
  .option('-o, --output <path>', 'output file')
  .requiredOption('-a, --action <type>', 'action')
  .action((options) => {
    try {
        const shift = parseInt(options.shift, 10);
        if (isNaN(shift)) throw new Error('Сдвиг должен быть числом');
        const action = options.action;
        if (action !== "encode" && action !== "decode") throw new Error('action должен быть encode или decode');
        console.log(shift);
        console.log(action);
        let readable = process.stdin;
        let writeable = process.stdout;
        if (options.input) {
            let inputpath = path.isAbsolute(options.input) ? options.input : path.resolve(__dirname, options.input);
            if(!fs.existsSync(inputpath)) throw new Error('не правильно указан путь к input файлу');
            readable = fs.createReadStream(inputpath); 
        }
        if (options.output) {
            let outpath = path.isAbsolute(options.output) ? options.output : path.resolve(__dirname, options.output);
            if(!fs.existsSync(outpath)) throw new Error('не правильно указан путь к output файлу');
            writeable = fs.createWriteStream(outpath);
        }
        readable.setEncoding('utf8');
        readable.pipe(writeable);
    } catch (error) {
        process.stderr.write(error.message);
        process.exit();
    }
    
  });

program.parse();









