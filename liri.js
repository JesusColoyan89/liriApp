var fs = require("fs");
var keys = require("./keys.js");
var twitter = require("twitter");
// var spotify = require("spotify");
var omdb = require("omdb");
var inquirer = require("inquirer");
var request = require("request");
var twitterKeys =  new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
var spotify = require("node-spotify-api");
var spotifyKeys = new spotify({
		id: keys.spotifyKeys.id,
		secret: keys.spotifyKeys.secret
});

function tweet(){
	var parameter = {screen_name: 'orangeBeanieMAn'};
				twitterKeys.get('statuses/user_timeline', parameter, function(error, tweets, response) {
					for(i = 0; i<15; i++){
						console.log("Tweet " + (i+1) + ": " + tweets[i].text);
					}
				});
		};
		
		function spotify() {
			inquirer.prompt([

							{
									type: "input",
									message: "Spotify a song",
									name: "searchInput"
							}
							]).then(function(response){
								if(response.searchInput ===""){response.searchInput ="Big Fish Theory";}
								spotifyKeys.search({ type: 'track', query: response.searchInput }, function(error, data) {
									if (err) {
										return console.log('Error occured: ' + error);
									}

								for(var i=0; i<10; i++){
									var songInfo = {
										songName: data.tracks.items[i].name,
										artist: data.tracks.items[i].album.artist[0].name,
										album: data.tracks.items[i].album.name,
										url: data.tracks.items[i].external_urls.spotify
									};
									console.log("Song Info: " + JSON.stringify(songInfo, null, 2));
								};

							})
						});	



				};
					function movieSearch(){
						inquirer.prompt([
										{
											type: "input",
											message: "Look up a movie",
											name: "searchInput"
										}

							]).then(function(response){
								if(response.searchInput ===""){
									response.searchInput = "Superbad";
								}
								request("http://www.omdbapi.com/?t=" + response.searchInput + "&y=&plot=short&apikey=trilogy", function(error, response,body) {
									var movieInfo = JSON.parse(body);
									console.log("Title: " + movieInfo.Title);
									console.log("Released: " + movieInfo.Released);
									console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
									console.log("Plot: " + movieInfo.Plot);
								});
							});
						};
					
				


function callFunction(arg){
	if(arg ==="tweet"){
		tweet();
	}else if(arg === "spotify a song"){
		spotify();
	 }else if(arg === "movie search"){
	 	movieSearch();
	 }else {
	 	console.log("Error");
	 }	


};

inquirer.prompt([
		{
			type: "list",
			message: "Please choose a function",
			choices: ["Tweet Feed", "Spotify a song", "Movie Look up"],
			name: "userCommand"
		}
		]).then(function(response){

			switch(response.userCommand){

				case "Tweet Feed":
					tweet();
				break;
				
				case "Spotify a song":
					spotify();
				break;
				
				case "Movie Look up":
					movieSearch();
				break;		
			};
		});
// inq.prompt([
// 		{	
// 			type: "list",
// 			message: "Please choose one of my functions",
// 			choices: ["Tweet Check", "Spotify Search", "Movie Search"],
// 			name: "userCommand"

// 		}
// 		]).then(function(response){

// 			switch(response.userCommand){
// 				// =====================
// 				// Check Tweets
// 				// =====================


// 			case "Tweet Check":
// 			var parameter = {screen_name: "orangeBeanieMAn"};
// 				twitterKeys.get('statuses/user_timeline', parameter, function(error, data, response) {
// 				// 	for(i=0; i < 15; i++)
// 				// 	{
// 				// 		console.log("Tweets " + (i+1) +": " + data[i].text);
// 				// 	}
// 				// });
// 		// tweet();

// 		break;
	
// 				// ========================
// 				// spotify
// 				// ========================



// 		case "Spotify this song":
// 		inq.prompt([
// 			{
// 				type: "input",
// 				message: "Spotify a song!",
// 				name: "spotfiyInput"
// 			}
// 			]).then(function(response){
// 				if(response.spotifyInput===""){}
// 				spotifyKeys.search({type: "track"})
// 			});
		
// 	}
		
		// spotify();
		// break;

		// case "Look up this movie":
		// omdb();
		// break;
		

// };

// function tweet() {
// 	var parameter = {screen_name: 'orangeBeanieMAn'};
// 			twitterKeys.get('statuses/user_timeline', parameter,function(error, tweets, response) {
// 				for (i=0; i <15; i++){
// 					console.log("Tweets " + (i+1) + ": " + twitter[i].text);
// 				}
// 			})
// };

// function spotify() {
// 	spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     	if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     	}
// 		console.log(data);
// })
// };

// function omdb() {
// 	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// 	request(queryUrl, function(error, response, body) {

//   if (!error && response.statusCode === 200) {

   
//     console.log("Info: " + JSON.parse(body).Plot);
//   }
// });




