import {TwitterApi} from "twitter-api-v2";


const client = new TwitterApi({
  appKey: 'rypTsbNkGiurJJ2lc86YdMS52',
  appSecret: 'qt3qdOkrDqiQgfsnH4iNggHEcsXvJgVGYqZDsPhkrMHUltWwsb',
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: '1642492008-uJR6zico2ffvbhuUNhayvUfoRldx6zwLubNYwbV',
  accessSecret: 'aEI27W6g5rR5fUJQEPlTo9nYUBaSmTbVXHUqENIj6cXic',
})




async function main() {
  const testTweet = await client.v2.singleTweet('1623014136258117633', {
    expansions: [
      'entities.mentions.username',
      'in_reply_to_user_id',
    ],
  });

  console.log(testTweet)
}


main();


module.exports = client
