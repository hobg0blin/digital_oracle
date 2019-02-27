const Sentiment = require('sentiment');
const exec = require('child_process').exec;
const psList = require('ps-list');
const fs = require('fs');

let sentiment = new Sentiment();

let data = JSON.parse(fs.readFileSync('./cards/rnn_cards.json'), 'json');
let sentimentTotal = 0;
  //get all the cards
  //TODO: maybe run this result through torch? or just generate a json file of 78 torch-created cards?
let drawnCards = [];
for(i = 0; i <= 2; i++) {
  drawnCards.push(data[Math.floor(Math.random()*data.length)]);
}
drawnCards.map((card, index) => {
  console.log(`Card ${index} is the ${card.title}, ${card.desc}`);
  let analysis = sentiment.analyze(card.desc);
  console.log(`The sentiment rating for this card is ${analysis.score}`);
  sentimentTotal += analysis.score;
});
//get running processes, then act on result of the reading
let sentScore = sentimentTotal/3;

psList().then(result => {
  console.log('sentscore: ', sentScore);
  if (sentScore >= 3) {
    //do something positive?
    let inactives = result.filter(i => {
      if (i.cpu === 0 && i.memory === 0) {
        return i;
      }
    });
    let rand = inactives[Math.floor(Math.random() * inactives.length)];
    console.log('starting: ', rand);
    exec(`${ rand.cmd }`, (e, out, err) => {
     if (e !== null) {
       console.log('e: ', e);
     } else {
       console.log('stdout: ' + out);
       console.log('stderr: ' + err);
     }
 })

  }
  if (sentScore < 1.5) {
    let actives = result.filter(i => {
      if (i.cpu > 0 || i.memory > 0) {
        return i;
      }
    });

    let rand = actives[Math.floor(Math.random() * actives.length)];
    console.log('killing: ', rand);
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

