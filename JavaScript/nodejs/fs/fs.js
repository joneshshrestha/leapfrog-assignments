const fs = require("fs");
const path = require("path");

const filePath = path.resolve("./text.txt");
console.log("File Path: ", filePath);

// Write file
fs.writeFileSync(filePath, "hello world! ");

// Delete file
fs.unlinkSync(filePath);

// Read file
fs.readFile(filePath, (err, data) => {
  console.log(data.toString());
});

// Alter File
fs.appendFile(filePath, "File altered successfully!", (err) => {
  if (err) {
    console.log(error);
  }
});
