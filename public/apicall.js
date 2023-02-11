
const input = document.getElementById("input");




const savebtn =  document.getElementById("save");

let temp_tweet;

button.addEventListener("click", function() {
  const inputValue = input.value;

  fetch(`http://localhost:3000/tweet/${inputValue}`, {mode: 'cors'})
    .then(response => response.json())
    .then((data) => {

      const result = document.getElementById("result")
      temp_tweet = data.data.text
      result.innerHTML = data.data.text
      console.log(data)
    })
    .catch(error => console.error(error));


});


savebtn.addEventListener("click", function() {


  fetch("http://localhost:3000/save-tweet", {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ "tweet": temp_tweet })
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

    tweetList.innerHTML += `<li>${tweet.tweet}</li>`

  })


}).catch(error => console.error(error));
