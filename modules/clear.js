function Info(message,channel)
{
	channel.send("You can have a view of your bot to http://localhost:"+message.author.discriminator);
}

function clear(message){
    message.delete()
    return message.channel.bulkDelete(100)
}

exports.clear = clear
exports.Info = Info
