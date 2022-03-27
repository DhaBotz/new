
let { WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

listjadibot = [];

const jadibot = async(reply,dha,id) => {
	dha = new WAConnection()
    dha.logger.level = 'warn'
    dha.version = [2,2143,3]
    dha.browserDescription = [ 'jadibot', '', '3.0' ]
    dha.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
       	bot = await dha.sendMessage(id,buffer,MessageType.image,{caption:'Scan QR Untuk menjadi bot\n*Rules:*\nQR akan diganti setiap 30 detik'})
    	setTimeout(() => {
       	dha.deleteMessage(id, bot.key)
       },30000)
    })
    dha.on('connecting', () => {
    })
    dha.on('open', () => {
    	reply(`Sukses Jadi BOT\n\n*Device*:\n\n ${JSON.stringify(dha.user,null,2)}`)
    })
    await dha.connect({timeoutMs: 30 * 1000})
    listjadibot.push(dha.user)
    dha.on('chat-update', async (message) => {
        require('../dha.js')(dha, message)
    })
}

const stopjadibot = (reply) => {
	dha = new WAConnection();
	dha.close()
	reply('Sukses stop jadibot')
}

module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}