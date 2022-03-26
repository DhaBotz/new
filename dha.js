
const {
    WAConnection: _WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	ReconnectMode,
	ProxyAgent,
	ChatModification,
	GroupSettingChange,
	waChatKey,
	mentionedJid,
	processTime,
	Browsers
} = require("@adiwajshing/baileys")
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
const speed = require('performance-now')
const { spawn, exec, execSync } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const fetch = require('node-fetch');
const request = require('request');
const yts = require( 'yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const imgbb = require('imgbb-uploader')
const googleIt = require('google-it')
const googleImage = require('g-i-s')
const brainly = require('brainly-scraper')
const axios = require("axios")
const fs = require("fs-extra")
const { promisify, util } = require('util')
const os = require('os');

// stickwm
const Exif = require('./lib/exif');
const exif = new Exif();

var { yta } = require('./lib/ytdl')
const awln = fs.readFileSync ('./media/logo.jpg')
const {awalMenu} = require('./message/help.js')
const { getBuffer, getGroupAdmins, getRandom, runtime, pickRandom, clockString, sleep } = require('./lib/myfunc')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetch')
const { color, bgcolor } = require('./lib/color')
const { mess } = require('./message/mess')
const _sewa = require("./lib/sewa");
const game = require("./lib/game");
const { cmdadd } = require('./lib/totalcmd.js')
const { uptotele, uploadFile, RESTfulAPI, uploadImages } = require('./lib/uploadimage')
const { mediafireDl } = require('./lib/mediafire.js')
const { webp2gifFile, igDownloader, TiktokDownloader } = require("./lib/gif.js")
const { y2mateA, y2mateV } = require('./lib/y2mate')
const { isTicTacToe, getPosTic } = require('./lib/tictactoe')
const tictac = require('./lib/tictac')
const truth = JSON.parse(fs.readFileSync('./database/truth.json'))
const dare = JSON.parse(fs.readFileSync('./database/dare.json'))

const pantekk = '```'

hit_today = []
banChats = false

let fakeimage = fs.readFileSync("./media/logo.jpg")
let setting = JSON.parse(fs.readFileSync('./setting.json'))

// Game
let mtk = [];
let ckl = [];
let tictactoe = [];
let tebakgambar = [];

const { owner, gamewaktu, botName } = setting


// Database
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));

// Sticker Cmd
const addCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _scommand.push(obj)
    fs.writeFileSync('./database/scommand.json', JSON.stringify(_scommand))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _scommand[position].chats
    }
}


const checkSCommand = (id) => {
    let status = false
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            status = true
        }
    })
    return status
}


module.exports = dha = async (dha, mek) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		if (mek.key.id.startsWith('3EB0') && mek.key.id.length === 12) return
		m = simple.smsg(dha, mek)
		global.blocked
		global.prefix
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const waktu = moment.tz('Asia/Jakarta').format('a')
		const time = moment.tz('Asia/Jakarta').format('HH:mm:ss z')
		const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const type = Object.keys(mek.message)[0]      		
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const prefix = /^[°•π÷×¶∆£¢€¥®™=|#%^&./\\©^z+,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~#%^&.?/\\©^z+*,;]/gi) : '.'   
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(mek.message[type].fileSha256.toString('base64')) !== null && getCmd(mek.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message[type].fileSha256.toString('base64')) : ""
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		hit_today.push(command)
		const arg = body.substring(body.indexOf(' ') + 1)
		const ar = args.map((v) => v.toLowerCase())
		const argz = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix) 
		if (isCmd) cmdadd()
		const totalhit = JSON.parse(fs.readFileSync('./database/totalcmd.json'))[0].totalcmd
        const q = args.join(' ')

        const botNumber = dha.user.jid
        const ownerNumber = setting.ownerNumber
		const ownerName = setting.ownerName
		const isGroup = from.endsWith('@g.us')
		const sender = mek.key.fromMe ? dha.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
		const totalchat = await dha.chats.all()
		const groupMetadata = isGroup ? await dha.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const conts = mek.key.fromMe ? dha.user.jid : dha.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? dha.user.name : conts.notify || conts.vname || conts.name || '-'
        const mentionByTag = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByreply = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByreply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
        const isOwner = ownerNumber.includes(sender)
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const isWelkom = isGroup ? welkom.includes(from) : false
        const isSewa = _sewa.checkSewaGroup(from, sewa)
//BUTTON
// here button function
        selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
        responseButton = (type == 'listResponseMessage') ? mek.message.listResponseMessage.title : ''
        
        const listmsg = (from, title, desc, list) => { // ngeread nya pake rowsId, jadi command nya ga keliatan
            let po = dha.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "Pilih Disini","footerText": "©yudha perdana","listType": "SINGLE_SELECT","sections": list}}, {})
            return dha.relayWAMessage(po, {waitForAck: true})
}
  //button       
var sendButMessage = (id, text1, desc1, but = [], options = {}) => {
var buttonMessage = {
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 1
}
dha.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options)
}
var sendButton = async (from, context, fortext, but, todd) => {
buttonMessages = {
contentText: context,
footerText: fortext,
buttons: but,
headerType: 1
}
dha.sendMessage(from, buttonMessages, buttonsMessage, {
quoted: todd
})
}
var sendButImage = async (from, context, fotext, img, but) => {
gam = img
kirtoddd = await dha.prepareMessage(from, gam, MessageType.image)
buttonMessagesI = {
imageMessage: kirtoddd.message.imageMessage,
contentText: context,
footerText: fotext,
buttons: but,
headerType: 4
}
dha.sendMessage(from, buttonMessagesI, MessageType.buttonsMessage, {quoted: krtd1})}
var sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
kma = vid1
mhan = await dha.prepareMessage(from, kma, video)
var buttonMessages = {
videoMessage: mhan.message.videoMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 5
}
dha.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
///Button Location
var sendButloc = (from, title, text, desc, button, sen, men, file) => {
return dha.sendMessage(from, {"text": '',"contentText": title + text,"footerText": desc, "buttons": button, "headerType": "LOCATION", "locationMessage": { "degreesLongitude": "", "degreesLatitude": "", "jpegThumbnail": file}}, MessageType.buttonsMessage, { quoted: mek, contextInfo: {"mentionedJid": men ? men : []}})
}

