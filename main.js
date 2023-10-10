

const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: 
 * Author:
 *
 */
const fs = require("fs");
const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

const unzipper = require("unzipper");


// Step 1 - Unzip myfile.zip

fs.createReadStream('myfile.zip')  
    .pipe( unzipper.Extract({ path: './unzipped' }));   

// Step 2 - Read each png file in the unzipped folder





var PNG = require("pngjs").PNG;

fs.createReadStream("./unzipped/in.png")
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
    .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        // invert color
        this.data[idx] = 255 - this.data[idx];
        this.data[idx + 1] = 255 - this.data[idx + 1];
        this.data[idx + 2] = 255 - this.data[idx + 2];

        // and reduce opacity
        this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    }
    

    this.pack().pipe(fs.createWriteStream("out.png"));
  });

  // step 1: read the zip file 
    // step 2: unzip the file
    // step 3: read all png images frpm unzipped folder 
    // step 4: Send them to the grayscale filter function
    // step 5: after all images has successfully processed, show a success message 
    // all errors should be show in .catch in promise chain

[grayScale('./unzipped/in.png'), grayScale('./unzipped/in2.png'), grayScale('./unzipped/in3.png')]
    .then(() => console.log('All images processed successfully'))
    .catch(err => console.log(err.message));


//My first change to code to make sure I a connected to github 
