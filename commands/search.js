exports.run = function(bot, msg, args) {
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
  var id = args.join(" ");
  if(!id) return embed(0xff0000, "No Id Provided", "No input detected ME");
  var result = msg.guild.members.filter(u => u.id === id).map(u => u.toString()).join(" | ");
  if (result.size === 0) return embed(0xff0000, "No Results Found", "I could not find that id in the guild!");
  embed(0xff0000, "Guild searched /shrug", `${result}`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'search',
  description: 'searches the guild for id',
  usage: 'searchuser <ID>'
};