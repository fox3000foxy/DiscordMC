let numberBots = require("./constants.js").numberBots
let setStatus;
function refreshStatus(client, plusorminus) {
	clearInterval(setStatus)
	if (plusorminus == "plus") numberBots++
	else if (plusorminus == "minus") numberBots--
	setStatus = setInterval(() => {
		client.user.setActivity(numberBots + " bots", {
			type: "STREAMING",
			url: "https://twitch.tv/fox3000"
		})
		setTimeout(() => {
			client.user.setActivity("!panel", {
				type: "LISTENING",
			})
		}, 2500)
	},5000)
}

exports.refreshStatus = refreshStatus
