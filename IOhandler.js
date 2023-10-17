/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 15 Oct 2023
 * Author: Navdeep, Erfan
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
    return Promise.resolve(); //another way of returning a promise at the end of a function
    
  };


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
    return fs.readdir(dir)
      .then((files) => {
        const pngFiles = files.filter((file) => path.extname(file) === ".png");
        return pngFiles;
      })
      .catch((err) => {
        console.error("An error occurred:", err);
        throw err; // Re-throw the error for downstream handling
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
      // imageData.data[idx + 3] = imageData.data[idx + 3] >> 1; // alpha
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
    })
    .on("error", (err) => {
      console.error("An error occurred:", err);
      throw err; // Re-throw the error for downstream handling
    });

};




module.exports = {
  unzip,
  readDir,
  grayScale,
};


// unzip("./myfile.zip", "./unzipped");
// readDir('unzipped')
// .then((files) => {
//   console.log(files);
//   })
// .catch((err) => {
//   console.error("An error occurred:", err);
//   throw err; // Re-throw the error for downstream handling
// });
    

 
// grayScale("unzipped/in2.png", "grayscaled/out1.png");
