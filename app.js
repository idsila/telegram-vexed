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

let POST = {};

app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.json());

async function startApp() {
  try {
    const stringSession = new StringSession(SESSION);
    const client = new TelegramClient(stringSession, API_ID, API_HASH, { connectionRetries: 5 });
    await client.start();

    await runNotifucation();
    
    async function runNotifucation() {
      client.addEventHandler(async (event) => {
        const message = event.message;
        if (Number(message.chatId.valueOf()) !== POST.chat) return;
        if (message.fwdFrom && message.fwdFrom.channelPost && message.fwdFrom.fromId.className === "PeerChannel" && Number(message.fwdFrom.fromId.channelId) === POST.channel) {
          await client.sendMessage(POST.chat, {
            file: POST.post_image,
            message: POST.post_text,
            parseMode: "html",
            replyTo: message.id,
          });
          console.log("✅ Комментарий отправлен:");
        }
      }, new NewMessage({ chats: [POST.chat] }));
    }
  } catch (err) {
    console.error("❌ Непредвиденная ошибка:", err);
    process.exit(1);
  }
}


async function getPosts(){
  const res= await axios.post(`${process.env.URL_ADMIN}/admin-posts`,  {}, { headers: { "Content-Type": "application/json" } });
  console.log(res.data.posts[0]);
  POST = res.data.posts[0];
}

setInterval(getPosts, 60000*5);
getPosts().then(() => {
  startApp();
});

app.listen(3001, (err) => {
  err ? err : console.log("STARTED SERVER");
});
