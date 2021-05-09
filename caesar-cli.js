"use strict";

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const path = require('path');

program
  .requiredOption('-s, --shift <number>', 'shift')
  .option('-i, --input <path>', 'input file')
  .option('-o, --output <path>', 'output file')
  .requiredOption('-a, --action <type>', 'action')
  .action((options) => {
    console.log(options.shift);
    console.log(options.action);
    let readable = process.stdin;
    let writeable = process.stdout;
    if (options.input) {
        try {
            let inputpath = path.isAbsolute(options.input) ? options.input : path.resolve(__dirname, options.input);
            if(!fs.existsSync(inputpath)) throw new Error('не правильно указан путь к input файлу');
            readable = fs.createReadStream(inputpath);
        } catch (error) {
            console.log(error.message);
            process.exit();
        }        
    }
    if (options.output) {
        try {
            let outpath = path.isAbsolute(options.output) ? options.output : path.resolve(__dirname, options.output);
            if(!fs.existsSync(outpath)) throw new Error('не правильно указан путь к output файлу');
            writeable = fs.createWriteStream(outpath);
        } catch (error) {
            console.log(error.message);
            process.exit();
        }     
    }
    readable.setEncoding('utf8');
    readable.pipe(writeable);
  });

program.parse();









