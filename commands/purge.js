exports.run = function(bot, msg, args) {
  let messagecount = parseInt(args.join(' '));
  if(messagecount > 100) return msg.reply("Amount needs to be lower then 100");
  if(!messagecount) return msg.reply(":no_entry: `Invalid input, 1-100");
  msg.channel.fetchMessages({limit: messagecount});
  msg.channel.bulkDelete(messagecount, true);
  msg.reply(`I have deleted **${messagecount}** messages!`).then(msg => msg.delete(2000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Bulk deletes messages from 1-100',
  usage: 'purge <number [1-100]>'
};