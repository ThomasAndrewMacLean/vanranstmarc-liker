const express = require('express');
const logger = require('volleyball');
const bodyParser = require('body-parser');
const Twit = require('twit');

const app = express();

const T = new Twit({
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_SECRET_TOKEN,
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    timeout_ms: 60 * 1000
});

app.use(logger);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

const username = 'vanranstmarc';

app.get('/tweets', (req, res) => {
    return T.get('statuses/user_timeline', {
        screen_name: username,
        count: 25,
        tweet_mode: 'extended'
    }).then(tweets => {
        tweets.data
            .filter(tweet => !tweet.favorited)
            .forEach(async tweet => {
                await T.post('favorites/create', { id: tweet.id_str });
            });

        res.send('🎗helfieOpMnSmelfie');
    });
});

module.exports = app;
