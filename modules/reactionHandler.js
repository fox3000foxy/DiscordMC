const controls = require('./controls.js').controls
const faceToDirection = require('./constants.js').faceToDirection

function reactionHandler(client, McCli) {
	client.on('messageReactionAdd', async (reaction, user) => {
		if (reaction.count >= 2) {
			if (reaction.emoji.id == controls.place) { block = McCli.blockAtCursor(maxDistance = 5); if (block != null) { McCli.placeBlock(block, faceToDirection[block.face], () => { }) } }
			if (reaction.emoji.id == controls.mine) { if (McCli.blockAtCursor(maxDistance = 5) != null) { McCli.dig(McCli.blockAtCursor(maxDistance = 5)) } }
			if (reaction.emoji.id == controls.jump) { McCli.setControlState('jump', true) }
			if (reaction.emoji.id == controls.sneak) { McCli.setControlState('sneak', true) }
			if (reaction.emoji.id == controls.sprint) { McCli.setControlState('sprint', true) }
			if (reaction.emoji.name == controls.left) { McCli.setControlState('right', true) }
			if (reaction.emoji.name == controls.right) { McCli.setControlState('left', true) }
			if (reaction.emoji.name == controls.up) { McCli.setControlState('forward', true) }
			if (reaction.emoji.name == controls.down) { McCli.setControlState('back', true) }
			if (reaction.emoji.name == controls.lookLeft) { LookLeft = setInterval(() => { McCli.look(McCli.entity.yaw + 0.005, McCli.entity.pitch) }) }
			if (reaction.emoji.name == controls.lookRight) { LookRight = setInterval(() => { McCli.look(McCli.entity.yaw - 0.005, McCli.entity.pitch) }) }
			if (reaction.emoji.name == controls.lookUp) { LookUp = setInterval(() => { McCli.look(McCli.entity.yaw, McCli.entity.pitch + 0.005) }) }
			if (reaction.emoji.name == controls.lookDown) { LookDown = setInterval(() => { McCli.look(McCli.entity.yaw, McCli.entity.pitch - 0.005) }) }
			if (reaction.emoji.id == controls.action) {
				if (McCli.blockAtCursor(maxDistance = 5) != null)
					McCli.activateBlock(McCli.blockAtCursor(maxDistance = 5))
			}
			if (reaction.emoji.name == controls.deleteCt) { let deleteChannel = require('./messageHandler').deleteChannel; deleteChannel(client, reaction, user) }
			if (reaction.message.content.startsWith("> +")) {
				let craftItem = require('./messageHandler').craftItem
				craftItem(reaction.emoji.name, user.discriminator)
			}
		}
	});
	client.on('messageReactionRemove', async (reaction, user) => {
		if (reaction.emoji.name == controls.left) { McCli.setControlState('right', false) }
		if (reaction.emoji.name == controls.right) { McCli.setControlState('left', false) }
		if (reaction.emoji.name == controls.up) { McCli.setControlState('forward', false) }
		if (reaction.emoji.name == controls.down) { McCli.setControlState('back', false) }
		if (reaction.emoji.id == controls.jump) { McCli.setControlState('jump', false) }
		if (reaction.emoji.id == controls.sneak) { McCli.setControlState('sneak', false) }
		if (reaction.emoji.id == controls.sprint) { McCli.setControlState('sprint', false) }
		if (reaction.emoji.name == controls.lookLeft) { clearInterval(LookLeft) }
		if (reaction.emoji.name == controls.lookRight) { clearInterval(LookRight) }
		if (reaction.emoji.name == controls.lookUp) { clearInterval(LookUp) }
		if (reaction.emoji.name == controls.lookDown) { clearInterval(LookDown) }
	});
}

exports.reactionHandler = reactionHandler