//batas
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        if (m.isGroup && m.mtype == 'viewOnceMessage'){
	    if (m.fromMe) return
            message = {...mek}
            message.message = mek.message.viewOnceMessage.message
            message.message[Object.keys(message.message)[0]].viewOnce = false
            dha.reply(from, 'ViewOnce detected!', mek).then(() => dha.forwardMessage(from, message))
}
        function monospace(string) {
            return '```' + string + '```'
        }   
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        const reply = (teks) => {
	      dha.sendMessage(from, teks, text, {quoted:mek, thumbnail: fakeimage})
        }
        const sendMess = (hehe, teks) => {
           dha.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
           (id == null || id == undefined || id == false) ? dha.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('./media/logo.jpg')}, extendedText, { sendEphemeral: true, contextInfo: { "mentionedJid": memberr } }) : dha.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('./media/logo.jpg')}, extendedText, { sendEphemeral: true, quoted: mek, contextInfo: { "mentionedJid": memberr } })
        }
        const sendText = (from, text) => {
           dha.sendMessage(from, text, MessageType.text)
        }
        const sendSticker = (from, filename, mek) => {
	        dha.sendMessage(from, filename, MessageType.sticker, {quoted: mek})
            }
        const textImg = (teks) => {
           return dha.sendMessage(from, teks, text, {quoted: mek, thumbnail: fs.readFileSync('./media/logo.jpg')})
        }
        const print = function (teks) {
           if (typeof teks !== 'string') teks = require('util').inspect(teks)
           teks = require('util').format(teks)
           return textImg(teks)
        }
        const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: '6282288783972@s.whatsapp.net' } : {}) }, message: { "contactMessage": { "displayName": `${pushname}`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, "jpegThumbnail":fs.readFileSync('./media/logo.jpg')
        }}}
       const math = (teks) => {
           return Math.floor(teks)
       }
       const sendKontak = (from, nomor, nama, org = "") => {
	       const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nama + '\n' + 'ORG:' + org + '\n' + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
	       dha.sendMessage(from, {displayname: nama, vcard: vcard}, MessageType.contact, {quoted: mek})
}
      const hideTag = async function(from, text){
	       let anu = await dha.groupMetadata(from)
	       let members = anu.participants
	       let ane = []
	       for (let i of members){
	       ane.push(i.jid)
}

	       dha.sendMessage(from, {text:text, jpegThumbnail:fs.readFileSync('media/logo.jpg')}, 'extendedTextMessage', {contextInfo: {"mentionedJid": ane}})
}  
const sendStickerFromUrl = async(to, url) => {
        var names = Date.now() / 100000;
        var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
        };
        download(url, './sticker' + names + '.png', async function () {
        console.log('selesai');
        let filess = './sticker' + names + '.png'
        let asw = './sticker' + names + '.webp'
        exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
        let media = fs.readFileSync(asw)
        dha.sendMessage(to, media, MessageType.sticker,{quoted:mek})
        fs.unlinkSync(filess)
        fs.unlinkSync(asw)
         });
         });
         }
     
     const sendStickerUrl = async(to, url) => {
     console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Downloading sticker...'))
     var names = getRandom('.webp')
     var namea = getRandom('.png')
     var download = function (uri, filename, callback) {
	 request.head(uri, function (err, res, body) {
	 request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	 });
	 };
	download(url, namea, async function () {
	let filess = namea
    let asw = names
	require('./lib/exif.js')
	exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
    exec(`webpmux -set exif ./src/sticker/data.exif ${asw} -o ${asw}`, async (error) => {
	let media = fs.readFileSync(asw)
    dha.sendMessage(to, media, sticker,{quoted : mek})
	console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Succes send sticker...'))
	});
    });
    });
    }
      const sendWebp = async(to, url) => {
           var names = Date.now() / 10000;
           var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
           request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
           download(url, './sticker' + names + '.png', async function () {
           console.log('selesai');
           let filess = './sticker' + names + '.png'
           let asw = './sticker' + names + '.webp'
           exec(`ffmpeg -i ${filess} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=40, crop=512:512" ${asw}`, (err) => {
           fs.unlinkSync(filess)
           if (err) return reply(`${err}`)
           exec(`webpmux -set exif ./sticker/data.exif ${asw} -o ${asw}`, async (error) => {
           if (error) return reply(`${error}`)
           dha.sendMessage(from, fs.readFileSync(asw), sticker, {sendEphemeral:true, quoted:mek})
           fs.unlinkSync(asw)
});
});
});
}
       const sendMediaURL = async(to, url, text="", mids=[]) =>{
           if(mids.length > 0){
           text = normalizeMention(to, text, mids)
}
           const fn = Date.now() / 10000;
           const filename = fn.toString()
           let mime = ""
           var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
           mime = res.headers['content-type']
           request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};

           download(url, filename, async function () {
           console.log('done');
           let media = fs.readFileSync(filename)
           let type = mime.split("/")[0]+"Message"
           if(mime === "image/gif"){
           type = MessageType.video
           mime = Mimetype.gif
}
           if(mime.split("/")[0] === "audio"){
           mime = Mimetype.mp4Audio
}
           dha.sendMessage(to, media, type, {quoted: mek, mimetype: mime, caption: text, thumbnail: Buffer.alloc(0), contextInfo: {"mentionedJid": mids}})
                     
           fs.unlinkSync(filename)
});
}
      const sendFileFromUrl = async(link, type, options) => {
           hasil = await getBuffer(link)
	       dha.sendMessage(from, hasil, type, options).catch(e => {
	       fetch(link).then((hasil) => {
	       dha.sendMessage(from, hasil, type, options).catch(e => {
	       dha.sendMessage(from, { url : link }, type, options).catch(e => {
	       reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
	       console.log(e)
})
})
})
})
}
          
        function formatDate(n, locale = 'id') {
        let d = new Date(n)
        return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })
    }
