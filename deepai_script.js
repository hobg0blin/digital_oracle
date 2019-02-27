const env = require('node-env-file');
const https = require('https');
const fs = require('fs');

env('.env');

const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey(process.env.DEEP_AI_KEY);

https.get('https://rws-cards-api.herokuapp.com/api/v1/cards', (resp) => {
  let data = '';

  resp.on('data', chunk => {
    console.log(chunk);
    data += chunk;
  });

  resp.on('end', () => {
    let result = JSON.parse(data);
    console.log('result: ', result);
    let titles = result.cards.map(i => {
      return { 'name_short': i.name_short, 'desc': i.desc }
    });

  titles.map(title => {
    //failed attempt to generate image from card description
 response = deepai.callStandardApi("text2img", {
        caption: `${title.desc}`,
 }).then(result => {
   console.log('result: ', result);
 });
});
})
})
