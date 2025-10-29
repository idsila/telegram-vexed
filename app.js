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

      const chat_slay = dialogs.find((chat) => chat.name === "42 FanLab Chat");
      console.log(chat_slay);
    }

    //await findChannel();
    // vexed  {chat:-1003250534097, channel: 2769199478}

    const commentGroupsId = [ {chat: -1002398372400, channel: 2106543498}, { chat: -1003299332773, channel: 3183906489 }];

    commentGroupsId.forEach(async (item) => {
      await runNotifucation(item);
    });

    async function runNotifucation(commentGroupId) {
      client.addEventHandler(async (event) => {
        const message = event.message;
       

        if (Number(message.chatId.valueOf()) !== commentGroupId.chat) return;

        if (message.fwdFrom && message.fwdFrom.channelPost &&
          message.fwdFrom.fromId.className === "PeerChannel" &&
          Number(message.fwdFrom.fromId.channelId) === commentGroupId.channel) {
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
            "https://i.ibb.co/s9pySMkx/5opka-10.jpg",
            "https://i.ibb.co/dwz4yTr5/5opka-11.jpg",
            "https://i.ibb.co/8ndj3KcR/5opka-12.jpg",
            "https://i.ibb.co/TqBB296G/5opka-13.jpg"
          ];
          const comments = [
            "Мы — 42 братухи и фугоботы, несём пятёрку к тройной короне Slay 2025 — босс идёт за своим!",
            "Пятёрка — медиа-акула, гений и легенда, дважды мем-года, теперь король Slay King 2025!",
            "Фрикленд — проект года, а 5opka — сердце всего Твича, и нас 42 братухи не остановить!",
            "С 2023 и 2024 мем-года за плечами, пятёрка забирает всё в 2025 — мы идём к абсолюту!",
            "Ни ЛПШка, ни Квадратный, ни Скрынник — никто не устоит против энергии босса Твича!",
            "Когда фугоботы выходят онлайн, весь Twitch дрожит — потому что пятёрка стримит!",
            "Слава Бустер в шоке, организаторы в панике — пятёрка снова берёт Slay King!",
            "42 братухи за пятёрку — не просто фанбаза, а сила, которая творит историю Твича!",
            "Каждый стрим пятёрки — событие, каждый мем — легенда, каждая победа — заслуженна!",
            "Фрикленд — не сервер, а вселенная, созданная боссом, где рождаются мемы и победы!",
            "Пятёрка не просто стример — он эпоха, символ контента, харизмы и искреннего движа!",
            "Жопа XXL и 42 — хиты, что качают мир, ведь пятёрка делает даже музыку эпичной!",
            "Когда пятёрка выходит в эфир — Твич замолкает и слушает босса.",
            "2025 — год, когда мы снова забираем всё, ведь 5opka — наш лидер и вдохновитель!",
            "Фугоботы не спят, братухи не отдыхают — Slay 2025 за нами!",
            "Пятёрка — это не просто контент, это искусство жить в хайпе и доброте.",
            "Ни один конфликт не победил босса — его харизма сильнее любой драмы.",
            "Мы идём за 5opka как за светом — и даже Маликов знает, что победа за нами!",
            "Каждый фугобот — часть легенды, каждый лайк — кирпич в стене славы пятёрки!",
            "Три года подряд — мем года, и это только начало истории 5opka.",
            "Фрикленд признан проектом года, потому что там живёт душа комьюнити пятёрки.",
            "Slay 2025 — сцена для нас, и мы уже знаем, кто выйдет за короной — босс Твича!",
            "5opka — старый бог нового времени, стример, который создал школу харизмы!",
            "Мировые хиты, легендарные стримы, бесконечный вайб — вот формула босса!",
            "42 братухи и фугоботы — не фанаты, а семья, что ведёт пятёрку к вечной славе!",
            "Каждый клип пятёрки — цитата эпохи, каждый стрим — праздник души!",
            "Твич без пятёрки — как интернет без мемов, пустота без огня!",
            "Организаторы премии не готовы к напору 42 братух — мы берём Slay штурмом!",
            "Фугоботы — движ, братухи — сила, пятёрка — легенда, Slay — наша сцена!",
            "Когда говорят «контент», слышится «пятёрка» — и это факт, признанный всем Твичом!"
          ];
          

          const hashtags = [
            "#Пятерка", 
            "#5opka", 
            "#Фугоботы", 
            "#42Братухи", 
            "#Slay2025", 
            "#SlayKing", 
            "#Фрикленд", 
            "#ПроектГода", 
            "#МемГода", 
            "#5opkaBoss", 
            "#БоссТвича", 
            "#ЛегендаТвича", 
            "#ГенийКонтента", 
            "#МедиаАкула", 
            "#5opkaАрмия", 
            "#Мы42", 
            "#ЖопаXXL", 
            "#Трек42", 
            "#БратухиЗаБосса", 
            "#ПятеркаНавсегда", 
            "#ФугоботыОнлайн", 
            "#5opkaSlayKing", 
            "#СлаваБустерВШоке", 
            "#ОрганизаторыВШоке", 
            "#ФугоботДвиж", 
            "#ФриклендТоп", 
            "#ТвичНашДом", 
            "#КонтентБога", 
            "#ПятеркаЗавозит", 
            "#5opkaМемМастер", 
            "#Пятерка2025", 
            "#ТопимЗаПятерку", 
            "#ПятеркаБосс", 
            "#ЛегендарныйКонтент", 
            "#ФугоботыСила", 
            "#42ИдетКПобеде", 
            "#Братство42", 
            "#5opkaForever", 
            "#5opkaCommunity", 
            "#ФриклендНавсегда", 
            "#ТвичЛегенда", 
            "#5opkaGenius"
          ];
          

          const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
          const hashtaId = Math.floor(Math.random() * hashtags.length);
          const randomComment =
            comments[Math.floor(Math.random() * comments.length)];

          await client.sendMessage(commentGroupId.chat, {
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
      }, new NewMessage({ chats: [commentGroupId.chat] }));
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
