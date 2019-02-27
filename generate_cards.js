const titleGen = new ml5.charRNN('./models/titles');
const descriptionGen = new ml5.charRNN('./models/descriptions');
const meaningGen = new ml5.charRNN('./models/meanings');
const guideGen = new ml5.charRNN('./models/guide');
console.log('titlegen: ', titleGen);

let cards = [];
function setup() {
  generateButton = select("#generate");
  downloadButton = select("#download");
  generateButton.mousePressed(generate);
  downloadButton.mousePressed(download);
}
function generate() {
  let card ={};
  let title = titleGen.generate({ seed: 'The', length: getRandomArbitrary(8, 25) , temperature: 0.5}, (e, r) => {
    card['title'] = 'The' + r.sample;
  });

  let guide = guideGen.generate({  length: getRandomArbitrary(50, 400) , temperature: 0.5}, (e, r) => {
    card['desc'] = r.sample;
    cards.push(card);
    console.log('currentcard: ', card);
    console.log('cards: ', cards);
    select('#currentcard').html(`title: ${card.title}
    desc: ${card.desc}
    cardcount: ${cards.length}`);
  });
}


// Function to download data to a file
function download() {
    var file = new Blob([JSON.stringify(cards)], {type: 'json'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'cards.json');
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'cards.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}




function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
