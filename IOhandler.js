/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const AdmZip = require("adm-zip");
const path = require("path");
const fs = require("fs").promises;
const { createReadStream, createWriteStream } = require("fs");
const PNG = require("pngjs").PNG;

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  const zip = new AdmZip(pathIn);
  zip.extractAllTo(pathOut, true);
  console.log("unzipped successfully");
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  // asynx function
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngFiles = files.filter((file) => path.extname(file) === ".png");
        resolve(pngFiles);
      }
    });
  });

  

};

const handleGrayScale = (imageData) => {
  for (var y = 0; y < imageData.height; y++) {
    for (var x = 0; x < imageData.width; x++) {
      var idx = (imageData.width * y + x) << 2;

      // grayscaling color by averaging RGB values
      const avg = (imageData.data[idx] + imageData.data[idx + 1] + imageData.data[idx + 2]) / 3;
      imageData.data[idx] = avg; // red
      imageData.data[idx + 1] = avg; // green
      imageData.data[idx + 2] = avg; // blue



      // and reduce opacity
      imageData.data[idx + 3] = imageData.data[idx + 3] >> 1; // alpha
    }
  }
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale, and write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 */
const grayScale = (pathIn, pathOut) => {


  const readStream = createReadStream(pathIn);
  const writeStream = createWriteStream(pathOut);

  readStream
    .pipe(new PNG())
    .on("parsed", function () {
      handleGrayScale(this); 
      this.pack().pipe(writeStream);
    });
};

// grayScale("unzipped/in2.png", "grayscaled/out1.png");


// unzip("./myfile.zip", "./unzipped");
// readDir('unzipped')
//   .then((pngFiles) => {
//     console.log('List of PNG files:', pngFiles);
//   })
//   .catch((err) => {
//     console.error('An error occurred:', err);
//   });


module.exports = {
  unzip,
  readDir,
  grayScale,
};
