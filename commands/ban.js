const Discord = require('discord.js');
exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = client.channels.find('name', 'logs');
    if (!modlog) return message.reply('I cannot find logs channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the ban');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them').catch(console.error);

    if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
    message.guild.ban(user, 2);

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
    return client.channels.get(modlog.id).send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
};

exports.help = {
    name: 'ban',
    description: 'Bans the mentioned user.',
    usage: 'ban [mention] [reason]'
};