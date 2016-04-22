const exec = require('child_process').exec;

function image(inputFile) {
  const options = { inputFile };

  function convert() {
    return new Promise((resolve, reject) => {

      const c = `
        convert -size 200x100 xc:none -gravity ${options.textLoc} -geometry ${options.textOffset} \
                -stroke none -fill black -pointsize 36  -gravity center -annotate 0 '${options.text}' \
                ${options.inputFile}  +swap -gravity ${options.textLoc} -geometry ${options.textOffset} \
                -composite  ${options.outputFile}
      `;

      exec(c, (err, stdout, stderr) => {
        if (err || stderr) {
          return reject(err || stderr)
        }

        resolve(stdout);
      });
    });
  }

  function to(outputFile) {
    options.outputFile = outputFile;
    return this;
  }

  function addText(text, location, offsets) {
    options.text = text;
    options.textLoc = location;
    options.textOffset = offsets;
    return this;
  }

  return {
    convert: convert,
    to: to,
    addText: addText
  };
}

module.exports = image;
