fetch("https://v3.football.api-sports.io/fixtures?date=2024-09-19", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "bd6e1b2aa823220c6a92b602312d60e2"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});