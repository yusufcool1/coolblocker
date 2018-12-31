const Discord = require('discord.js');
const fs = require('fs');
let kufurEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));

var ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);


	let args = message.content.split(' ').slice(1);
	const secenekler = args.slice(0).join(' ');

	var errembed = new Discord.RichEmbed()
	.setColor("RANDOM")
	.setDescription(`Yanlış Kullanım!`)
	.addField(`Doğru Kullanım:`, `${ayarlar.prefix}kufur-engelle aç veya kapat`)
	if(secenekler.length < 1) return message.channel.send(errembed);
	//if(secenekler === "aç" || "kapat") return message.channel.send(errembed);
  	if(secenekler.length < 1) return message.reply("Link Engelleme Açmak İçin `cb!kufur-engelle aç` kapatmak için `cb!kufur-engelle kapat`").then(m => m.delete(10000));

    message.delete();

			if (secenekler === "aç") {
		message.channel.send(`kufur Engelleme Sistemi: **açık**!`).then(m => m.delete(5000));
		kufurEngel[message.guild.id] = {
			kufurEngel: "acik"
		  };

		  fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (err) => {
			if (err) console.log(err)
		  });
	};

	if (secenekler === "kapat") {
		message.channel.send(`kufur Engelleme Sistemi: **kapalı**!`).then(m => m.delete(5000));
		kufurEngel[message.guild.id] = {
			kufurEngel: "kapali"
		  };

		fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (err) => {
			if (err) console.log(err)
		  });
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['küfürengel'],
		permLevel: 3
	  };

	  exports.help = {
		name: 'küfür-engelle',
		description: 'kufur engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'cb!küfür-engelle <aç> veya <kapat>'
	  };
