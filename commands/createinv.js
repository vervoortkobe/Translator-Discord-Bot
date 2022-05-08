const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
  
    if(message.author.id === `383332117188444160`) {
    
      const findServer = client.guilds.cache.get(args[0]);
      if(!findServer) return message.channel.send(`❌ | Pls define a valid server!`);
      const firstChannel = findServer.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
      if(!firstChannel) return message.channel.send(`❌ | I couldn't create an invite for this server, because this server doesn't have any textchannels!`);

      if(!args[0]) {
        const createinvUsageEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`⚙️ | ${client.user.username} Create Invite`)
        .setDescription(`Usage: **${prefix}createinv <server ID>**`)
        .addField(`⚠️ | Warning`, `<server ID> HAS TO BE AN ID, GIVING THE SERVER'S NAME DOESN'T WORK!!!`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        return message.channel.send(createinvUsageEmbed);
      }

      let invite = await firstChannel.createInvite({ maxAge: 86400, maxUses: 10 }).catch(console.error);
      message.channel.send(`☑️ | I have sent it in your dm, ${message.author}!`);
      message.member.send(`Here is an invite of \`${findServer.name}\`, with ID: \`${findServer.id}\`.\n${invite}`);

    } else {

      return message.channel.send(`❌ | You don't have permissions to use this command!`);
    }
  }
  
  module.exports.help = {
    name: "createinv"
}