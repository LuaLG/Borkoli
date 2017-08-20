exports.run = async (bot, msg, args) => {
    if (args.length < 2) {
        throw 'User and reason not found!';
    }

    const member = msg.guild.members.get(args[0].substr(2, 18));
    if (!member) {
        throw 'User could not be found';
    }

    const reason = args.slice(1).join(' ');

    await member.user.send(`You were kicked for **${reason}**`);
    member.kick(reason);

    msg.channel.send(`Kicked **${member.user.tag}**. :zap:`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
    name: 'kick',
    usage: 'kick <user> <reason>',
    description: 'Kicks a user',
    perms: 'KICK_MEMBERS'
};