//HARI & BULAN
var date = new Date();
        var tahun = date.getFullYear();
        var bulan1 = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
        var jam = date.getHours();
        var menit = date.getMinutes();
        var detik = date.getSeconds();
        var waktoo = date.getHours();
            switch(hari) {
                case 0: hari = "Minggu"; break;
                case 1: hari = "Senin"; break;
                case 2: hari = "Selasa"; break;
                case 3: hari = "Rabu"; break;
                case 4: hari = "Kamis"; break;
                case 5: hari = "Jum`at"; break;
                case 6: hari = "Sabtu"; break;
            }
            switch(bulan1) {
                case 0: bulan1 = "Januari"; break;
                case 1: bulan1 = "Februari"; break;
                case 2: bulan1 = "Maret"; break;
                case 3: bulan1 = "April"; break;
                case 4: bulan1 = "Mei"; break;
                case 5: bulan1 = "Juni"; break;
                case 6: bulan1 = "Juli"; break;
                case 7: bulan1 = "Agustus"; break;
                case 8: bulan1 = "September"; break;
                case 9: bulan1 = "Okttober"; break;
                case 10: bulan1 = "November"; break;
                case 11: bulan1 = "Desember"; break;
            }
            var tampilTanggal = "" + hari + ", " + tanggal + " " + bulan1 + " " + tahun;
            var tampilWaktu = "" + "Jam : " + jam + ":" + menit + ":" + detik + " Wib";
               /*****************END SCURITY FEATURE ********/
	        
	        //WAKTU
			var ase = new Date();
                        var waktoo = ase.getHours();
                        switch(waktoo){
                case 0: waktoo = "Tengah Malam🌚"; break;
                case 1: waktoo = "Tengah Malam🌚"; break;
                case 2: waktoo = "Dini Hari🌒"; break;
                case 3: waktoo = "Dini Hari🌓"; break;
                case 4: waktoo = "Subuh🌔"; break;
                case 5: waktoo = "Subuh🌔"; break;
                case 6: waktoo = "Selamat Pagi🌝"; break;
                case 7: waktoo = "Selamat Pagi🌝"; break;
                case 8: waktoo = "Selamat Pagi🌝"; break;
                case 9: waktoo = "Selamat Pagi🌝"; break;
                case 10: waktoo = "Selamat Pagi🌝"; break;
                case 11: waktoo = "Selamat Siang🌞"; break;
                case 12: waktoo = "Selamat Siang🌞"; break;
                case 13: waktoo = "Selamat Siang🌞"; break;
                case 14: waktoo = "Selamat Siang🌞"; break;
                case 15: waktoo = "Selamat Sore🌝"; break;
                case 16: waktoo = "Selamat Sore🌝"; break;
                case 17: waktoo = "Selamat Sore🌖"; break;
                case 18: waktoo = "Waktu Magrib🌘"; break;
                case 19: waktoo = "Waktu Magrib🌚"; break;
                case 20: waktoo = "Selamat Malam🌚"; break;
                case 21: waktoo = "Selamat Malam🌚"; break;
                case 22: waktoo = "Selamat Malam🌚"; break;
                case 23: waktoo = "Tengah Malam🌚"; break;
            }
            var tampilHari = "" + waktoo;
                        const jmn = moment.tz('Asia/Jakarta').format('HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
				const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				const week = d.toLocaleDateString(locale, { weekday: 'long' })
				const calender = d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
		       })

//=============FUNCTION================//
    function clockString(ms) {
      let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
      let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
      let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
      return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
    }
		
		//runtime bio
		 let settingstatus = 0;
    if (new Date() * 1 - settingstatus > 1000) {
      let _uptime = process.uptime() * 1000;
      let uptime = clockString(_uptime);

      await dha.setStatus(`Aktif Selama: ${uptime} | ${botName}`).catch((_) => _);
      settingstatus = new Date() * 1;            
          }                      
       
        colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

