const cheerio = require("cheerio");
const axios = require("axios");
//const readline = require("readline");
const fs = require("fs");


async function ImagesScraper(){
    try{
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const imageUrl = [];
        $('img').each((index, element)=> {
            const imageLink = $(element).attr('src');
            if (imageLink) {
                imageUrl.push(imageLink);
            }
        });
        const imagefilepath = './ScrappedImages.doc';
        fs.writeFile(imagefilepath, imageUrl.join('\n'), (err) => {
            if (err) throw err;
            console.log('The images have been downloaded and saved!');
        });
    }
    catch (error){
        console.error(error);
    }

}