const responses = [
    'Unclear, ask again later',
    'Soon',
    'Yes',
    'Absolutely!',
    'Never',
    'Magic 8-ball is currently unavailable, please leave a message after the tone. \\*beep\\*',
    'When you are ready',
    'Hopefully',
    'Hopefully not',
    'Oh my, why would you even ask that?',
    'What kind of a question is that?',
    'Over my dead body!',
    'Haha, funny joke'
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw 'Please specify something to ask of the magic 8-ball!';
    }

    let response = randomItem(responses);
    
    msg.channel.send(`:8ball: | **${response}**`);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
    name: '8ball',
    usage: '8ball <question>',
    description: 'Ask the 8ball a question'
};