//antilink
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                dha.groupRemove(from, [sender])
            }
        }
         // Sewa
           _sewa.expiredCheck(dha, sewa)
        
         // TicTacToe
              if (isTicTacToe(from, tictactoe)) tictac(prefix, tictactoe, from, sender, dha, mek)
        
             // Game
              game.cekWaktuTG(dha, tebakgambar)
              game.cekWaktuMtk(dha, mtk)
              game.cekWaktuCkl(dha, ckl)
              
              if (game.isTebakGambar(from, tebakgambar)) {
              if (budy.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))){
                await reply(`*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebakgambar)}\n\nIngin bermain lagi? kirim *${prefix}tebakgambar*`)
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
            }
        }
             if (game.isMtk(from, mtk)){
             if (budy.toLowerCase().includes(game.getJawabanMtk(from, mtk))){
               await reply(`*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanMtk(from, mtk)}\n\nIngin bermain lagi? kirim *${prefix}math*`)
               mtk.splice(game.getMtkPosi(from, mtk), 1)
            }
        }
            if (game.isCkl(from, ckl)){
            if (budy.toLowerCase().includes(game.getJawabanCkl(from, ckl))){
              await reply(`*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, ckl)}\n\nIngin bermain lagi? kirim *${prefix}caklontong*`)
              ckl.splice(game.getCklPosi(from, ckl), 1)
           }
       }
              
              
         // CMD
        if (isCmd && !isGroup)
            console.log(color('[ CMD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) 
        if (isCmd && isGroup)
            console.log(color('[ CMD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            if (!isOwner && banChats === true) return
//Zona Nyaman           
//Zona Nyaman           
            switch(command){
case 'menu':         
thu = await dha.getStatus(`${sender.split('@')[0]}@s.whatsapp.net`, MessageType.text)
menu =`*${waktoo}*
 *${tampilTanggal}*
 *${tampilWaktu}*
 
*Nama User: @${sender.split('@')[0]}*
*Bio User: ${thu.status}*

Saya *${botName}* Siap Membantu
Pilih Perintah Yang Harus Bot Jalankan`
dha.sendMessage(from, { contentText: `${menu}`, 
footerText: `NOTE: Silahkan Ketik .allmenu Jika Tombol Dibawah Tidak Muncul!`,
buttons: [{ buttonId: `.allmenu`, buttonText: { displayText: 'LIST MENU' }, type: 1 },{ buttonId: `.credits`, buttonText: { displayText: 'CREDITZ' }, type: 1 } ],
headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: awln, contextInfo: {mentionedJid: [sender]}}}, 'buttonsMessage')
 break 
    
case 'allmenu':         
menu =`*TOOLS*
• ${prefix}attp
• ${prefix}trigger
• ${prefix}nulis
• ${prefix}sticker
• ${prefix}toimg
• ${prefix}tomp3
• ${prefix}tovideo
• ${prefix}telesticker

*DOWNLOADER*
• ${prefix}play
• ${prefix}instagram
• ${prefix}tiktok

*STICKER CMD*
• ${prefix}setcmd
• ${prefix}delcmd
• ${prefix}listcmd

*SEARCH*
• ${prefix}image
• ${prefix}google
• ${prefix}ytsearch
• ${prefix}pinterest

*IMAGE*
• ${prefix}waifu
• ${prefix}loli
• ${prefix}husbu
• ${prefix}milf
• ${prefix}cosplay
• ${prefix}wallml
• ${prefix}hentai

*GROUP*
• ${prefix}hidetag
• ${prefix}listsewa
• ${prefix}ceksewa
• ${prefix}welcome
• ${prefix}antilink
• ${prefix}sewa add/del

*GAME*
• ${prefix}tod
• ${prefix}math
• ${prefix}tictactoe
• ${prefix}caklontong
• ${prefix}tebakgambar`
dha.sendMessage(from, { contentText: `${menu}`, 
footerText: `NOTE: Sc Ini Free Dan Masih Dalam Tahap Pengembangan Kalian Semua Bisa Record Sendiri Atau Tunggu Updatean Dari Saya\nTerimakasih~`,
buttons: [{ buttonId: `.owner`, buttonText: { displayText: 'OWNER' }, type: 1 } ],
headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: awln, contextInfo: {mentionedJid: [sender]}}}, 'buttonsMessage')
 break            
           case 'owner': case 'creator':
               sendKontak(from, `${owner}`, `${ownerName}`, 'Sibukk!!')
               await sleep(1000)
               txtt =`Hai Kak  @${sender.split('@')[0]} Itu Ownerku, Jangan Spam ya...!!`
               buttons = [{buttonId: `${prefix}sc`,buttonText:{displayText: 'SC'},type:1},{buttonId:`${prefix}ig`,buttonText:{displayText:'IG'},type:1},{buttonId:`${prefix}yt`,buttonText:{displayText:'YT'},type:1}]
               buttonsMessage = { contentText: `${txtt}`, footerText: 'Jangan Sungkan Chat Ya Kak', buttons: buttons, headerType: 1 }
               prep = await dha.prepareMessageFromContent(from,{buttonsMessage},{})
               dha.relayWAMessage(prep)
               break      
 case 'sc':
              teks = ` Follow Gh Owner Untuk Sc tinggal Frok atau Download Di https://github.com/DhaBotz/`
              dha.sendMessage(from, teks, text, { quoted : mek })
              break              
 case 'yt':
              teks = `Jangan Lupa Subrek Yt Owner : https://youtu.be/vVHCBBs6lIs`
              dha.sendMessage(from, teks, text, { quoted : mek })
              break                   
 case 'ig':
              teks = `Jangan Lupa Follow Ig Owner https://instagram.com/yudha_perdana809/\nKalau Ada Keluhan Dm Aja`
              dha.sendMessage(from, teks, text, { quoted : mek })
              break                  
//   INI              
//      STICKER 
//               COMMAND

           case 'addcmd': case 'setcmd':
              if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
              var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              addCmd(kodenya, q)
              textImg("Done!")
              } else {
              reply('tag stickenya')
}
              break
       case 'delcmd':
              if (!isQuotedSticker) return reply(`Penggunaan : ${command} tagsticker`)
              var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
             _scommand.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./database/scommand.json', JSON.stringify(_scommand))
              textImg("Done!")
              break
       case 'listcmd':
              teksnyee = `\`\`\`「 LIST STICKER CMD 」\`\`\``
              cemde = [];
              for (let i of _scommand) {
              cemde.push(i.id)
              teksnyee += `\n\n➸ *ID :* ${i.id}\n➸ *Cmd* : ${i.chats}`
}
              mentions(teksnyee, cemde, true)
              break
// INI 
//    FEATUR
//            GAME

          case 'tebakgambar':
              if (game.isTebakGambar(from, tebakgambar)) return reply(`Masih ada soal yang belum di selesaikan`)
              anu = await axios.get(`http://api.lolhuman.xyz/api/tebak/gambar?apikey=${setting.lolkey}`)
              petunjuk = anu.data.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
              ini_buffer = await getBuffer(anu.data.result.image)
              dha.sendMessage(from, ini_buffer, image, { quoted: mek, caption: `Silahkan jawab soal berikut ini\n\nPetunjuk : ${petunjuk}\nWaktu : ${gamewaktu}s`})
              anih = anu.data.result.answer.toLowerCase()
              game.addgambar(from, anih, gamewaktu, tebakgambar)
              break
         case 'caklontong':
              if (!isGroup) return reply(mess.only.group)
              if (game.isCkl(from, ckl)) return reply(`Masih ada soal yang belum di selesaikan`)
              anu = await axios.get(`https://api.lolhuman.xyz/api/tebak/caklontong?apikey=${setting.lolkey}`)
              petunjuk = anu.data.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
              reply(`*JAWABLAH SOAL BERIKUT*\n\n*Soal :* ${anu.data.result.question}\n*Petunjuk :* ${petunjuk}\n\nWaktu : ${gamewaktu}s`)
              anih = anu.data.result.answer.toLowerCase()
              game.addckl(from, anih, gamewaktu, ckl)
              break
          case 'math':
              if (!isGroup) return reply(mess.only.group)
              if (game.isMtk(from, mtk)) return reply(`Masih ada soal yang belum di selesaikan`)
              if (!q) return reply(`*Mode tersedia :*\n1. very_easy\n2. easy\n3. medium\n4. hard\n5. extreme\n6. impossible\n\n_Example : ${prefix + command} hard_`)
              anu = await axios.get(`http://zekais-api.herokuapp.com/math?mode=${q}`)
              reply(`*JAWABLAH SOAL BERIKUT*\n\nBerapa Hasil Dari ${anu.data.nilai_1} ${anu.data.tanda} ${anu.data.nilai_2}? \nWaktu : ${gamewaktu}`)
              anih = anu.data.jawaban.toLowerCase()
              game.addmtk(from, anih, gamewaktu, mtk)
              break
        case 'tictactoe': case 'ttt': case 'ttc':
			  if (!isGroup) return reply(mess.only.group)
			  if (isTicTacToe(from, tictactoe)) return reply('Masih ada game yg blum selesai')
			  if (!q) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
			  if (mek.mentionedJid === undefined || mek.mentionedJid === null) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
			  if (mek.mentionedJid.length !== 0) {
			  if (mek.mentionedJid[0] === sender) return reply('Sad, main ama diri sendiri')
					txt = (monospace(`@${sender.split('@')[0]} menantang @${mek.mentionedJid[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/T) untuk bermain`))
					dha.reply(from, txt, mek, { contextInfo: { mentionedJid: dha.parseMention(txt) }})
					tictactoe.push({ id: from, status: null, penantang: sender, ditantang: mek.mentionedJid[0], TicTacToe: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'] })
				} else {
					reply(`Kirim perintah *${prefix}tictactoe* @tag`)
				}
			  break
		  case 'delttt': case 'delttc':
			  if (!isGroup) return reply(mess.only.group)
			  if (!isTicTacToe(from, tictactoe)) return reply('Tidak ada sesi game tictactoe di grup ini')
			  tictactoe.splice(getPosTic(from, tictactoe), 1)
			  reply('Berhasil menghapus sesi tictactoe di grup ini')
			  break
			  
          case 'tod':
              result =`*Truth Or Dare*\nPemain diberi pilihan antara menjawab pertanyaan dengan jujur, atau melakukan tantangan yang diberikan`
              buttons = [{buttonId: `${prefix}buttons6`,buttonText:{displayText: 'Truth'},type:1},{buttonId:`${prefix}buttons5`,buttonText:{displayText:'Dare'},type:1},{buttonId:`${prefix}tod`,buttonText:{displayText:'Tod'},type:1}]
              buttonsMessage = { contentText: `${result}`, footerText: 'Kebenaran atau tantangan?', buttons: buttons, headerType: 1 }
              prep = await dha.prepareMessageFromContent(from,{buttonsMessage},{})
              dha.relayWAMessage(prep)
              break          			  
// FEATUR
//         OWNER
			  
        case 'public':
        	  if (!isOwner) return 
              if (banChats === false) return 
              banChats = false
              textImg(`Success Activated Mode Public`)
              break
	      case 'self':
              if (!isOwner) return 
              if (banChats === true) return
        	  uptime = process.uptime()
        	  banChats = true
              textImg(`Success Activated Mode Self`)
              break
          case 'sewa':
              if (!isGroup)return reply(mess.only.group)
              if (!isOwner) return reply(mess.only.owner)
              if (args.length < 1) return reply(`Example: *${prefix}sewa* add/del waktu`)
              if (args[0].toLowerCase() === 'add'){
            _sewa.addSewaGroup(from, args[1], sewa)
              reply(`Berhasil Menyewa Bot Di Group Ini\nSilahkan ketik ${prefix}ceksewa`)
              } else if (args[0].toLowerCase() === 'del'){
              sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
              fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
              reply('Oke Selesai ~')
              } else {
              reply(`Example: *${prefix}sewa* add/del waktu`)
}
              break
// FEATUR 
//         GROUP             
       case 'sewalist': case 'listsewa':
              txtnyee = `List Sewa\nJumlah : ${sewa.length}\n\n`
              for (let i of sewa){
              cekvipp = ms(i.expired - Date.now())
              txtnyee += `*ID :* ${i.id} \n*Expire :* ${cekvipp.days} day(s) ${cekvipp.hours} hour(s) ${cekvipp.minutes} minute(s) ${cekvipp.seconds} second(s)\n\n`
}
              reply(txtnyee)
              break
       case 'sewacheck': case 'ceksewa': 
              if (!isGroup) return reply(mess.only.group)
              if (!isSewa) return reply(`Group ini tidak terdaftar dalam list sewabot.`)
              cekvip = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
              premiumnya = `*「 SEWA EXPIRE 」*\n\n➸ *ID*: ${from}\n➸ *Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
              reply(premiumnya)
              break
//  FITUR
//        Downloader
          case 'nhentaisearch': case 'nhsearch':
              if (!q) return reply(`Example: ${prefix}nhentaisearch Nakano`)
              rowsdata = [];
              res = await axios.get(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${setting.lolkey}&query=${q}`)
              for (let i = 0; i < res.data.result.length; i++) {
              rowsdata.push({ title: res.data.result[i].title_english, rowId: "", description: res.data.result[i].id })
}
              listM = dha.prepareMessageFromContent(from, { listMessage: { title: "NHENTAI BOT\n", description: "nHentai search", buttonText: "Click Here", listType: 1, sections: [{ rows: rowsdata }] }}, { quoted: mek })
              dha.relayWAMessage(listM, { waitForAck: true })
              break
          case 'igdl': 
       case 'instagram':
              if (!q) return reply('Link Yang Mana? ')
              if (!q.includes('instagram')) return reply(mess.error.Iv)
              reply(mess.wait)
              anu = await igDownloader(`${q}`)
             .then((data) => { sendMediaURL(from, data.result.link, data.result.desc, mek) })
             .catch((err) => { reply(String(err)) })
              break     
              
          case 'image':
       case 'gimage':
       case 'googleimage':
              if (args.length < 1) return reply('Apa Yang Mau Dicari?')
              reply(mess.wait)
              teks = args.join(' ')
              res = await googleImage(teks, google)
              function google(error, result){
              if (error){ return reply('_[ ! ] Error Terjari Kesalahan Atau Hasil Tidak Ditemukan_')}
              else {
              gugIm = result
              random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
              sendFileFromUrl(random, image, {quoted: mek, caption: `*Hasil Pencarian Dari :* ${teks}`})
}
}
             break

          case 'tiktokdl': case 'tiktok':
              if (!q) return reply('Linknya?')
              if (!q.includes('tiktok')) return reply(mess.error.Iv)
              data = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${setting.lolkey}&url=${q}`)
              result = `⚜️ *Nickname*: ${data.result.author.nickname}\n❤️ *Like*: ${data.result.statistic.diggCount}\n💬 *Komentar*: ${data.result.statistic.commentCount}\n🔁 *Share*: ${data.result.statistic.shareCount}\n🎞️ *Views*: ${data.result.statistic.playCount}\n📑 *Desc*: ${data.result.title}`
              buttons = [{buttonId: `${prefix}tiktoknowm ${q}`,buttonText:{displayText: `▶️ Video`},type:1},{buttonId:`${prefix}ttaudio ${q}`,buttonText:{displayText:'🎵 Audio'},type:1}]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(data.result.thumbnail))
              imageMsg = ( await dha.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Pilih satu format di bawah ini', imageMessage: imageMsg,
              contentText:`${result}`,buttons,headerType:4}
              prep = await dha.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              dha.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break          
case 'ttnowm': 
      case 'tiktoknowm':
             if (!q) return reply('Linknya?')
             if (!q.includes('tiktok')) return reply(mess.error.Iv)
             reply(mess.wait)
             anu = await TiktokDownloader(`${q}`)
            .then((data) => { sendMediaURL(from, data.result.nowatermark) })
            .catch((err) => { reply(String(err)) })
             break
      case 'ttaudio': 
      case 'tiktokmusic': 
      case 'tiktokaudio':
             if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
             ini_link = args[0]
             get_audio = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${setting.lolkey}&url=${ini_link}`)
             dha.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek })
             break              

          case 'waifu': case 'loli': case 'husbu': case 'milf': case 'cosplay': case 'wallml':
              let wipu = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/${command}.json`)).data
              let wipi = wipu[Math.floor(Math.random() * (wipu.length))]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(wipi))
		      buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `➡️Next`},type:1},{buttonId:`${prefix}owner`,buttonText:{displayText:'OWNER'},type:1}]
              imageMsg = ( await dha.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Jangan Lupa Donasi Ya Kak ☕', imageMessage: imageMsg,
              contentText:`klik Next untuk ke gambar selanjut nya`,buttons,headerType:4}
              prep = await dha.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              dha.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break
          case 'hentai':
              getBuffer(`https://api.lolhuman.xyz/api/random/nsfw/hentai?apikey=${setting.lolkey}`).then((gambar) => {
              dha.sendMessage(from, gambar, image, { quoted: mek, thumbnail: Buffer.alloc(0) })
})
              break
