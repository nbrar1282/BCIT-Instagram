//Owned by Navdeep, Erfan
// const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: 15 Oct 2023
 * Author: Navdeep, Erfan
 *
 */


const path = require("path");
const IOhandler = require("./IOhandler");
const zipFilePath = path.join( "myfile.zip");
const pathUnzipped = path.join( "unzipped");
const pathProcessed = path.join( "grayscaled");


IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(() => {
    console.log("ZIP file unzipped successfully.");
    return IOhandler.readDir(pathUnzipped);
  })
  .then((pngFiles) => {
    console.log("List of PNG files:", pngFiles);
    pngFiles.forEach((file) => {
      const inputPath = path.join(pathUnzipped, file);
      const outputPath = path.join(pathProcessed, file);
      return IOhandler.grayScale(inputPath, outputPath);
    });
  })
  .then(() => {
    console.log("Grayscale processing completed for all PNG files.");
  })
  .catch((err) => {
    console.error("An error occurred:", err);
  });



// NOTES

// IOhandler.unzip(zipFilePath, pathUnzipped)
//   .then(() => {
//     // Step 2: Read and process the PNG files in the unzipped directory
//     return IOhandler.readDir(pathUnzipped);
//   })
//   .then((pngFiles) => {
//     console.log('List of PNG files:', pngFiles);
    
//     // Step 3: Apply grayscale to each PNG file
//     pngFiles.forEach((file) => {
//       const inputPath = path.join(pathUnzipped, file);
//       const outputPath = path.join(pathProcessed, file);
//       return IOhandler.grayScale(inputPath, outputPath);
//     })})
  
//   .then(() => {
//     console.log('Grayscale processing completed.');
//   })
//   .catch((err) => {
//     console.error('An error occurred:', err);
//   });






//Step 1: READ THE ZIP FILE 
//Step 2: Unzip the file
//step 3 read all png images from unzipped folder
//step 4 send them to grsyscle folder function
//step 5 AFTER ALL IMAGES HAVE BEEN SUCCESSFULLY PROCESSED, SHOW THE SUCCESS MESSAGE
// ALL ERRORS MUST BE IN .CATCH PROMISE CHAIN

// fs.createReadStream(myfile.zip)
// read the file we need photos in the myfile.zip
//package.json has dependencies so we canknow what we need to install
// npm install pngjs
// we can use npm install command to install the dependencies in the package.json
// we are using node unzipper becuase unzip is used in streaming



// fs.createReadStream('myfile.zip')
// .pipe(unzipper.Extract({ path: './unzipped' }));

// fs.createReadStream('unzipped/in1.png')
// .on('data', (chunk) => console.log(chunk))

// const PNG = require("node_modules/pngjs").PNG;

//grayscale('img1.png')
//.then(() => grayscale('img2.png'))
//.then(() => grayscale('img3.png'))
//.then(() => console.log('all images processed'))
//this will work but this would be slow.


//other way
//[grayScale('img1.png'), grayScale('img2.png'), grayScale('img3.png')]
//.then(() => console.log('all images processed'))
//promise.all([grayScale('img1.png'), grayScale('img2.png'), grayScale('img3.png')])
//.then(() => console.log('all images processed'))




// fs.createReadStream("unzipped/in1.png")
//   .pipe(
//     new PNG({
//       filterType: 4,
//     })
//   )
//   .on("parsed", function () {
//     for (var y = 0; y < this.height; y++) {
//       for (var x = 0; x < this.width; x++) {
//         var idx = (this.width * y + x) << 2;

//         // invert color
//         this.data[idx] = 255 - this.data[idx]; // red
//         this.data[idx + 1] = 255 - this.data[idx + 1]; // green             WE NEED TO FOCUS ON THIS PART MOST FOR THIS LAB 
//         this.data[idx + 2] = 255 - this.data[idx + 2]; // blue

//         // and reduce opacity
//         this.data[idx + 3] = this.data[idx + 3] >> 1; // alpha
//       }
//     }

//     this.pack().pipe(fs.createWriteStream("out.png"));
//   });