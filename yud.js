const { 
WAConnection: _WAConnection,
MessageType,
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
const moment = require('moment-timezone')
const WAConnection = simple.WAConnection(_WAConnection)
baterai = 'unknown'
charging = 'unknown'

const hour_now = moment().format('HH:mm:ss')
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const date = new Date().toLocaleDateString()
const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
const wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
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
	console.log(color('[ Pesan ]', 'orange'), color('Gunakan Bot Dengan Bijak','magenta'))
	dha.browserDescription = ["DHA - BOT", "Edge", "3.0.0"];

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
	
//anti telpon	
antical = true
dha.on("CB:Call", json => {
if (antical === false) return
let call;
calling = JSON.parse(JSON.stringify(json))
call = calling[1].from
dha.sendMessage(call, `*Sorry ${dha.user.name} Saya Tidak Bisa menerima Panggillan.*\n*Telpon = Block!*\nHubungi Owner Untuk membuka Block\nWhatsApp Owner : wa.me/6282287486762`, MessageType.text)
.then(() => dha.blockUser(call, "add"))
})
    //antidelete
    antidel = true
dha.on('message-delete', async (m) => {
if (m.key.remoteJid == 'status@broadcast') return
if (!m.key.fromMe && m.key.fromMe) return
if (antidel === false) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
const type = Object.keys(m.message)[0]
dha.sendMessage(m.key.remoteJid, `━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━

*Nama  : @${m.participant.split("@")[0]}*
*Jam  : ${jam} ${week} ${calender}*
*Type  : ${type}*

━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━`, MessageType.text, {quoted: m.message, contextInfo: {"mentionedJid": [m.participant]}})
dha.copyNForward(m.key.remoteJid, m.message)
})	

	dha.on('chat-update', async (message) => {
		require('./dha.js')(dha, message)
	})
}

starts()