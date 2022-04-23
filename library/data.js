/**
 * Title: Data related working to the application
 * Description: save data from .data folder
 * Author: Minhaj Sadik;
 * Date: 12/04/2022;
 */

// Dependencies
const fs = require("fs");
const path = require("path");

// module scaffolding
const lib = {};

//base directory of the data folder
lib.baseDir = path.join(__dirname, "/../data/");

//write data to the file
lib.create = (dir, file, data, callback) => {
  //open the file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        //convert data to string
        const stringData = JSON.stringify(data);

        //write to file and close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            callback("Error in writing to file");
          }
        });
      } else {
        callback("Error: file already exists");
      }
    }
  );
};
