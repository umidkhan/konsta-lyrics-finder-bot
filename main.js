const { Telegraf, Markup } = require("telegraf");
const axios = require("axios");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => {
  ctx.reply("Welcome");
});

bot.on("message", async (ctx) => {
  ctx.react("👌");
  const text = ctx.msg.text;

  axios
    .get("https://konsta-lyrics-api.onrender.com/lyrics/" + text)
    .then(async (res) => {
      await ctx.reply(`${res.data}\n\n🤖@Konsta_matnlari_bot`);
    })
    .catch((err) => ctx.reply("Not found"));
});

bot.launch(() => {
  console.log("Bot started!");
});
