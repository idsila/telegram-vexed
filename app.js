require("dotenv").config();
const axios = require("axios");

const express = require("express");
const cors = require("cors");
const app = express();

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram/tl");
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

    //const commentGroupId = -1002398372400;

    const commentGroupId = -1003299332773;

    client.addEventHandler(
      async (event) => {
        const message = event.message;
  
        // Проверяем, что сообщение из нужного чата
        if (Number(message.chatId.valueOf()) !== commentGroupId) return;
  
        // Проверяем, что это пост из канала (пересланное сообщение)
        if (message.fwdFrom && message.fwdFrom.channelPost) {
          console.log("🆕 Новый пост из канала обнаружен!");
  
          // Случайный комментарий
          const comments = [
            "🔥 Отличный пост!",
            "💫 Очень интересно!",
            "😍 Супер, как всегда!",
            "💥 Просто топ!",
            "🔥🔥🔥",
          ];
          const randomComment = comments[Math.floor(Math.random() * comments.length)];
  
          
          // Отправляем комментарий
          await client.sendMessage(commentGroupId, {
            file: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Sheba1.JPG',
            message: randomComment,
            replyTo: message.id,
          });
  
          console.log("✅ Комментарий отправлен:");
        }
      },
      new NewMessage({ chats: [commentGroupId] })
    );


  } catch (err) {
    console.error("❌ Непредвиденная ошибка:", err);
    process.exit(1);
  }
}
startApp();

app.listen(3001, (err) => {
  err ? err : console.log("STARTED SERVER");
});
