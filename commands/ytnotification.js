const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;
const fetch = require("node-fetch");

module.exports.run = async (client, message, args, notifier) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`:x: **|** ***I couldn't set the YT notification channel for this server, because you do not have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0] || !args[1]) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setTitle(`⚙️ | YT Notification Channel`)
        .setDescription(`:x: **|** ***Usage: ${prefix}ytnotification set <YT channel URL/YT channel ID> (<#channel/channel ID>)***`)
        .addField(`▶ | Where can I find the YT channel ID?`, `\`https://www.youtube.com/channel/<YT channel ID>\``)
        return message.channel.send(usageEmbed);
      }
  
      if(args[0] === `set`) {
        if(args[2]) {

          var ytchanid;
          if(args[1].includes("https://") || args[1].includes("www.") || args[1].includes("youtu.be") || args[1].includes("youtube.com") || args[1].includes("/channel/").args[1].includes("/c/")) {
            ytchanid = args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "").replace("/c/", "");
          } else {
            ytchanid = args[1];
          }

          var channameid;
          if(args[2].includes("<") || args[2].includes("@") || args[2].includes("#") ||args[2].includes("&") || args[2].includes(">")) {
            channameid = args[2];
          } else {
            channameid = `<#${args[2]}>`;
          }
    
          let ytchannels = JSON.parse(fs.readFileSync("./ytchannels.json", "utf-8"));
    
          ytchannels[args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "").replace("/c/", "")] = {
            ytchannels: args[2].replace("<", "").replace("@", "").replace("&", "").replace("#", "").replace(">", "")
          };
    
          fs.writeFile("./ytchannels.json", JSON.stringify(ytchannels), (err) => {
            if(err) console.log(err);
          });
    
          const ytnotiEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setTitle(`⚙️ | YT Notification Channel`)
          .setDescription(`:check: **|** ***The YT notification channel for this server has been set to: ${channameid}, for the YT channel with ID:*** \`${ytchanid}\``)
          message.channel.send(ytnotiEmbed);
    
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(!logChannel) return;
    
          const ytnotiLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setTitle(`⚙️ | Logs`)
          .setThumbnail(client.user.displayAvatarURL())
          .addField(`CONFIG_YT_NOTIFICATION_CHANNEL`, `The **YT notification channel** for this server has been set to: **${channameid}**, for the **YT channel with ID**: \`${ytchanid}\`!`)
          logChannel.send(ytnotiLogEmbed);

          notifier.subscribe(args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "").replace("/c/", ""));

        } else {
          
          var ytchanid;
          if(args[1].includes("https://") || args[1].includes("www.") || args[1].includes("youtu.be") || args[1].includes("youtube.com") || args[1].includes("/channel/") || args[1].includes("/c/")) {
            ytchanid = args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "").replace("/c/", "");
          } else {
            ytchanid = args[1];
          }
    
          let ytchannels = JSON.parse(fs.readFileSync("./ytchannels.json", "utf-8"));
    
          ytchannels[args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "").replace("/c/", "")] = {
            ytchannels: message.channel.id
          };
    
          fs.writeFile("./ytchannels.json", JSON.stringify(ytchannels), (err) => {
            if(err) console.log(err);
          });
    
          const ytnotiEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setTitle(`⚙️ | YT Notification Channel`)
          .setDescription(`:check: **|** ***The YT notification channel for this server has been set to: ${message.channel}, for the YT channel with ID:*** \`${ytchanid}\``)
          message.channel.send(ytnotiEmbed);
    
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(!logChannel) return;
    
          const ytnotiLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setTitle(`⚙️ | Logs`)
          .setThumbnail(client.user.displayAvatarURL())
          .addField(`CONFIG_YT_NOTIFICATION_CHANNEL`, `The **YT notification channel** for this server has been set to: **${message.channel}**, for the **YT channel with ID**: \`${ytchanid}\`!`)
          logChannel.send(ytnotiLogEmbed);

          notifier.subscribe(ytchanid);
        }
      }
    }

  module.exports.help = {
    name: "ytnotification",
    aliases: ["ytnoti"],
    category: "other"
}