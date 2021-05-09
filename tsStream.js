const caesar = require('./caesar');
const { Transform } = require('stream');


module.exports = function (shift) {
    const tsStream = new Transform({   
        transform(chunk, enc, cb) {
          try {
              const resultString = caesar(chunk.toString('utf8'), shift);
              cb(null, resultString);
          } catch (error) {
              cb(error);
          }
        }
      })
    return tsStream;
};