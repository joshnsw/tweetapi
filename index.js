  const express = require("express");
  const {TwitterApi} = require("twitter-api-v2");
  const cors = require('cors')
  const app = express();

  const { v4: uuidv4 } = require('uuid');

  const bodyParser = require("body-parser");
  const fs = require('fs');

  const path = require('path');

  app.use(bodyParser.json());



  const port = process.env.PORT || 3000

  require('dotenv').config();

  app.use(cors())

  const key = process.env.apikey

  const secret = process.env.appSecret

  const atoken = process.env.atoken

  const asecret = process.env.asecret

  app.use(express.static(path.join(__dirname, 'public')));

  const client = new TwitterApi({
    appKey: 'EOiXQGClVh2SIeigs214CpFG6',
    appSecret: 'pKRTj0B7WC6Pr3E42l2QI11naokzqs5uGeUgx3CxMkESBJEiN7',
    accessToken: '1642492008-nV6u08uArI1UB42s5pfbIbJoihSwiZYeXuyPv4U',
    accessSecret: 'sHOWIal9UsxNzvEA8FNHVaPZu9lz2Ja6Jfc3IMnQgSyE2',
  });

  const v2Client = client.v2;

  app.get("/tweet/:id", async (req, res) => {
    const tweetId = req.params.id;

    const testTweet = await v2Client.singleTweet(tweetId, { expansions: ['author_id'], 'user.fields': ['username', 'url'] });

    res.send(testTweet);
  });



  app.delete('/tweet/:id', (req, res) => {
    const tweetId = req.params.id;
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let db = {};
        try {
          db = JSON.parse(data);
        } catch (error) {
          console.error(error);
        }
        db.tweets = db.tweets.filter((tweet) => tweet.id !== tweetId);
        fs.writeFile('db.json', JSON.stringify(db), 'utf-8', (error) => {
          if (error) {
            console.error(error);
          }
        });
        res.json({ message: `Deleted tweet with ID ${tweetId}` });
      }
    });
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
      const id = uuidv4();
      db.tweets.push({ "tweet": tweet , "user": user , "id": id});
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
    console.log(process.env.apikey)
    console.log(process.env.appSecret)
    ;})
