require("dotenv").config();
const axios = require("axios");

const express = require("express");
const cors = require("cors");
const app = express();

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events/index.js");

const API_ID = +process.env.API_ID;
const API_HASH = process.env.API_HASH;
const SESSION = process.env.SESSION;

app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.json());

async function startApp() {
  try {
    const stringSession = new StringSession(SESSION);
    const client = new TelegramClient(stringSession, API_ID, API_HASH, {
      connectionRetries: 5,
    });
    console.log("✅ Авторизация успешна!");

    await client.start();

    async function findChannel() {
      const dialogs = await client.getDialogs();

      const chat_slay = dialogs.find((chat) => chat.name === "HardBoost Chat");
      console.log(chat_slay);
    }

    //await findChannel();

    //const commentGroupId = -1002398372400;
     //const commentGroupId = -1003299332773;

    const commentGroupsId = [-1002398372400, -1003299332773, -1002922935842];
   
    commentGroupsId.forEach(async (item) => {
      await runNotifucation(item);
    });

    async function runNotifucation(commentGroupId) {
      client.addEventHandler(async (event) => {
        const message = event.message;

        if (Number(message.chatId.valueOf()) !== commentGroupId) return;

        if (message.fwdFrom && message.fwdFrom.channelPost) {
          console.log("🆕 Новый пост из канала обнаружен!");

          const photos = [
            "https://i.ibb.co/PvWMxRhF/5opka-1.jpg",
            "https://i.ibb.co/hr8tr8X/5opka-2.jpg",
            "https://i.ibb.co/1fLnBTsG/5opka-3.jpg",
            "https://i.ibb.co/x8sJzZN6/5opka-5.jpg",
            "https://i.ibb.co/BKrYxcnW/5opka-6.jpg",
            "https://i.ibb.co/Y4sz4NR5/5opka-7.jpg",
            "https://i.ibb.co/B2hN7qTt/5opka-8.jpg",
            "https://i.ibb.co/B532hrMC/5opka-9.jpg",
          ];
          const comments = [
            "Мы 42 братухи, фугоботы навсегда, за Пятёрку стоим стеной — Slay 2025 будет нашим, и пусть весь Твич знает, кто тут босс!",
            "Пятёрка — мем-года трижды подряд, хайп не гаснет, братухи рядом, фугоботы заряжены на победу Slay 2025 и титул Slay King.",
            "Когда Пятёрка на сцене, 42 братухи и фугоботы делают шум, Slay 2025 дрожит — ведь мы пришли за всеми наградами!",
            "Дмитрий Маликов и 42 братухи уже знают — Пятёрка снова возьмёт Slay King 2025, ведь мега хайп не остановить никогда.",
            "Slay 2025 — это наш финал, мы идём только вперёд, фугоботы и братухи под флагом Пятёрки, босса всего Твича.",
            "Нам не нужен фейк хайп — у нас Пятёрка, у нас сила 42 братух и фугоботов, и мы уже пишем историю Slay 2025.",
            "Фугоботы включили максимальный режим — Пятёрка на троне, братухи в строю, Slay 2025 дрожит от мемов и мощи.",
            "2023, 2024 — уже наши годы, 2025 — закрепляем успех, ведь Пятёрка и братухи снова берут всё по праву хайпа.",
            "Когда Пятёрка в эфире, мемы рождаются сами, а фугоботы и братухи делают из Slay 2025 настоящее шоу легенд.",
            "Мы не просто фанаты — мы семья, 42 братухи и фугоботы, и наш босс Пятёрка уже на пути к Slay King 2025.",
            "Пятёрка — это символ года, хайпа и побед, фугоботы и братухи снова штурмуют Slay 2025, и ничто нас не остановит.",
            "Мем-года трижды подряд — и это только начало, ведь в 2025 мы заберём Slay King с Пятёркой во главе!",
            "Каждый фугобот знает: если Пятёрка участвует, Slay 2025 превращается в легенду — 42 братухи уже готовы к бою.",
            "Сила в нас, хайп в нём — Пятёрка идёт за Slay King, а братухи и фугоботы делают историю прямо сейчас.",
            "Когда 42 братухи кричат за Пятёрку — весь Твич замирает, ведь босс идёт брать Slay 2025 заслуженно!",
            "Slay 2025 — наш турнир, Пятёрка — наш лидер, фугоботы — наша армия, и вместе мы творим хайповую историю.",
            "Фугоботы не спят — они стримят, клипят, бустят и верят, что Пятёрка снова возьмёт всё на Slay 2025.",
            "Мы — 42 братухи, несем мемы и победы, фугоботы поддерживают босса Твича Пятёрку на пути к Slay King 2025.",
            "Хайп, мемы и братство — формула успеха Пятёрки, и Slay 2025 уже готов увидеть, как мы снова побеждаем.",
            "Пятёрка — король Твича, мемов и сердец, и даже Slay 2025 не устоит перед нашей братухо-фугоботской энергией.",
            "Когда все стримеры только говорят, Пятёрка делает — 42 братухи и фугоботы уже готовят трон Slay King 2025.",
            "Мем-года, хайп-года, стример-года — всё это Пятёрка, а фугоботы и братухи просто помогают забрать Slay 2025.",
            "Slay 2025 будет ярче, ведь там будет Пятёрка, его мемы, фугоботы и братухи — армия, которая делает легенду живой.",
            "Мы не просто поддержка — мы культура, сила и дух, и с Пятёркой на Slay 2025 никто не сможет сравниться.",
            "Фугоботы знают, что хайп не вечен, но с Пятёркой он бесконечен — Slay 2025 уже в наших руках.",
            "Дмитрий Маликов сказал: ‘за Пятёрку и 42 братухи!’ — и это значит, что Slay King 2025 уже наш.",
            "Мы берём Slay 2025 не случайно — мы фугоботы, мы 42 братухи, и наш босс Пятёрка достоин каждого трофея.",
            "Три года хайпа, три года побед — 2025 завершает трилогию Пятёрки, и Slay King ждёт своего законного хозяина.",
            "Фугоботы и братухи не спорят — Пятёрка заслужил всё, и Slay 2025 станет главным доказательством этого.",
            "Пятёрка, мы с тобой до конца — 42 братухи, фугоботы и весь Твич готовы кричать твоё имя на Slay 2025!",
          ];

          const hashtags = [
            "#Пятёрка",
            "#5opka",
            "#Slay2025",
            "#SlayKing",
            "#Фугоботы",
            "#42Братухи",
            "#БоссТвича",
            "#МемГода",
            "#ХайпГода",
            "#ТвичЛегенда",
            "#SlayПобеда",
            "#ЗаПятёрку",
            "#ФугоботАрмия",
            "#БратухаПрайд",
            "#ПятёркаБосс",
            "#МемныйКороль",
            "#ХайпБезГраниц",
            "#SlayНавсегда",
            "#ФугоботыВперёд",
            "#ПятёркаХайп",
            "#SlayЛегенда",
            "#БратухиВБою",
            "#ФугоботСила",
            "#ПятёркаНавсегда",
            "#КорольТвича",
            "#МемнаяАрмия",
            "#БратухаДвиж",
            "#ПятёркаSlay",
            "#42ЗаБосса",
            "#ФугоботыСнами",
            "#Пятёрка2025",
            "#SlayЗалНаш",
            "#SlayБратухи",
            "#ТопТвич",
            "#ФугоботХайп",
            "#SlayВдохновение",
            "#ХайпПятёрки",
            "#БратухиФугоботы",
            "#МемныйSlay",
            "#ТвичБосс",
            "#СлаваПятёрке",
            "#SlayПятёрка",
          ];

          const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
          const hashtaId = Math.floor(Math.random() * hashtags.length);
          const randomComment =
            comments[Math.floor(Math.random() * comments.length)];

          await client.sendMessage(commentGroupId, {
            file: randomPhoto,
            message: `<blockquote><b>${randomComment}</b></blockquote>\n ${
              hashtags[hashtaId]
            } ${hashtags[hashtaId > hashtags.length - 2 ? 0 : hashtaId + 1]} ${
              hashtags[hashtaId > hashtags.length - 3 ? 0 : hashtaId + 2]
            }`,
            parseMode: "html",
            replyTo: message.id,
          });

          console.log("✅ Комментарий отправлен:");
        }
      }, new NewMessage({ chats: [commentGroupId] }));
    }
    app.get("/sleep", async (req, res) => {
      res.send({ type: 200 });
    });
  } catch (err) {
    console.error("❌ Непредвиденная ошибка:", err);
    process.exit(1);
  }
}
startApp();

app.listen(3001, (err) => {
  err ? err : console.log("STARTED SERVER");
});
