let ClientsArray = require('./constants.js').ClientsArray
let Message = require('./constants.js').message
let CraftPanel = require('./constants.js').CraftPanel
let CraftSlots = require('./constants.js').CraftSlots

//Modules
const controls = require('./controls.js').controls
const getEmoji = require('./getEmoji.js').getEmoji
const refreshStatus = require('./refreshStatus.js').refreshStatus
const channelPermissions = require('./channelPermissions.js').channelPermissions
const Info = require('./clear.js').Info
const reactionHandler = require('./reactionHandler.js').reactionHandler
//Node_modules
const mcData = require('minecraft-data')("1.16.5")
const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer

const withoutNull = require('./3rdParty.js').withoutNull
const toShape = require('./3rdParty.js').toShape

//Fucntion
function getCraftResult(craft) {
	for (i = 0; i < Object.keys(mcData.recipes).length; i++) {
		let recipe = mcData.recipes[Object.keys(mcData.recipes)[i]]
		if (recipe[0].inShape) {
			if (JSON.stringify(recipe[0].inShape) === JSON.stringify(withoutNull(craft))) {
				return mcData.items[recipe[0].result.id].name
			}
		}
		if (recipe[0].ingredients) {
			if (JSON.stringify(recipe[0].ingredients[0]) === JSON.stringify(craft[0][0])) {
				return mcData.items[recipe[0].result.id].name
			}
		}
	}
}

