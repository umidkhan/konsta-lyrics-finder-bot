const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);
bot.start(ctx => {
	ctx.reply(
		`Assalomu alaykum <b>${ctx.from.first_name}</b>\nUshbu bot orqali Konsta va Shokir ijrosidagi treklarning matnlarini topishingiz mumkin\nShunchaki izlayotgan trek nomini kiriting va matnga ega bo'ling\n\nBot ishlashi bilan biror muammo yuzaga kelsa @Janob_negativ'ga murojaat qiling`,
		{ parse_mode: 'HTML' }
	);
});

bot.help(ctx =>
	ctx.reply(
		`Botga o'zingiz izlayotgan trek nomini kiriting, agar trek matni topilsa bot siz yuboradi. Agar yo'q bo'lsa unda qo'shilishini kutishingizga to'g'ri keladi\n\nO'zingiz qo'shmoqchi bo'lsangiz @Janob_negativ'ga murojaat qilishingiz mumkin`
	)
);

bot.on('message', async ctx => {
	ctx.react('👌');
	const text = ctx.msg.text;
	axios
		.get(process.env.API + text)
		.then(async res => {
			await ctx.reply(
				`${res.data}\n\n🤖@Konsta_matnlari_bot\n@LyricsLever kanali bilan hamkorlikda\n\n⚠️Matndan biror xato topgan bo'lsangiz @Janob_negativ'ga murojaat qiling`
			);
			setTimeout(() => {
				ctx.telegram.sendMessage(
					-1002069272637,
					`<b>🤖 @Konsta_matnlari_bot</b>\n👤Name: <a href="tg://user?id=${
						ctx.from.id
					}">${ctx.from.first_name}</a>\n🔰Username: @${
						ctx.from.username == undefined ? 'Not found' : ctx.from.username
					}\n🆔Chat ID: <code>${ctx.chat.id}</code>\n🔢User ID: <code>${
						ctx.from.id
					}</code>\n✍️Wrote: ${ctx.msg.text}`,
					{ parse_mode: 'HTML' }
				);
			}, 60000);
		})
		.catch(err =>
			ctx.reply(
				"Ushbu nomdagi trek matni hali qo'shilmagan yoki trek nomi noto'g'ri🤷‍♂️\nTekshirib qaytadan yuboring yoki matn qo'shilishini kuting\nAgar matn qo'shmoqchi bo'lsangiz @Janob_negativ'ga murojaat qiling"
			)
		);
});

bot.launch(() => {
	console.log('Bot started!');
});

module.exports = bot;
