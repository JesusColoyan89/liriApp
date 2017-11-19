var fs = require("fs");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var inquirer = require("inquirer");
var twitterKeys = twitter ({
  consumer_key: 'EcjawGt75KJ4lwZPl2Pw6XDYm',
  consumer_secret: 'CBBGIdBXADM2LMMIhXy8EV00uqsGb1A8WKdfhVLZX1DZe1axAX',
  access_token_key: '932337132290453505-rBZv3Th7VLyft2u86euBilxjTicuwbh',
  access_token_secret: 'I8U5EEkSB4UZG7CHoQ0HCBe2Y8oPlAjVjKrUxHQzZlyJU',
});

inquirer.prompt([
{
	type: "list",
	message: "Hello, please select a function",
	choices: ["Tweet Check", "Spotify this song", "Look up this movie"],
	name: "command"
}
]).then(function(response){
	switch(response.command){
		case "Tweet Check":
		tweet();
		break;
	
		case "Spotify this song":
		spotify();
		break;

		case "Look up this movie":
		omdb();
		break;
		

};

function tweet() {
	var parameter = {screen_name: 'orangeBeanieMAn'};
			twitterKeys.get('statuses/user_timeline', parameter,function(error, tweets, response) {
				for (i=0; i <15; i++){
					console.log("Tweets " + (i+1) + ": " + twitter[i].text);
				}
			})
};

function spotify() {
	spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    	}
		console.log(data);
})
};

function omdb() {
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
	request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

   
    console.log("Info: " + JSON.parse(body).Plot);
  }
});
}	



