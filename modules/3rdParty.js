function isNull(value) { return value != null; }
function toShape(ingredients) { return [[ingredients, null, null], [null, null, null], [null, null, null]] }
function withoutNull(craft) {
	let result = new Array()
	result[0] = craft[0].filter(isNull)
	result[1] = craft[1].filter(isNull)
	result[2] = craft[2].filter(isNull)
	let final = new Array()
	if (JSON.stringify(result[0]) != "[]") final[0] = result[0]
	if (JSON.stringify(result[1]) != "[]") final[1] = result[1]
	if (JSON.stringify(result[2]) != "[]") final[2] = result[2]
	return final
}

exports.toShape = toShape 
exports.withoutNull = withoutNull 