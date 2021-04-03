//Get Emoji
function getEmojiByName(client,name)
{
	
    return client.emojis.cache.find(emoji => emoji.name === name) 
}

function getEmoji(client,name)
{
	if (getEmojiByName(client,name)!=null)
    return "<:"+name+":"+getEmojiByName(client,name).id+">"
}

exports.getEmoji = getEmoji
