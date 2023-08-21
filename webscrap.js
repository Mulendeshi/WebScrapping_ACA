const cheerio = require("cheerio");
const axios = require("axios");
const readline = require("readline");
const fs = require("fs");


let url = "";
//  const url2 = "https://www.apple.com/ipad/compare";
//  const url3 = "https://www.ibba.org/find-a-business-broker";
// const url4 = "https://www.igdb.com/games/coming_soon";
 //console.log(url);
 const rl = readline.createInterface({
    input: process.stdin, // Input from user through the terminal
    output: process.stdout // Output will be in the terminal
  });

  rl.question('Enter the URL to scrape: ', async (userInput) => {
    
    url = userInput;
  
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        //const selector1 = " body > main > section:nth-child(2) > div:nth-child(1) > div > div > div.unit-copy-wrapper > div > a"
        const selector = "a";
        const downloadLinks = [];

        $(selector).each((index, element) => {
            const downloadLink = $(element).attr("href");
            if (downloadLink && !downloadLink.startsWith('https')) {
              
                // converts half baked links to normal links
              const fullLink = new URL(downloadLink, url).href;
              downloadLinks.push(fullLink);
            }
          });
          //console.log('Collected Links:', downloadLinks);

          const fileName = 'DownloadedLinks.txt';
          const filePath = './' + fileName;
         
          
          fs.writeFile(filePath, downloadLinks.join('\n'), (err) => {
            if (err) throw err;
            console.log('The linka have been downloaded and the File is saved!');
          });
         

    }
    catch(error){
        console.error(error);
    }
    rl.close();
});



 
