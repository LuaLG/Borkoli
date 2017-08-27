
const splitargs = require('splitargs');
exports.run = function(bot, msg) {

    const responses = [
      'I think \"%\" is the best choice',
      'I\'ve decided on \"%\"',
      'Definitely \"%\"',
      '\"%\" would be best',
      'After much deliberation, \"%\"',
      'I reckon \"%\"',
      'I choose \"%\"'
    ];

    const choices = splitargs(msg.content);
    choices.shift();

    if (choices.length === 0) {
      mag.reply('Usage: `-choose ' + module.help.usage + '`');
      return;
    }

    const choice = choices[Math.floor(Math.random() * choices.length)];
    const response = responses[Math.floor(Math.random() * responses.length)].replace('%', choice);
    msg.reply(response);
  }


  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'choose',
    description: 'Chooses a input',
    usage: 'choose [option1] [option2]'
  };