"use strict";

const fs = require('fs');
const { Command, option } = require('commander');
const program = new Command();
const path = require('path');
const tsStream = require('./tsStream');
program
  .option('-s, --shift <number>', 'shift', )
  .option('-i, --input <path>', 'input file')
  .option('-o, --output <path>', 'output file')
  .option('-a, --action <type>', 'action')
  .action((options) => {
    try {
        if (!options.shift || !options.action) throw new Error('Не указан обязательный параметр');
        let shift = parseInt(options.shift, 10);
        if (isNaN(shift)) throw new Error('Сдвиг должен быть числом');
        const action = options.action;
        if (action !== "encode" && action !== "decode") throw new Error('action должен быть encode или decode');
        if (action === "decode") shift *= -1;
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
        readable.pipe(tsStream(shift)).pipe(writeable);
    } catch (error) {
        process.stderr.write(error.message);
        process.exit(2);
    }    
  });

program.parse();









