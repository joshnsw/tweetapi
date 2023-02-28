
const input = document.getElementById("input");

const tweetList = document.getElementById("tweetlist");

const getTweet = document.getElementById("gettweet");

const savebtn =  document.getElementById("save");

let temp_tweet;

let temp_user;

const url = "http://localhost:3000"

// const url  = "https://tweetapi-joshnsw.onrender.com"


getTweet.addEventListener("click", function() {
  const inputValue = input.value;

  fetch(`${url}/tweet/${inputValue}`, {mode: 'cors'})
    .then(response => response.json())
    .then((data) => {

      const result = document.getElementById("result")
      temp_tweet = data.data.text
      temp_user = data.includes.users[0].username
      result.innerHTML = data.data.text
      console.log(data)
    })
    .catch(error => console.error(error));


});

tweetList.addEventListener("click", (event) => {
  if (event.target.matches("#deletetweet")) {
    const tweetId = event.target.dataset.id;

    fetch(`${url}/tweet/${tweetId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Remove tweet from UI
        event.target.parentNode.parentNode.remove();
      })
      .catch(error => console.error(error));
  }
});


savebtn.addEventListener("click", function() {


  fetch(`${url}/save-tweet`, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ "tweet": temp_tweet, "user": temp_user })
  })
  .then(response => response.json())
  .then((data) => {
  console.log(data)
  tweetList.innerHTML = ''
  refreshTweets();
  })
  .catch(error => console.error(error));
  });



// get latest tweets

const refreshTweets  = function() {

  fetch(`${url}/tweets`).then(response => response.json()).then((data) => {

    console.log(data)
    const tweetList = document.getElementById("tweetlist");
    const tweets =  data.tweets;
    tweets.forEach( (tweet) => {

      tweetList.innerHTML += `  <div ><div class="card p-2 mb-2 shadow-sm col-12  ">"${tweet.tweet}" - ${tweet.user} <button id = "deletetweet" class="btn btn-info btn-sm mt-3 mb-3 px-3 col-2" data-id="${tweet.id}">X</button></div> </div>`

    })


  }).catch(error => console.error(error));

}




fetch(`${url}/tweets`).then(response => response.json()).then((data) => {

  console.log(data)
  const tweetList = document.getElementById("tweetlist");
  const tweets =  data.tweets;
  tweets.forEach( (tweet) => {

    tweetList.innerHTML += `  <div ><div class="card p-2 mb-2 shadow-sm col-12  ">"${tweet.tweet}" - ${tweet.user} <button id = "deletetweet" class="btn btn-info btn-sm mt-3 mb-3 px-3 col-2" data-id="${tweet.id}">X</button></div> </div>`

  })


}).catch(error => console.error(error));