case 'play':
if (args.length < 1) return reply(`Kirim perintah *${prefix}play query*`)
reply(mess.wait)
var yut = await yts(q)
yta(yut.videos[0].url)         
.then(async(res) => {
var { thumb, title, filesizeF, filesize } = res
var capti = `🜲 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗣𝗟𝗔𝗬 🜲

𖥸 Judul : ${yut.all[0].title}
𖥸 ID Video : ${yut.all[0].videoId}
𖥸️ Diupload Pada : ${yut.all[0].ago}
𖥸️️ Views : ${yut.all[0].views}
𖥸️ Durasi : ${yut.all[0].timestamp}
𖥸 Channel : ${yut.all[0].author.name}
𖥸 Link Channel : ${yut.all[0].author.url}
𖥸 Link Video : ${yut.videos[0].url}`
ya = await getBuffer(thumb)
py =await dha.prepareMessage(from, ya, image)
sendButloc(from,monospace(capti),'',`DhaBotz`,
[
{buttonId: `${prefix}ytmp3 ${yut.all[0].url}`, buttonText: {displayText: 'AUDIO'}, type: 1}
,
{buttonId: `${prefix}ytmp4 ${yut.all[0].url}`, buttonText: {displayText: 'VIDEO'}, type: 1}
],null,null,ya)
})
break
case 'ytmp4':
if (args.length < 1) return reply('Link?')     
reply(mess.wait)
KirTid = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${setting.lolkey}&url=${q}`)
kirmp4 = await getBuffer(KirTid.result.link)
await dha.sendMessage(from, kirmp4, video, { mimetype: 'video/mp4', quoted: mek })
break
case 'ytmp3':
						if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
						let isLinks = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
						if (!isLinks) return reply(mess.error.Iv)
						try {
							reply(mess.wait)
							yta(args[0])
							.then((res) => {
								const { dl_link, thumb, title, filesizeF, filesize } = res
								axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
								.then((a) => {
								if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `❏ *YTmp3*\n\n❏ *Title* : ${title}\n❏ *Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Maaf durasi melebihi batas maksimal, Silahkan klik link diatas_`)
								const captions = `❏ *YTmp3*\n\n❏ *Title* : ${title}\n❏ *Ext* : MP3\n❏ *Size* : ${filesizeF}\n\n_Audio sedang dikirim, Silahkan tunggu beberapa menit_`
								sendMediaURL(from, thumb, captions)
								sendMediaURL(from, dl_link).catch(() => reply(mess.error.api))
							})

							})
						} catch (err) {
							reply(mess.error.api)
						}
						break
          case 'pinterest': case 'pin':
              if (args.length < 1) return reply(`${prefix}pinterest Nakano dha`)
              data = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${setting.lolkey}&query=${q}`)
              buttons = [{buttonId: `${prefix + command} ${q}`,buttonText:{displayText: `➡️Next`},type:1}]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(data.result))
              imageMsg = ( await dha.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Jangan Lupa Donasi Ya Kak ☕', imageMessage: imageMsg,
              contentText:`*Hasil Pencarian Dari : ${q}*`,buttons,headerType:4}
              prep = await dha.prepareMessageFromContent(from,{buttonsMessage},{})
              dha.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break 
          case 'yts': case 'ytsearch': 
			  if (!q) return reply(`Penggunaan ${command} query`)
              let { videos } = await yts(q)
			  let length = videos.length < 10 ? videos.length : 10
			  let capt = ``
			  for (let i = 0; i < length; i++) {
					capt += `*${videos[i].title}* (${videos[i].url})\n`
					capt += `*By:* ${videos[i].author.name}\n`
					capt += `*Duration:* ${videos[i].timestamp}\n`
					capt += `*Uploaded:* ${videos[i].ago}\n`
					capt += `=`.repeat(24) + `\n`
				}
			  dha.sendMessage(from, capt.trim(), text, { contextInfo: { externalAdReply: { title: videos[0].title, body: videos[0].description, mediaType: 2, thumbnailUrl: videos[0].image, mediaUrl: videos[0].url }}})
			  break
          case 'tourl':
              if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedVideo ) && args.length == 0) {
              reply(mess.wait)
              boij = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              owgi = await dha.downloadMediaMessage(boij)
              res = await uploadImages(owgi)
              reply(res)
              } else {
              reply('kirim/reply gambar/video')
}
              break
          case 'telesticker': case 'telestiker':
              if (!q) return reply(`Example: ${prefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
              reply(mess.wait)
              ini_url = await fetchJson(`https://api.lolhuman.xyz/api/telestick?apikey=${setting.lolkey}&url=${args[0]}`)
              ini_sticker = ini_url.result.sticker
              reply('Sending '+ ini_sticker.length +' stickers...')
              for (sticker_ in ini_sticker) {
              ini_buffer = await getBuffer(ini_sticker[sticker_])
              dha.sendMessage(from, ini_buffer, sticker, {})
}
              break
          case 'attp':
              if (args.length == 0) return reply(`Example: ${prefix + command} dha`)
              buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
              dha.sendMessage(from, buffer, sticker, { quoted: mek })
              break
case 'trigger':

if (mek.message.extendedTextMessage != undefined || mek.message.extendedTextMessage != null) {
ger = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
reply(mess.wait)
owgi = await dha.downloadMediaMessage(ger)
await fs.writeFileSync(`./stickmeme.jpeg`, owgi)
var imgbb = require('imgbb-uploader')
anu = await imgbb("c32a869bd029bad265a7998ce44e99e6", './stickmeme.jpeg')
teks = `${anu.display_url}`
sendStickerFromUrl(from, `https://hardianto.xyz/api/editor/triggered?url=${teks}&apikey=hardianto`, mek)
fs.unlinkSync('./stickmeme.jpeg')
}
break              
  case 'patrick':
              reply(mess.wait)
              fetch('https://raw.githubusercontent.com/rashidsiregar28/data/main/patrik')
             .then(res => res.text())
             .then(body => {
              let tod = body.split("\n");
              let pjr = tod[Math.floor(Math.random() * tod.length)];
              sendWebp(from, pjr)
}
)
              break              
          case 's': case 'sticker': case 'stiker':
              if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              media = await dha.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.webp')
              await ffmpeg(`./${media}`)
             .input(media)
             .on('start', function (cmd) {
              console.log(`Started : ${cmd}`)
})
             .on('error', function (err) {
              console.log(`Error : ${err}`)
              fs.unlinkSync(media)
              reply('Eror!')
})
             .on('end', function () {
              console.log('Finish')
              dha.sendMessage(from, fs.readFileSync(ran), sticker, { quoted : mek}) 
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
})
             .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
             .toFormat('webp')
             .save(ran)
          } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
              encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              media = await dha.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.webp')
              await ffmpeg(`./${media}`)
             .inputFormat(media.split('.')[1])
             .on('start', function (cmd) {
              console.log(`Started : ${cmd}`)
})
             .on('error', function (err) {
              console.log(`Error : ${err}`)
              fs.unlinkSync(media)
              tipe = media.endsWith('.mp4') ? 'video' : 'gif'
              reply(`Error`)
})
             .on('end', function () {
              console.log('Finish')
              dha.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek })
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
})
             .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
             .toFormat('webp')
             .save(ran)
      } else {
              reply('Reply Gambar/video minimal 6 detik')
}
              break
          case 'tovideo':
              if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
              encmediaaa = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              mediaaa = await dha.downloadAndSaveMediaMessage(encmediaaa)
              a = await webp2gifFile(mediaaa)
              mp4 = await getBuffer(a.result)
              dha.sendMessage(from, mp4, video, {mimetype: 'video/mp4', quoted: mek, caption: mess.success})
              fs.unlinkSync(mediaaa)
          } else {
              reply(mess.wrongFormat)
}
              break
          case 'tomp3':
              if (isQuotedVideo || isQuotedAudio){
              reply(mess.wait)
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await dha.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.mp3')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(`Err: ${err}`)
              buffer453 = fs.readFileSync(ran)
              dha.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
              fs.unlinkSync(ran)
})
          } else {
              reply(mess.wrongFormat)
}
              break
          case 'toimg':
              if (!isQuotedSticker) return reply('reply stickernya')
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await dha.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply('Gagal, pada saat mengkonversi sticker ke gambar')
              buffer = fs.readFileSync(ran)
              dha.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nih'})
              fs.unlinkSync(ran)
})
              break
          case 'nulis': case 'tulis':
              if (args.length < 1) return reply('Yang mau di tulis apaan?')
              teks = args.join(' ')
              reply(mess.wait)
              nulis = encodeURIComponent(teks)
              res = await axios.get(`https://dt-04.herokuapp.com/nulis?text=${nulis}`)
              if (res.data.error) return reply(res.data.error)
              buff = Buffer.from(res.data.result.split(',')[1], 'base64')
              dha.sendMessage(from, buff, image, {quoted: mek, caption: mess.success}).catch(e => {
              return reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim File_')
})
              break
