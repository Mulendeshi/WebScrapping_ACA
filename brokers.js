const cheerio = require("cheerio");
const axios = require("axios");
//const readline = require("readline");
const fs = require("fs");


const url1 = "https://www.ibba.org/find-a-business-broker";
async function scrappeMailList(){
    try{
        const response = await axios.get(url1);
        const $ = cheerio.load(response.data);
        const email = [];
        $('.brokers__item').each((index, element)=> {
            const firmname = $(element).find('.brokers__item--company').text();
            const contactname = $(element).find('.brokers__item--topTitle').text();
            const brokeremail = $(element).find('.email').text();


            if(firmname&& contactname&& brokeremail){
                email.push(
                    {
                        firmname,
                        contactname,
                        brokeremail});
            }
        });

        console.log(email);
        
        const brokerPath = './ScrappedEmails.json';
        fs.writeFile(brokerPath, JSON.stringify(email,null,2), (err) => {
            if (err) throw err;
            console.log('The emails have been downloaded and saved!');
        });
    }
    catch (error){
        console.error(error);
    }
}

scrappeMailList();

