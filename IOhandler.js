/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 10/10/2023
 * Author: Erfan Goudarzi, Navdeep Singh Brar
 * 
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      .on("close", () => {
        console.log("Extraction operation complete");
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} dir
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngFiles = files
          .filter((file) => file.endsWith(".png"))
          .map((file) => path.join(dir, file));
        resolve(pngFiles);
      }
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(pathIn).pipe(new PNG());

    reader.on("parsed", function () {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const avg = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
          this.data[idx] = this.data[idx + 1] = this.data[idx + 2] = avg;
        }
      }

      const writer = fs.createWriteStream(pathOut).pipe(new PNG());
      writer.write(this.data, () => {
        writer.end();
        console.log(`Grayscale operation complete for ${pathIn}`);
        resolve();
      });
    });

    reader.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
