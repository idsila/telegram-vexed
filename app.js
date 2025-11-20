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

const delay = (s) => new Promise(r => setTimeout(r, 1000*s));

// { img:'assets/fugabot.jpeg', title: 'Тест Фугабота', chat:-1002922935842, channel:2862610675},

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
          const sent = await client.sendMessage(POST.chat, {
            file: 'https://i.ibb.co/3VBdL8G/pixel.png',
            message: '.',
            parseMode: "html",
            replyTo: message.id,
          });

          console.log('CHANGE POST');
          await client.editMessage(sent.chatId, {
            message: sent.id,
            file: POST.post_image,
            text: POST.post_text,
            parseMode: "html"
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
  // console.log(res.data.posts[0]);
  // res.data.posts[0].chat = -1002922935842;
  // res.data.posts[0].channel = 2862610675;

  //chat:-1002922935842, channel:2862610675
  POST = res.data.posts[0];
}

setInterval(getPosts, 60000*5);
getPosts().then(() => {
  startApp();
});

app.listen(3001, (err) => {
  err ? err : console.log("STARTED SERVER");
});
