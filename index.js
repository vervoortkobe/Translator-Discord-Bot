const express = require("express");
var Client = require("uptime-robot");
const cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

app.use(express.static("public"));

const listener = app.listen(process.env.PORT, function() {
  console.log("✔️  Your app is listening on port: " + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const color = process.env.COLOR;
const fetch = require("node-fetch");
const YouTubeNotifier = require("youtube-notification");


fs.readdir("./commands/", (err, files) => {
 
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Can/'t find the commands map!");
      return;
    }
   
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} was loaded!`);
      client.commands.set(props.help.name, props);
    });
  });



  client.on("ready", async () => {
    console.log(`${client.user.tag} was started!`);
    client.user.setActivity(`${process.env.PREFIX}help | ${client.user.username}`, {type: "PLAYING"});

client.api.applications(client.user.id).guilds("654314290672828419").commands.post({
  data: {
    name: "hello",
    description: "say hi"
  }
});
client.ws.on("INTERACTION_CREATE", async interaction => {
  const cmd = interaction.data.name.toLowerCase();
  if(cmd === "hello") {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "hello world"
        }
      }
    })
  }
});
});


const invites = {};

client.on("ready", async () => {
  setTimeout(() => {

    client.guilds.cache.forEach(g => {
      g.fetchInvites().then(guildInvites => {
        invites[g.id] = guildInvites;
      });
    });
  }, 1000);
});

client.on("guildMemberAdd", member => {

  member.guild.fetchInvites().then(guildInvites => {

    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const inviter = client.users.cache.get(invite.inviter.id);

    const logChannel = member.guild.channels.cache.find(c => c.name === "invite-logs");

    if(logChannel) logChannel.send(`${member} joined using invite code https://discord.gg/${invite.code}, made by ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////
//YT NOTIFICATIONS
  const notifier = new YouTubeNotifier({
    hubCallback: "https://Rex.tsunami2360.repl.co/youtube",
    path: "/youtube"
  });

  notifier.setup();
  
  notifier.on("notified", data => {

    let ytchannels = JSON.parse(fs.readFileSync("./ytchannels.json", "utf-8"));
      
    if(!ytchannels[data.channel.id]) return;
    let ytchannel = ytchannels[data.channel.id].ytchannels;

    const ytnotichannel = client.channels.cache.get(`${ytchannel}`);

    const ytnotiEmbed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setTitle(`▶ | YouTube Notification`)
    .setThumbnail(data.channel.icon)
    .setDescription(`\`${data.channel.name}\` uploaded a new video titled \`${data.video.title}\`!`);
    ytchannel.send(ytnotiEmbed)
    .then(ytchannel.send(`${data.video.link}`));
  });

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("guildCreate", guild => {
    console.log(`I have joined ${guild.name} (guild id: ${guild.id}), guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);
  });
   
  client.on("guildDelete", guild => {
    console.log(`I have left ${guild.name} (guild id: ${guild.id}), guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);
  });

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("messageReactionAdd", async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(!user.bot && reaction.message.author.id === client.user.id) {
      if(reaction.emoji.name === "◀️") {
        reaction.message.reactions.removeAll();
        reaction.message.react("◀️");
        reaction.message.react("▶️");
        const helpembedone = new Discord.MessageEmbed()
        .setTitle("Help 1")
        .setDescription("help1 test")
        reaction.message.edit(helpembedone);
      }

      if(reaction.emoji.name === "▶️") {
        reaction.message.reactions.removeAll();
        reaction.message.react("◀️");
        reaction.message.react("▶️");
        const helpembedtwo = new Discord.MessageEmbed()
        .setTitle("Help 2")
        .setDescription("help2 test")
        reaction.message.edit(helpembedtwo);
      }
    }
  });
  
///////////////////////////////////////////////////////////////////////////////////////////// 

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(!message.guild.id === "654314290672828419") return;

/////////////////////////////////////////////////////////////////////////////////////////////

    //CUSTOM PREFIXES
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;
    
    // let prefix = config.prefix;
    // let prefix = process.env.PREFIX;
    
/////////////////////////////////////////////////////////////////////////////////////////////
   
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args, notifier);

/////////////////////////////////////////////////////////////////////////////////////////////

});

client.login(process.env.TOKEN);