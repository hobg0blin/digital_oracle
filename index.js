const https = require('https');
const Sentiment = require('sentiment');
const exec = require('child_process').exec;
const psList = require('ps-list');

let sentiment = new Sentiment();

https.get('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3', (resp) => {

  let data = '';

  resp.on('data', chunk => {
    console.log(chunk);
    data += chunk;
  });

  resp.on('end', () => {
    let result = JSON.parse(data);
    result.cards.map(card => {
      console.log("card: ", card);
      let analysis = sentiment.analyze(card.meaning_up);
      console.log("analysis: ", analysis);
      psList().then(result => {
        console.log('ps list: ', result);
      });

     //      let running_scripts = require('child_process').exec('sh bash_script.sh', (e, out, err) => {
      //        console.log(`out: ${out}`);
      //        console.log(`err: ${err}`);
      //      })
    })
  });
}).on("error", e => {
  console.log("Error: " + e.message);
});