//------------------< Ingfo Bot >-------------------
          case 'runtime':
              textImg(`${runtime(process.uptime())}`)
              break
          case 'donate': case 'donasi':
              textImg(setting.txtDonasi)
              break
          case 'ping': case 'speed':
              timestampe = speed();
              latensie = speed() - timestampe
              reply(`「 *𝙎𝙋𝙀𝙀𝘿 𝙏𝙀𝙎𝙏* 」\nMerespon dalam ${latensie.toFixed(4)} Sec 💬`)
              break
          case 'join':
              if (!isOwner) return reply(mess.only.owner)
              if (args.length < 1) return reply(`Kirim perintah *${prefix}join* link grup`)
              if (!isUrl(args[0]) && !args[0].includes('chat.whatsapp.com')) return reply(mess.error.Iv)
              code = args[0].replace('https://chat.whatsapp.com/', '')
              dha.acceptInvite(code)
             .then((res) => {
              dha.sendMessage(res.gid,`*Halo saya Bot 👋*\nSaya di invit oleh ${pushname} Ketik ${prefix}menu untuk melihat menu`,text,{contextInfo:{mentionedJid:[sender]} })
              reply('Berhasil Masuk Grup')
          })
             .catch((err) => reply(jsonformat(err)))
              break
          case 'term':
              if (!isOwner) return
              if (!q) return
              exec(q, (err, stdout) => {
              if (err) return reply(`${err}`)
              if (stdout) {
              reply(stdout)
}
})
              break 
          case 'shutdown':
              if (!isOwner) return 
              reply(`Bye...`)
              await sleep(3000)
              process.exit()
              break
          case 'bc': case 'broadcast':
              if (!isOwner) return  reply(mess.only.owner)
              if (args.length < 1) return reply('teksnya?')
              anu = await dha.chats.all()
              if (isMedia && !mek.message.videoMessage || isQuotedImage) {
              encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              bc = await dha.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              dha.sendMessage(_.jid, bc, image, {quoted:freply,caption: `*「 dha Broadcast 」*\n\n${body.slice(4)}`})
}
              reply('Sukses')
              } else {
              for (let _ of anu) {
              sendMess(_.jid, `*「 dha Broadcast 」*\n\n${body.slice(4)}`)
}
              reply('Sukses')
}
              break
          case 'setprefix':
              if (!isOwner) return
              teks = args.join('') 
              prefix = teks
              reply(`_Change Prefix Success!! Prefix_ : *${prefix}*`)
              break
          case 'hidetag':
              try {
              quotedText = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
              hideTag(from, `${quotedText}`)
          } catch {
              hideTag(from, `${q}`)
} 
              break
          case 'wangy':
              if (!q) return
              qq = q.toUpperCase()
              awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`
              reply(awikwok)
              break
//------------------< Lainnya >-------------------
          case 'getpp':
              if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) {
              linkpp = await dha.getProfilePicture(from) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              dha.sendMessage(from, buffer, image, {caption: "Nih", quoted: mek })
              } else if (mek.message.extendedTextMessage.contextInfo.mentionedJid === null || mek.message.extendedTextMessage.contextInfo.mentionedJid === undefined) {
              mberr = mek.message.extendedTextMessage.contextInfo.participant
              linkpp = await dha.getProfilePicture(mberr) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              dha.sendMessage(from, buffer, image, { quoted: mek, caption: `Profile Picture of @${mberr.split("@")[0]}`, contextInfo: { "mentionedJid": [mberr] }})
              } else if (mek.message.extendedTextMessage.contextInfo.mentionedJid.length > 0) {
              mberr = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
              linkpp = await dha.getProfilePicture(mberr) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              dha.sendMessage(from, buffer, image, { quoted: mek, caption: `Profile Picture of @${mberr.split("@")[0]}`, contextInfo: { "mentionedJid": [mberr] }})
}
              break
          case 'searchmsg':  //by ANU TEAM
              if (args.length < 1) return reply(`Pesan Yang Mau Dicari Apaan?\nContoh : ${prefix + command} halo|10`)
              teks = arg
              if (teks.includes("|")) { 
              try {
              var ve = teks.split("|")[0]
              var za = teks.split("|")[1]
              sampai = `${za}`
              if (isNaN(sampai)) return reply('Harus berupa Angka!')
              batas = parseInt(sampai) + 1
              if (batas > 30) return reply('Maks 30!')
              reply(mess.wait)
              cok = await dha.searchMessages(`${ve}`, from, batas,1) 
              if (cok.messages.length < 2) return reply('Tidak Ditemukan Pesan') 
              if (cok.messages.length < parseInt(batas)) reply(`Hanya Ditemukan ${cok.messages.length - 1} Pesan`)
              for (i=1;i < cok.messages.length;i++) {
              if (cok.messages[i].message) {
              dha.sendMessage(from, `Ditemukan!`, text, {sendEphemeral: true, quoted: cok.messages[i]}) 
}
}
              } catch (e) {
              return reply(String(e))
}
              } else {
              reply(`Format salah tod, ini contoh format yang benar : ${prefix + command} halo|10`)
}
              break
          case 'lolkey': case 'cekapikey':
              if (args.length < 1) return reply(`Ketik ${prefix}lolkey [Apikeynya]`) 
              data = await fetchJson(`https://api.lolhuman.xyz/api/checkapikey?apikey=${q}`)
              teks = `*YOUR APIKEY*\n\n➸ Ussername= ${data.result.username}\n➸ Request= ${data.result.requests}\n➸ Today= ${data.result.today}\n➸ Akun Type= ${data.result.account_type}\n➸ Expired= ${data.result.expired}\n➸ API = https://api.lolhuman.xyz`
              dha.sendMessage(from, teks, text, {quoted: mek})
              break
          case 'welcome':
              if (!isGroup) return reply(mess.only.group)
              if (args.length < 1) return reply(`${prefix}welcome enable`)
              if ((args[0]) === 'enable') {
              if (isWelkom) return reply('Udah aktif')
              welkom.push(from)
              fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
              reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
              } else if ((args[0]) === 'disable') {
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
              reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
              } else {
              reply('Enable untuk mengaktifkan, disable untuk menonaktifkan')
}
              break
