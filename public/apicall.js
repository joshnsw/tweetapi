
const input = document.getElementById("input");




const savebtn =  document.getElementById("save");

let temp_tweet;

let temp_user;

button.addEventListener("click", function() {
  const inputValue = input.value;

  fetch(`https://tweetapi-joshnsw.onrender.com/tweet/${inputValue}`, {mode: 'cors'})
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


savebtn.addEventListener("click", function() {


  fetch("https://tweetapi-joshnsw.onrender.com/save-tweet", {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ "tweet": temp_tweet, "user": temp_user })
  })
  .then(response => response.json())
  .then((data) => {
  console.log(data)
  })
  .catch(error => console.error(error));
  });


fetch("https://tweetapi-joshnsw.onrender.com/tweets").then(response => response.json()).then((data) => {

  console.log(data)
  const tweetList = document.getElementById("tweetlist");
  const tweets =  data.tweets;
  tweets.forEach( (tweet) => {

    tweetList.innerHTML += `<div class="card p-2 mb-2 shadow-sm">"${tweet.tweet}" - ${tweet.user} </div>`

  })


}).catch(error => console.error(error));
