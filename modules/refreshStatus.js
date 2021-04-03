let numberBots = require("./constants.js").numberBots

function refreshStatus(client, plusorminus) {
	if (plusorminus == "plus") numberBots++
	else if (plusorminus == "minus") numberBots--
	client.user.setActivity(numberBots + " bots", {
		type: "STREAMING",
		url: "https://twitch.tv/fox3000"
	})
}

exports.refreshStatus = refreshStatus
