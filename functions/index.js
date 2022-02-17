const firebase = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// const firebase = require("firebase/app");
//  import * as functions from 'firebase-functions';
// import  * as cheerio from 'cheerio';


import  functions from 'firebase-functions';
import fetch from 'node-fetch';
import    cheerio from 'cheerio';

import { dialogflow , SimpleResponse} from "actions-on-google";
import { RefBuilder } from 'firebase-functions/v1/database';
const app = dialogflow({debug : true});

app.intent('Hey google lets talk to firebase.com' , async(conv)=>{
    const data = await scrapePage();
    conv.close(new SimpleResponse({
        text : `Last site was ${data.title}`,
        speech:`the last video was ${data.title}`,

    }));

});

async function scrapePage(){
    const Page = await fetch('https://firebase.com/')
    const html = await Page.text();
    const $ = cheerio.load(html)
    const doc = $('.card__content').first()
    return {
        title: doc.find('h2').text()
    }
}

export const fullfillment= functions.https.onRequest(app);
 
 