function getCraftRecipe(item) {
	for (i = 0; i < Object.keys(mcData.recipes).length; i++) {
		let recipe = mcData.recipes[Object.keys(mcData.recipes)[i]]
		if (mcData.itemsByName[item])
			if (recipe[0].result.id === mcData.itemsByName[item].id)
				if (recipe[0].inShape)
					return recipe[0].inShape
				else if (recipe[0].ingredients)
					return toShape(recipe[0].ingredients)
	}
}
function CraftConvertAndResult(discri) {
	let slot = new Array()
	for (i = 1; i < 10; i++) { slot[i] = CraftSlots[discri][i] == "nothing" ? null : mcData.itemsByName[CraftSlots[discri][i]].id }
	let craft = [[slot[1], slot[2], slot[3]], [slot[4], slot[5], slot[6]], [slot[7], slot[8], slot[9]]]
	return getCraftResult(craft)
}
function PatternOfCraft(client, discri, item) {
	let recipe = getCraftRecipe(item)
	// console.log(recipe[0][0])
	// console.log(mcData.items[recipe[0][0]].name)
	if (recipe) {
		CraftSlots[discri][1] = mcData.items[recipe[0][0]] == null || mcData.items[recipe[0][0]] == undefined ? "nothing" : mcData.items[recipe[0][0]].name
		CraftSlots[discri][2] = mcData.items[recipe[0][1]] == null || mcData.items[recipe[0][1]] == undefined ? "nothing" : mcData.items[recipe[0][1]].name
		CraftSlots[discri][3] = mcData.items[recipe[0][2]] == null || mcData.items[recipe[0][2]] == undefined ? "nothing" : mcData.items[recipe[0][2]].name
		if (recipe.length != 1) {
			CraftSlots[discri][4] = mcData.items[recipe[1][0]] == null || mcData.items[recipe[1][0]] == undefined ? "nothing" : mcData.items[recipe[1][0]].name
			CraftSlots[discri][5] = mcData.items[recipe[1][1]] == null || mcData.items[recipe[1][1]] == undefined ? "nothing" : mcData.items[recipe[1][1]].name
			CraftSlots[discri][6] = mcData.items[recipe[1][2]] == null || mcData.items[recipe[1][2]] == undefined ? "nothing" : mcData.items[recipe[1][2]].name
		}
		else {
			CraftSlots[discri][4] = "nothing"
			CraftSlots[discri][5] = "nothing"
			CraftSlots[discri][6] = "nothing"
		}
		if (recipe.length != 2) {
			CraftSlots[discri][7] = mcData.items[recipe[2][0]] == null || mcData.items[recipe[2][0]] == undefined ? "nothing" : mcData.items[recipe[2][0]].name
			CraftSlots[discri][8] = mcData.items[recipe[2][1]] == null || mcData.items[recipe[2][1]] == undefined ? "nothing" : mcData.items[recipe[2][1]].name
			CraftSlots[discri][9] = mcData.items[recipe[2][2]] == null || mcData.items[recipe[2][2]] == undefined ? "nothing" : mcData.items[recipe[2][2]].name
		}
		else {
			CraftSlots[discri][7] = "nothing"
			CraftSlots[discri][8] = "nothing"
			CraftSlots[discri][9] = "nothing"
		}
	}
	// console.log(CraftSlots[discri])
	let table = "> +------------+\n"
	table += "> |" + getEmoji(client, CraftSlots[discri][1]) + "|" + getEmoji(client, CraftSlots[discri][2]) + "|" + getEmoji(client, CraftSlots[discri][3]) + "|\n"
	table += "> +------------+\n"
	table += "> |" + getEmoji(client, CraftSlots[discri][4]) + "|" + getEmoji(client, CraftSlots[discri][5]) + "|" + getEmoji(client, CraftSlots[discri][6]) + "|\n"
	table += "> +------------+\n"
	table += "> |" + getEmoji(client, CraftSlots[discri][7]) + "|" + getEmoji(client, CraftSlots[discri][8]) + "|" + getEmoji(client, CraftSlots[discri][9]) + "|\n"
	table += "> +------------+\n"
	CraftPanel[discri].edit(table)
}
//get inv
function getInventory(client, message, channel) {
	let id = message.author.discriminator
	let exampleEmbed = '> Wait a second...'
	channel.send(exampleEmbed).then((thisMessage) => { refreshInv(client, id, thisMessage) })
}
function getCraftPanel(client, message, channel) {
	let table = "> +------------+\n"
	table += "> |" + getEmoji(client, "nothing") + "|" + getEmoji(client, "nothing") + "|" + getEmoji(client, "nothing") + "|\n"
	table += "> +------------+\n"
	table += "> |" + getEmoji(client, "nothing") + "|" + getEmoji(client, "nothing") + "|" + getEmoji(client, "nothing") + "|\n"
	table += "> +------------+\n"
	table += "> |" + getEmoji(client, "nothing") + "|" + getEmoji(client, "nothing") + "|" + getEmoji(client, "nothing") + "|\n"
	table += "> +------------+\n"
	channel.send(table).then((thisMessage) => { defineCraftPanel(message, thisMessage) })
}
function deleteChannel(client, reaction, user) {
	reaction.message.member.roles.remove(reaction.message.guild.roles.cache.find(e => e.name == "OnGame"))
	// console.log(user.id)
	refreshStatus(client, "minus")
	closeMC(user.discriminator)
	reaction.message.channel.delete()
}
exports.deleteChannel = deleteChannel
function closeMC(discri) {
	if (ClientsArray[discri]) {
		ClientsArray[discri].viewer.close()
		ClientsArray[discri].quit()
	}
}
function refreshInv(client, id, thisMessage) {
	let inventory = ClientsArray[id].inventory
	let exampleEmbed = '> **Inventory**:'
	for (i = 0; i < inventory.slots.length; i++) {
		let item = inventory.slots[i]
		if (inventory.slots[i] != null) {
			if (inventory.slots[i].slot == ClientsArray[id].quickBarSlot + 36)
				exampleEmbed += "\n> -" + getEmoji(client, item.name) + item.count + " `" + item.displayName + "`"
			else
				exampleEmbed += "\n> -" + getEmoji(client, item.name) + item.count + " " + item.displayName
		}
	}
	thisMessage.edit(exampleEmbed).catch(() => { return; })
	setTimeout(() => { refreshInv(client, id, thisMessage) }, 5000)
}
//ctrls
function getControls(client, message, channel) {
	Info(message, channel)
	channel.send("> Controls")
		.then((thisMessage) => { defineMessage(message, thisMessage); for (i in controls) { thisMessage.react(controls[i]) } })
		.then(() => { getInventory(client, message, channel) })
		.then(() => { getCraftPanel(client, message, channel) })
}
function defineMessage(message, thisMessage) {
	Message[message.author.discriminator] = thisMessage
}
function defineCraftPanel(message, thisMessage) {
	CraftPanel[message.author.discriminator] = thisMessage
}
function debugCmds(client, message) {
	if (message.content.startsWith('#item')) { message.channel.send(getEmoji(client, message.content.split(" ")[1])) }
}
//create output
function createMinecraftClient(client, message) {
	ClientsArray[message.author.discriminator] = mineflayer.createBot({
		username: "Dsc-" + message.author.username,
		host: '185.228.139.97',
		port: 25564
	})
	reactionHandler(client, ClientsArray[message.author.discriminator])
	ClientsArray[message.author.discriminator].on('spawn', () => {
		mineflayerViewer(ClientsArray[message.author.discriminator], { firstPerson: true, port: parseInt(message.author.discriminator) })
		ClientsArray[message.author.discriminator].on('error', (err) => {
			console.log(err)
		})
		ClientsArray[message.author.discriminator].on('chat', (username, MCMessage) => {
			if (username != message.author.username)
				Message[message.author.discriminator].channel.send(`Chat: <${username}> ${MCMessage}`).then((thisMessage) => { setTimeout(() => { thisMessage.delete() }, 5000) })
		})
	})
}
function setCraft(client, discri, place, item) {
	CraftSlots[discri][place] = item
	let table = "> +------------+\n"
	table += "> |" + getEmoji(client, CraftSlots[discri][1]) + "|" + getEmoji(client, CraftSlots[discri][2]) + "|" + getEmoji(client, CraftSlots[discri][3]) + "|\n"
	table += "> +------------+\n"
	table += "> |" + getEmoji(client, CraftSlots[discri][4]) + "|" + getEmoji(client, CraftSlots[discri][5]) + "|" + getEmoji(client, CraftSlots[discri][6]) + "|\n"
	table += "> +------------+\n"
	table += "> |" + getEmoji(client, CraftSlots[discri][7]) + "|" + getEmoji(client, CraftSlots[discri][8]) + "|" + getEmoji(client, CraftSlots[discri][9]) + "|\n"
	table += "> +------------+\n"
	CraftPanel[discri].edit(table)
}
//create panel
function createPanel(client, message) {
	refreshStatus(client, "plus")
	message.channel.send("Your panel is created, " + message.author.username)
	message.guild.channels.create("bot-" + message.author.username, {
		type: "text",
		permissionOverwrites: channelPermissions(message),
	}).then((thisChannel) => { getControls(client, message, thisChannel) })
	createMinecraftClient(client, message)
	/* 	message.member.roles.add(message.guild.roles.cache.find(e => e.name == "OnGame")) */
}
function craftCmd(client, message) {
	if (message.content.indexOf("pattern") == -1) { setCraft(client, message.author.discriminator, message.content.split(" ")[1], message.content.split(" ")[2]) }
	else { PatternOfCraft(client, message.author.discriminator, message.content.split(" ")[2]) }
	message.delete()
	CraftPanel[message.author.discriminator].reactions.removeAll()
	let item = CraftConvertAndResult(message.author.discriminator)
	if (item) {
		CraftPanel[message.author.discriminator].react(getEmoji(client, item))
	}
}
function craftItem(item, discri) {
	let craftingTable;
	if (ClientsArray[discri].blockAtCursor(maxDistance = 5) != null)
		if (ClientsArray[discri].blockAtCursor(maxDistance = 5).name == "crafting_table") {
			craftingTable = ClientsArray[discri].blockAtCursor(maxDistance = 5)
		}
		else {
			craftingTable = null
		}
	else craftingTable = null
	let recipe = ClientsArray[discri].recipesFor(mcData.itemsByName[item].id, 0, null, craftingTable)
	ClientsArray[discri].craft(recipe[0], 1, craftingTable, () => { })
		.catch(() => { })
}
exports.craftItem = craftItem

function MessageHandler(client, message) {
	client.on('message', message => {
		// message.member.roles.remove(message.guild.roles.cache.find(e=> e.name == "OnGame"))
		debugCmds(client, message)
		if (message.channel.name.indexOf("bot-") != -1) {
			if (message.content.startsWith('!select')) { ClientsArray[message.author.discriminator].equip(mcData.itemsByName[message.content.split(" ")[1]].id, "hand"); message.delete() }
			else if (message.content.startsWith('!craft')) { craftCmd(client, message) }
			else if (message.author.bot == false) {
				setTimeout(() => { message.delete() }, 5000);
				ClientsArray[message.author.discriminator].chat(message.content)
			}
		}
		if (message.content === '!panel') { createPanel(client, message) }
	});
}
exports.messageHandler = MessageHandler