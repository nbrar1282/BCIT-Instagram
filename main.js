

const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: 10/10/2023
 * Author: Erfan Goudarzi, Navdeep Singh Brar 
 *
 */
const unzipper = require('unzipper');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const path = require('path');

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      .on('close', () => {
        console.log('Extraction operation complete');
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngFiles = files
          .filter((file) => file.endsWith('.png'))
          .map((file) => path.join(dir, file));
        resolve(pngFiles);
      }
    });
  });
};

const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(pathIn).pipe(new PNG());

    reader
      .on('error', (err) => reject(err))
      .on('parsed', function () {
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
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
