const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
let küfürEngel = JSON.parse(fs.readFileSync("./jsonlar/küfürEngelle.json", "utf8"));
const moment = require('moment');
require('./util/eventLoader')(client);

var antispam = require("anti-spam");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on("ready", () => {
  client.user.setGame(prefix + "" )
  console.log("Bağlandım!")
});

client.on("message", msg => {
  if (!msg.guild) return;
  if (!küfürEngel[msg.guild.id]) return;
  if (küfürEngel[msg.guild.id].küfürEngel === 'kapali') return;
    if (küfürEngel[msg.guild.id].küfürEngel=== 'acik') {
      const küfür = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
  if (küfür.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.reply("Bu sunucuda küfürler **Cool Blocker** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!").then(message => message.delete(3000));
    }
}
    }
});

client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("Gnarge", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});

antispam(client, {
  warnBuffer: 3,
  interval: 1000,
  warningMessage: "Yavaşşş Biraz.",
  roleMessage: "Mutee Atıldı.",
  roleName: "muted",
  maxDuplicatesWarning: 7,
  maxDuplicatesBan: 10,
  time: 10,
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'sahip') {
    msg.channel.sendMessage('sahibim Yusuf Babadır :D');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'samet kimdir') {
    msg.channel.sendMessage('samet adamın dipçiğidir ewqewqe');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yardımsunucusu') {
    msg.channel.sendMessage('Yardım sunucum = https://discord.gg/fd2JJet ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'talha kimdir') {
    msg.channel.sendMessage('talha mahir abime göre şerefsiz bir bıllik bana göre ise sıradan bazen şerefsizleşen ve beni üzen kişi :D ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yusuf kimdir') {
    msg.channel.sendMessage('Yusuf benim yapımcım yani üstadımdır.Benim için çok uğraşıyor ama hep hata verip onu delirtiyorum :grin:');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'mahir kimdir') {
    msg.channel.sendMessage('Mahir benim abim olur.İyi birisidir Adamın Dipçiğidir :smile:');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yağmur kimdir') {
    msg.channel.sendMessage('Yağmur üstadımın Ölesiye sevdiği kızdır.Kendisi çok iyi biridir. Benim yengem olur :grin: .Üstadımın bana dediğine göre çok güzelmiş. ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yapımcı') {
    msg.channel.sendMessage('Yapımcım ƬƑ™Yusuf [🌹]#0025 dur Beni Çağırmak İsterseniz Ona Danışın :)');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yağmur güzelmi') {
    msg.channel.sendMessage('Evet çok güzel kızdır kendisi Yengem çok iyi çok zeki ve Çok güzeldir.Üstadımı güzelliğiyle etkiledi :smile: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yunus kimdir') {
    msg.channel.sendMessage('Yunus un ben ta amına koyim çok piçdir ewqeq ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'arda kimdir') {
    msg.channel.sendMessage('Arda Şerefsizin önde gideni bir piçdir. Çok festtır.Ha bide Çok ama Çok romantikdir bi sevgilisinden ayrılsın varya ooooooooooo 3 yıl ağlar ewqewqeq :grin: :smile: ');
}
});



client.login(ayarlar.token);
