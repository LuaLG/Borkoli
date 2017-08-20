const ms = require("ms");
const func = require("../functions.js");
exports.run = async function(bot, msg, args) {
  try {
    let member = await msg.mentions.members.first();
    if(!member) return func.embed(msg, 0xff0000, "Incorrect input", "Please mention a member to mute!");
    let time = args[1];
    if(!time) return func.embed(msg, 0xff0000, "Time not provided", "Please specify an amount of time to mute for!");
    let reason = args.slice(2).join(" ");
    if(!reason) return func.embed(msg, 0xff0000, "No Reason Specified!", "Please specify a reason for this mute!");
    let mute = await msg.guild.roles.find("name", "Muted");
    if(!mute) return func.embed(msg, 0xff0000, "Error ", "I couldn't find the Muted` role!");

    if(member.roles.has(mute.id)) {
      return msg.reply(":no_entry:  That member has already been muted");
    } else {
    member.addRole(mute.id);
    func.embed(msg, 0xff0000, "Successfully Muted", `Muted: ${member.user.tag} \nID: ${member.id} \nTime: ${ms(ms(time), {long: true})} \nReason: ${reason}`);
    func.embedID(msg, "314546622426120202", 0xff0000, "A user has been muted!", `Muted: ${member.user.tag} \nID: ${member.id} \nTime: ${ms(ms(time), {long: true})} \nReason: ${reason}`);
    }
    setTimeout(function() {
      member.removeRole(mute.id);
      func.embed(msg, 0xff0000, "Unmuted", `Unmuted: ${member.user.tag} \nID: ${member.id} \nTime: ${ms(ms(time), {long: true})} \nReason: ${reason}`);
    }, ms(time));

    } catch(e) {
    func.embed(msg, 0xff0000, "`Error`", `\`\`\`${e.stack}\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Mutes user for mentioned time',
  usage: 'mute <mention> <time> <reason>'
};