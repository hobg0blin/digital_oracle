#  Digital Oracle
## A meditation on computer as querent and reader

Digital Oracle is two things: a char-rn-based oracle deck generator and a terminal-based tarot reading script. It uses sentiment analysis on an RNN-generated tarot deck (in JSON format) to determine an action for your computer to take - either running the start command and ‘cherishing’ an existing process, or killing an existing process if the reading is determined to be negative.

You can find a blog post about the process [here](https://medium.com/@brentbailey/digital-oracle-29621767786b).

## Getting started

To generate your own deck, clone this repo, install http-server

``` npm i http-server ```

Then go to localhost:{portnumber}/generator.html. Once you feel you’ve generated enough cards, you can download them as a JSON file (a warning - after running the generate function about 20 times, it tends to drastically slow down and give bad output, same if you click it a bunch of times at once without waiting for the newest card to be generated). This is pretty easily fixed by just reloading the page.

## Running the script

From the root folder, run ```npm install```, then ```node index_v2.js``` to initiate a reading. If you’ve generated your own cards, then you’ll want to go into index_v2 and change the ```data``` path to reflect your own cards.

## Other stuff

If you’re interested, you can follow the same steps above with index_v1.js to do a reading based on cards pulled from a [tarot api](https://github.com/ekelen/tarot-api). 

There are a few basic models trained on data from the tarot api if you want to play around with them as well. To train your own, you can follow the ml5 tutorial [here](https://ml5js.org/docs/training-lstm).

There’s also a script (deepai_script.js) that was an attempt to pull from [deepai’s text2img model](https://deepai.org/machine-learning-model/text2img). I couldn’t get it to work with their API but you’re welcome to try if you’d like to generate images for your rnn-generated cards.

## Sources

The LSTM model is trained (for titles) on the 78 original tarot cards from the Rider-Waite deck, and for descriptions on the text of [A Guide to Tarot Meanings](http://tarottools.com/a-guide-to-tarot-card-meanings/). I’m using [ml5’s char-rnn model](https://ml5js.org/docs/CharRNN) to generate the cards. Sentiment analysis is done through [the npm sentiment module](https://www.npmjs.com/package/sentiment). If I’m missing anything else that deserves credit, please feel free to reach out and let me know. This is extremely open-source and anyone is welcome to steal any and all of my code.


Happy divining!
