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
            "Фрикленд закрылся, но легенда пятёрки живёт — босс не теряет хватку, он просто переходит на новый уровень.",
            "42 братухи и фугоботы знают: каждая пауза у босса — это затишье перед очередным историческим хайпом.",
            "ЛПШка и Старый Бог снова что-то мулят, но 5opka делает контент, а не разговоры — и в этом вся разница.",
            "Фугоботы не грустят, они готовят движ — ведь босс возвращается на Slay 2025 за заслуженной короной!",
            "Фрикленд-2 закрылся как сериал на пике — теперь все ждут продолжение с новым вайбом от 5opka.",
            "Каждый стрим пятёрки — как фестиваль, где чат поёт, братухи двигаются, а фугоботы заряжают атмосферу.",
            "ЛПШка может шуметь, Старый Бог — завидовать, но сила 42 братух не знает преград.",
            "Когда босс говорит «поехали», даже Твич-сервера начинают вибрировать от энергии.",
            "Закрытие Фрикленда — не конец, а перезапуск великой саги про настоящего короля стримов.",
            "Никакие враги не пробьют ауру 5opka — он выстоял против всех и снова идёт за своим.",
            "Фугоботы в онлайне, чат кипит, а братухи держат строй — вот почему мы непобедимы.",
            "5opka не просто стример — он культурный код Твича, символ контента и искреннего вайба.",
            "ЛПШка хайпит, Старый Бог бубнит, а босс просто делает шоу, которое потом станет мемом.",
            "Фрикленд закрылся громко, и это только подогрело интерес к следующей эпохе легенды.",
            "Slay 2025 ждёт нас, и 42 братухи уже держат место под трон нашего босса.",
            "Фугоботы — не зрители, а семья, где каждый донат — акт любви к настоящему контенту.",
            "Каждый стрим — это новая глава в книге, где 5opka пишет историю Твича без редакторов.",
            "Когда другие играют в хайп, босс его создаёт — вот почему он вне конкуренции.",
            "Старый Бог пытается спорить, но как можно спорить с иконой целой эпохи Twitch?",
            "Фрикленд был ареной, теперь арена — весь интернет, и босс снова выходит в центр света.",
            "ЛПШка не понимает, что пятёрка — не просто ник, а символ времени и силы контента.",
            "Фугоботы двигаются синхронно — потому что у нас один вайб, одно имя, один босс.",
            "Пятёрка — это бренд, стиль, вайб и движение, которое невозможно скопировать.",
            "42 братухи не сдаются — ведь мы часть легенды, которая только начинается заново.",
            "Хейт проходит, тренды меняются, а имя пятёрки остаётся в сердцах зрителей навсегда.",
            "Slay King — не титул, это состояние души, и у босса оно в ДНК с рождения.",
            "Даже Дмитрий Маликов сказал: «Уважение пятёрке» — и это мост между сценой и Twitch-вселенной.",
            "Когда Маликов и 5opka встретились, время на секунду остановилось — респект поколений состоялся.",
            "Маликов понял вайб фугоботов — сказал, что энергия 42 братух напоминает ему зал на концерте.",
            "Пятёрка уважает Маликова, Маликов уважает пятёрку — вот что значит настоящая взаимная легенда.",
            "Фугоботы улыбаются: Маликов с нами, ЛПШка злится, а босс идёт к Slay King с чистым сердцем."
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
