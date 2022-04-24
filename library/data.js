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
lib.baseDir = path.join(__dirname, "/../.data/");

//write data to the file
lib.create = (dir, file, data, callback) => {
  //open the file for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, "wx", (err, fileDescriptor) => {
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
      callback("Error: could not create new file, it may already exist");
    }
  });
};

//read data from the file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, "utf8", (err, data) => {
    callback(err, data);
  });
};

//update exising file
lib.update = (dir, file, data, callback) => {
  //file open for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //convert data from string to json
      const stringData = JSON.stringify(data);

      fs.truncate(fileDescriptor, (err) => {
        if (!err) {
          //write to file and close it

          fs.writeFile(fileDescriptor, stringData, (err) => {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing the file");
              }
            });
          });
        } else {
          callback("Error truncating file");
        }
      });
    } else {
      console.log(
        "Error: could not open file for updating, it may not exist yet"
      );
    }
  });
};

module.exports = lib;
