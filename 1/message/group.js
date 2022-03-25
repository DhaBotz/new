const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (dha, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)	    
	    if (!isWelcome) return
		try {
			const mdata = await dha.groupMetadata(anu.jid)
			console.log(anu)
			    
			if (anu.action == 'add') {
				    num = anu.participants[0]
				try {
					ppimg = await dha.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				} 
				let buff = await getBuffer(ppimg)
				buttons = [
                { buttonId: `!menu`, buttonText: { displayText: "MENU" }, type: 1 },]
                imageMsg = (
                await dha.prepareMessageMedia(buff, "imageMessage", {
                thumbnail: buff,
               })
            ).imageMessage;
          buttonsMessage = {
          contentText: `━━━ *「 WELCOME 」* ━━━
				
*❒ NOMOR :* @${num.split("@")[0]}
*❒ GRUB :* ${mdata.subject}

_Semoga Betah Kak_`,
          footerText: "©yudha Perdana",
          imageMessage: imageMsg,
          buttons: buttons,
          headerType: 4,
        }
        prep = await dha.prepareMessageFromContent(
          mdata.id,
          { buttonsMessage },
          {}
        )
        dha.relayWAMessage(prep)     				             
				} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await dha.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				let buff = await getBuffer(ppimg)
				buttons = [
                { buttonId: `!menu`, buttonText: { displayText: "Menu Bot" }, type: 1 },]
                imageMsg = (
                await dha.prepareMessageMedia(buff, "imageMessage", {
                thumbnail: buff,
               })
            ).imageMessage;
          buttonsMessage = {
          contentText: `━━━ *「SELAMAT JALAN」* ━━━

*❒ NOMOR :* @${num.split('@')[0]}
*❒ GRUB :*  ${mdata.subject}

_Sampai Ketemu Lagi Next Time_`,
          footerText: "©yudha Perdana",
          imageMessage: imageMsg,
          buttons: buttons,
          headerType: 4,
        }
        prep = await dha.prepareMessageFromContent(
          mdata.id,
          { buttonsMessage },
          {}
        )
        dha.relayWAMessage(prep)     		
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