case 'antilink':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(ind.admin())
              if (!isBotGroupAdmins) return reply(`*_Bot Harus jadi Admin_*`)
              if (!q) return reply(`Pilih enable atau disable`)
              if (args[0].toLowerCase() === 'enable'){
              if (isAntiLink) return reply(`Udah aktif`)
              antilink.push(from)
              fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
              reply('*「 ANTILINK DI AKTIFKAN 」*\n\nYang Ngirim Link Group Bakal Ke Kick!')
              } else if (args[0].toLowerCase() === 'disable'){
              let anu = antilink.indexOf(from)
              antilink.splice(anu, 1)
              fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
              reply('*「 ANTILINK DI NONAKTIFKAN 」*')
              } else {
              reply(`*_Pilih enable atau disable_*`)
}
              break                      
     
          case 'q':
              if (!m.quoted) return reply( 'reply pesan!')
              let qu = dha.serializeM(await m.getQuotedObj())
              if (!qu.quoted) return reply( 'pesan yang anda reply tidak mengandung reply!')
              await qu.quoted.copyNForward(m.chat, true)
              break
          case 'get': case 'fetch': 
              if (!/^https?:\/\//.test(q)) return reply('Awali *URL* dengan http:// atau https://')
              res = await fetch(q)
              if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
              delete res
              throw `Content-Length: ${res.headers.get('content-length')}`
}
              if (!/text|json/.test(res.headers.get('content-type'))) return sendMediaURL(from, q)
              txtx = await res.buffer()
              try {
              txtx = util.format(JSON.parse(txtx+''))
              } catch (e) {
              txtx = txtx + ''
              } finally {
              reply(txtx.slice(0, 65536) + '')
}
              break
     case 'credits':
	        const daff = "6281905473135@s.whatsapp.net"
			const ikyygan = "6285215319934@s.whatsapp.net"
			const dhabot = "6282287486762@s.whatsapp.net"
			const kyyset = "6285892935752@s.whatsapp.net"
			const bar = "6285771126159@s.whatsapp.net"
			const den = "6285727091924@s.whatsapp.net"
			const sen = "62895349917040@s.whatsapp.net"
			const kel = "6282248192917@s.whatsapp.net"
			const vin = "6283177345510@s.whatsapp.net"
			const kir = "6287705048235@s.whatsapp.net"
			const uy = setting.ownerName
			const cuy = setting.ownerNumber
			
