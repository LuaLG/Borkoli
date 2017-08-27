const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./settings.json');
const fs = require('fs');
const yt_api_key = settings.yt_api_key;
const moment = require('moment');
require('./util/eventLoader')(bot);

 



const log = msg => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${msg}`);
};

var config = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));




var guilds = {};



bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}!`);
    bot.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });
      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

bot.elevation = msg => {
  let permlvl = 0;
  let mod_role = msg.guild.roles.find('name', settings.modrolename);
  if(mod_role && msg.member.roles.has(mod_role.id)) permlvl = 2;
  if(msg.author.id === "246930852443848705") permlvl = 5;
  return permlvl;
};


bot.login("MzUxMjIxNzU2NzQ2Mzk5NzQ3.DIPcQw.lPUimhAHOn1sc-EIHHDgccSc59M");