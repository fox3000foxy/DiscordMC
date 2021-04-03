function channelPermissions(message){
return [
        {
          id: message.author.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        },
        {
          id: message.guild.roles.everyone,
          deny: ['VIEW_CHANNEL']
        }
]
}

exports.channelPermissions = channelPermissions
