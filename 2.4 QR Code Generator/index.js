//npm i qr-image inquirer
//npm init -y (default settings)

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        message : "Enter the url: ",
        name : "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;
 
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    
    fs.writeFile("message.txt",url, (err)=>{
        if(err) throw err;
        console.log("URL saved successfully");
    })

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });