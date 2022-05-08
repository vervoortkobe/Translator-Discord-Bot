const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  
    let loading = client.emojis.resolve("615988699796340768");

    let textmessage = args.join(" ");
    if(textmessage.length >= 950) return message.channel.send(`❌ | The text you want to translate is too long! It should contain maximum 950 characters!`);
    let inputText = encodeURIComponent(textmessage);
    let {data} = await fetch;

    if(!inputText) {
      const translateUsageEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`🌍 | ${client.user.username} Translate`)
      .setDescription(`Usage: **${prefix}translate <text>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      return message.channel.send(translateUsageEmbed);
    }
      
    message.channel.send(`${loading} | Translating to English...`)
    .then(m => m.delete({ timeout: 7500 }));
  
    fetch(`https://freetranslate.glitch.me/?q=${inputText}`)
    .then(res => res.json()).then(data => {
      if(!data.text) return message.channel.send(`❌ | There went something wrong! Pls try again!`);
    
      const translateEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`🌍 | ${client.user.username} Translate`)
      .addField(`Input Text`, `\`${args.join(" ")}\``)
      .addField(`Translation to English`, `\`${data.text}\``)
      .addField(`Translation Language`, `\`${data.from.language.iso} ➡️ en\``)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(translateEmbed)
      .then(message.react("🌍"));
    });
  }

  module.exports.help = {
    name: "translate"
}