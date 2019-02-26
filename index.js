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
    let sentimentTotal = 0;
    //get all the cards
    //TODO: maybe run this result through torch? or just generate a json file of 78 torch-created cards?
    result.cards.map((card, index) => {
      console.log(`Card ${index} is the ${card.name}, ${card.desc}, which means ${card.meaning_up}`);
      let analysis = sentiment.analyze(card.meaning_up);
      console.log(`The sentiment rating for this card is ${analysis.score}`);
      sentimentTotal += analysis.score;
    });
    //get running processes, then act on result of the reading
    let sentScore = sentimentTotal/3;
    console.log('reading score: ', sentScore);
    psList().then(result => {
      console.log('result: ', result);
      var rand = result[Math.floor(Math.random() * result.length)];
      console.log('killing : ', rand);
      if (sentScore > 3) {
        //do something positive?
      }
      if (sentScore < 0) {
     exec(`kill ${ rand.pid }`, (e, out, err) => {
       if (e !== null) {
         console.log('e: ', e);
       } else {
         console.log('stdout: ' + out);
         console.log('stderr: ' + err);
       }
     })


      }
     //      let running_scripts = require('child_process').exec('sh bash_script.sh', (e, out, err) => {
      //        console.log(`out: ${out}`);
      //        console.log(`err: ${err}`);
      //      })
    })
  });
}).on("error", e => {
  console.log("Error: " + e.message);
});
