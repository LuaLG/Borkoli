exports.run = function(bot, msg) {
async function embed(colour, title, description) {
     try {
       await msg.channel.send("", {embed: {
         author: {
           name: msg.author.username,
           icon_url: msg.author.avatarURL,
         },
         color: colour,
         title: title,
         description: description,
         timestamp: new Date(),
       }});
     } catch(e) {
       console.error(e);
     }
};
  if(!msg.guild.member(bot.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply(":no_entry: `I dont have the permissions! \nMissing permission: `MANAGE_ROLES_OR_PERMISSIONS`");
  let user = msg.mentions.users.first();
  if(!user) return msg.reply(":no_entry: No user was mentioned  same");
  let muteName = "Muted";
  let mute = msg.guild.roles.find(r => r.name.toLowerCase() === muteName.toLowerCase());
  if(!mute) return msg.reply(":no_entry: I couldnt find the muted role`")
  msg.guild.fetchMember(user).then(m => m.removeRole(mute));
  embed(0xff0000, "Successfully Unmuted User!", `Unmuted: ${user.username}#${user.discriminator}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unmute',
  description: 'Unmutes the user you mentioned',
  usage: 'unmute <mention>'
};