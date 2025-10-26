require("dotenv").config();
const axios = require("axios");

const express = require("express");
const cors = require("cors");
const app = express();

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events/index.js");
const input = require("input");

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

      const chat_slay = dialogs.find((chat) => chat.name === "Slay 5opka Chat");
      console.log(chat_slay);
    }

    //await findChannel();

    const commentGroupId = -1002398372400;

    //const commentGroupId = -1003299332773;

    client.addEventHandler(async (event) => {
      const message = event.message;

      if (Number(message.chatId.valueOf()) !== commentGroupId) return;

      if (message.fwdFrom && message.fwdFrom.channelPost) {
        console.log("🆕 Новый пост из канала обнаружен!");


        const photos = [
          'https://i.ibb.co/PvWMxRhF/5opka-1.jpg',
          'https://i.ibb.co/hr8tr8X/5opka-2.jpg',
          'https://i.ibb.co/1fLnBTsG/5opka-3.jpg',
          'https://i.ibb.co/4wvG8XSn/5opka-4.jpg',
          'https://i.ibb.co/x8sJzZN6/5opka-5.jpg'
        ]
        const comments = [
          "42 братухи за нашего босса, фугоботы пятерка мега хайп на SLAY!",
          "Мем-года, хайп всего Twitch, 5opka забирает Slay King 2025!",
          "Пятерка рулит сценой, мы фанаты, залуженно выигрываем каждый год!",
          "2023, 2024 и 2025 — наша эра, босс всего Twitch побеждает!",
          "Фугоботы включены, мега хайп, мем-года и победа за 5opka!",
          "Все за одного, один за всех, 42 братухи поддерживают босса!",
          "5opka на троне Twitch, мега хайп, мемы, победа и Slay King!",
          "Пятерка — босс всего Twitch, мы забираем премию Slay 2025!",
          "Фугоботы готовы, хайп зашкаливает, мем-года и победа на сцене!",
          "SLAY 2025, 5opka, мега хайп, мем-года и фанаты навсегда!",
        ];
        
        const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
        const randomComment = comments[Math.floor(Math.random() * comments.length)];


        await client.sendMessage(commentGroupId, {
          file: randomPhoto,
          message: `<blockquote><b>${randomComment}</b></blockquote> \n #братуха42 #мега_хайп #победа_не_избежна`,
          parseMode: "html",
          replyTo: message.id,
        });

        console.log("✅ Комментарий отправлен:");
      }
    }, new NewMessage({ chats: [commentGroupId] }));
  } catch (err) {
    console.error("❌ Непредвиденная ошибка:", err);
    process.exit(1);
  }
}
startApp();

app.listen(3001, (err) => {
  err ? err : console.log("STARTED SERVER");
});
