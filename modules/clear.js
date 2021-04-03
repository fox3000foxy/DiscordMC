function Info(message, channel) {
    let info = "```\n";
    // info += "!panel for create a panel\n"
    info += "!select[item_name] for select item\n"
    info += "!craft[place][item_name] for set an item in case in your crafting table\n"
    info += "!craft patern[item_name] for get craft pattern of[item_name]\n"
    info += "```"
    info += "You can have a view of your bot to http://localhost:" + message.author.discriminator
    channel.send(info);
}

function clear(message) {
    message.delete()
    return message.channel.bulkDelete(100)
}

exports.clear = clear
exports.Info = Info
