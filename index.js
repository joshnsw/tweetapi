  const express = require("express");
  const {TwitterApi} = require("twitter-api-v2");
  const cors = require('cors')
  const app = express();

  const bodyParser = require("body-parser");
  const fs = require('fs');

  const path = require('path');

  app.use(bodyParser.json());



  const port = process.env.PORT || 3000

  require('dotenv').config();

  app.use(cors())

  const key = process.env.apikey



  app.use(express.static(path.join(__dirname, 'public')));

  const client = new TwitterApi({
    appKey: key,
    appSecret: secret,
    accessToken: '1642492008-uJR6zico2ffvbhuUNhayvUfoRldx6zwLubNYwbV',
    accessSecret: 'aEI27W6g5rR5fUJQEPlTo9nYUBaSmTbVXHUqENIj6cXic',
  });

  const v2Client = client.v2;

  app.get("/tweet/:id", async (req, res) => {
    const tweetId = req.params.id;

    const testTweet = await v2Client.singleTweet(tweetId, { expansions: ['author_id'], 'user.fields': ['username', 'url'] });

    res.send(testTweet);
  });


  app.get('/tweets', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  });


  app.post("/save-tweet", (req, res) => {
    console.log(req.body)
    const tweet = req.body.tweet;
    const user = req.body.user;
    // Save the tweet to the db.json file
    fs.readFile('db.json', 'utf-8', (error, data) => {
      if (error) {
        console.error(error)
        return
      }
      let db = {}
      try {
        db = JSON.parse(data)
      } catch (error) {
        console.error(error)
      }
      db.tweets = db.tweets || []
      db.tweets.push({ "tweet": tweet , "user": user });
      fs.writeFile('db.json', JSON.stringify(db), 'utf-8', (error) => {
        if (error) {
          console.error(error)
        }
      });
    });
    res.json({message: "Saved tweet successfully"});
  });

  app.listen(port, () => {
    console.log("Server listening on port 3000")

    ;})
