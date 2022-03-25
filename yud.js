const { 
WAConnection: _WAConnection,
Browsers 
} = require('@adiwajshing/baileys')
const { color,
bgcolor 
} = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache,
nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./dha.js')
nocache('../dha.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))

const starts = async (dha = new WAConnection()) => {
	dha.logger.level = 'warn'
	console.log(color(figlet.textSync('DHA BOTZ', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ Pesan ]', 'orange'), color('Bot Telah Online!', 'magenta'))
	console.log(color('[ Pesan ]', 'cyan'), color('Gunakan Bot Dengan Bijak','magenta'))
	dha.browserDescription = ["DHA - BOT", "Opera", "3.0.0"];

	// Menunggu QR
	dha.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Tolong Scan Qrnya Bwang...','magenta'))
	})

	// Menghubungkan
	fs.existsSync(`./DhaBotz.json`) && dha.loadAuthInfo(`./DhaBotz.json`)
	dha.on('connecting', () => {
		console.log(color('[ Pesan ]', 'orange'), color('Proses Penyambungan...','magenta'));
	})
	//connect
	dha.on('open', () => {
		console.log(color('[ Pesan ]', 'orange'), color('Bot Siap Digunakan...','magenta'));
	})
	// session
	await dha.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./DhaBotz.json`, JSON.stringify(dha.base64EncodedAuthInfo(), null, '\t'))
    //dha.sendMessage(`6282287486762@s.whatsapp.net`, `*${setting.botName}* Telah Berhasil Tersambung`)
	// Baterai
	dha.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	dha.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})
    
	// welcome
	dha.on('group-participants-update', async (anu) => {
		await welcome(dha, anu)
	})

	dha.on('chat-update', async (message) => {
		require('./dha.js')(dha, message)
	})
}

starts()