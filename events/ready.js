const ms = require("ms");
module.exports = bot => {
  let date = new Date();
  console.log(`Ready!`);
  bot.user.setGame("/shrug");
};