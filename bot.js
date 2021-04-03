//SERVER IP 	Official : 185.228.139.97:25564
//Nodes_modules
const Discord = require('discord.js');
const client = new Discord.Client();
const messageHandler = require('./modules/messageHandler.js').messageHandler
//Connection
client.login('ODIzNTM0NjkxMjI2MzUzNzI1'+'.YFiOcg'+'.E83XmQulBNaskD4XpCawM'+'-8RRqs');
messageHandler(client)
//Ready Event
client.on('ready', () => {
	console.log("Ready")
	let Guilds = client.guilds.cache.map(guild => guild.id)
	for (i=0;i<Guilds.length;i++)
	{
		let Guild = client.guilds.cache.get(Guilds[i])
		let Channels = Guild.channels.cache.map(channel => channel.name)
		let ChannelsId = Guild.channels.cache.map(channel => channel.id)
		for (j=0;j<Channels.length;j++)
		{
			if (Channels[j].indexOf("bot-")!=-1)
			{
				let channel = Guild.channels.cache.get(ChannelsId[j])
				channel.delete();
			}
		}
	}
})
  