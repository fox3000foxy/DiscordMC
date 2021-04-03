const Vec3 = require('vec3')
let ClientsArray = new Array()
for (i=0;i>=9999;i++){ClientsArray[i]=undefined;}	
let message = new Array()
for (i=0;i>=9999;i++){message[i]=undefined;}	
let craftpanel = new Array()
for (i=0;i>=9999;i++){craftpanel[i]=undefined;}	
let craftslots = new Array()
for (i=0;i<=9999;i++){
craftslots[i] = new Array()
for (j=1;j<=9;j++){
craftslots[i][j]="nothing";
}	
}
let numberBots = 0
const faceToDirection = [
new Vec3(0,-1,0), // BOTTOM
new Vec3(0,1,0), // TOP
new Vec3(0,0,-1), // NORTH
new Vec3(0,0,1), // SOUTH
new Vec3(-1,0,0), // WEST
new Vec3(1,0,0), // EAST
]

exports.ClientsArray = ClientsArray
exports.message = message
exports.CraftPanel = craftpanel
exports.CraftSlots = craftslots
exports.numberBots = numberBots
exports.faceToDirection = faceToDirection