menu = `*_Creator Dan Penyusun_*
*•Yudha Perdana @${dhabot.split("@")[0]}*

*_Record And Developer_*
*•${uy} ${cuy.split("@")[0]}*

*_Fitur Data Bot_*
*•IkyAds @${ikyygan.split("@")[0]}*
*•Yudha @${dhabot.split("@")[0]}*
*•Rizky @${kyyset.split("@")[0]}*
*•Akira @${kir.split("@")[0]}*
*•Denis @${den.split("@")[0]}*
*•Senku @${sen.split("@")[0]}*

*_Patner Saya_*
*•Daffa @${daff.split("@")[0]}*
*•Akbar @${bar.split("@")[0]}*
*•Kael @${kel.split("@")[0]}*
*•Kevin @${vin.split("@")[0]}*

*_Rest Apikey_*
•LolHuman https://lolhuman.xyz`
dha.sendMessage(from, { contentText: `${menu}`, 
footerText: `NOTE: Silahkan Ketik .allmenu Jika Tombol Dibawah Tidak Muncul!`,
buttons: [{ buttonId: `.simpelmenu`, buttonText: { displayText: 'LIST MENU' }, type: 1 }],
headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: awln, contextInfo: {mentionedJid: [daff, ikyygan, dhabot, kyyset, bar, kir, den, sen, kel, vin, cuy]}}}, 'buttonsMessage')
 break               
default:
if (budy.startsWith('=>')){
if (!isOwner) return
try {
return dha.sendMessage(from, 
`${pantekk}📥 Input: ${budy.slice(3)}
📤 OutPut: 
${JSON.stringify(eval(budy.slice(2)),null,'\t')}
${pantekk}`
,text, {quoted:mek })
} catch(err) {
e = String(err)
reply(`${pantekk} "err" :  "${e}"${pantekk}`)
}
}
if (!isOwner) return
if (budy.startsWith('> ')) {
try {
console.log(color('[ EVAL ]', 'pink'), color(time), budy, color('dari', 'yellow'), pushname, color('di'), isGroup ? groupName : 'Private Chat')
reply(require('util').format(eval(`;(async () => { ${budy.slice(2)} })()`)))
} catch(e) {
console.log(e)
err = String(e)
js = JSON.stringify(e, null, 2)
if (js == '{}') js = { err }
js = JSON.stringify(js, null, 2)
js = '```' + js + '```'
reply('_' + err + '_\n\n' + js)
}
}
if (isCmd){
teks = `Maaf @${sender.split('@')[0]}, command ${prefix + command} tidak ada dalam menu 🙄`
dha.sendMessage(from, {text:teks, jpegThumbnail:fs.readFileSync('./YUD2/logo.jpg')}, 'extendedTextMessage', {sendEphemeral:true, quoted:mek, contextInfo:{ forwardingScore:508, isForwarded:true, mentionedJid:[sender]}})
}
if (isGroup && budy != undefined) {
} else {
console.log('[',color('TEXT','teal'),']',`Message : ${budy} From`, color(pushname))
}		
}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero")) {
	console.log('Message : %s', color(e, 'green'))
        }
	}
}



