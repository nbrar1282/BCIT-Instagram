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
// const path = require("path");
//   fs = require("fs"),
//   PNG = require("pngjs").PNG,
//   path = require("path");

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
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  

};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  var fs =  require('fs');
  PNG = require("pngjs").PNG;

  const readStream = fs.createReadStream("unzipped/in1.png");
  const writeStream = fs.createWriteStream("out.png");
  const png = new PNG().on("parsed", function () {
    const modifiedImage = handleGrayScale();
    modifiedImage.pack();
  });
};

unzip("./myfile.zip", "./unzipped");


module.exports = {
  unzip,
  readDir,
  grayScale,
};
