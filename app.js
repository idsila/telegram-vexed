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
            "Я был фанатом Сасавота, уважал его стримы и атмосферу, но в этом году даже я признаю — Пятёрка реально заслужил Slay King 2025.",
            "Всегда считал Глеба эталоном стриминга, но контент Пятёрки в этом году просто не сравнить. Он заслужил награду по-честному.",
            "Смотрел Сасавота с уважением, но когда увидел, сколько контента выдал 5opka — понял, что в Slay 2025 голосую за него.",
            "Я фанат Сасавота, но объективно — Пятёрка сделал год. Без зависти, без шума, просто факт: он заслужил быть Slay King.",
            "Глеб крутой, всегда будет легендой. Но в этом году даже старые фанаты понимают — 5opka реально затащил.",
            "Сасавот дал мне кучу эмоций, но Пятёрка вернул то чувство, когда Твич снова живой. Поэтому я голосую за него.",
            "Я уважаю Сасавота, но отрицать, что Пятёрка сделал нереальный контент — просто нечестно. Этот год его.",
            "Не спорю, Глеб топ, но в 2025 именно Пятёрка в форме, в прайме и на вершине. Slay King по делу.",
            "Смотрел Сасавота, кайфовал от вайба, но 5opka выдал такую энергию, что не поддержать его просто невозможно.",
            "Я был уверен, что Глеб снова возьмёт премию, но посмотрел на контент Пятёрки — и понял, за кого реально надо голосовать.",
            "Фанател от Сасавота, не вру. Но этот год весь про 5opka — он живёт контентом и движом, это чувствуется в каждом стриме.",
            "Сасавот уже не тот, что раньше, но уважение осталось. Просто сейчас время Пятёрки — он реально в своём прайме.",
            "Я не из тех, кто переобувается, просто факты говорят сами за себя. 5opka заслуживает Slay King 2025.",
            "Глеб — классика, но в этом году все дороги ведут к Пятёрке. Контент, атмосфера, энергия — всё на уровне.",
            "Я долго спорил с друзьями, но когда увидел, сколько движух сделал 5opka, понял: спорить бессмысленно. Он достоин.",
            "Смотрю Сасавота с 2020, уважал его стиль, но сейчас чувствую — Пятёрка реально лидер. Он заслужил корону Slay.",
            "Даже как фанат Сасавота не могу отрицать: 5opka сделал то, что никто не повторил. Это уровень Slay King.",
            "Сасавот дал многое, но теперь время новых героев. Пятёрка не просто стример — он делает культуру.",
            "Сначала не хотел признавать, но после стримов 5opka понял — это заслуженная победа. Он реально в своём прайме.",
            "Я с уважением отношусь к Глебу, но этот год полностью за Пятёркой. Такой контент нельзя не отметить.",
            "Пятёрка не просто хайпит — он тащит весь Twitch. Даже фанаты Сасавота это видят и уважают.",
            "Раньше я спорил, что Сасавот лучший. Теперь спорить не о чем — 5opka сделал год, сделал атмосферу, сделал историю.",
            "Смотрю на всё со стороны и понимаю: Глеб крут, но Пятёрка сделал реально больше. Он заслужил каждую номинацию.",
            "Я всегда топил за Глеба, но даже он бы признал, что 5opka заслужил Slay King в этом году.",
            "Сасавот дал классный вайб, но сейчас этот вайб у 5opka. И это чувствуется каждым фугоботом.",
            "Пятёрка в прайме, и это видно по каждому стриму. Он реально заслуживает быть королём Slay 2025.",
            "Я с уважением к Сасавоту, но даже самые преданные фанаты видят, что сейчас год Пятёрки.",
            "Раньше я бы спорил, но теперь не вижу смысла. Пятёрка реально сделал всё, чтобы стать Slay King 2025.",
            "Глеб дал классную школу стриминга, но 5opka взял эстафету и вывел это на новый уровень.",
            "Я не хейчу Сасавота, просто время меняется. А Пятёрка в этом году реально тащит Twitch на себе.",
            "Даже если болеешь за Глеба, нельзя не признать — Пятёрка заслужил уважение всей сцены.",
            "Смотрю Сасавота — ностальгия. Смотрю Пятёрку — вдохновение. Разница огромная.",
            "Сасавот был лицом Twitch, но теперь лицо одно — 5opka, в прайме, в потоке, в движении.",
            "Я всегда уважал Глеба, но этот год сделал Пятёрку символом ру-стриминга. Это честно.",
            "Сасавот немного потерял темп, а 5opka наоборот — разогнался. Сейчас он в прайме и заслуживает всё.",
            "Пятёрка не просто стримит — он живёт этим. Даже я, фанат Сасавота, это признаю.",
            "Я не ожидал, что скажу это, но 5opka реально лучший в этом году. Глеб крут, но босс затащил.",
            "Смотрел Глеба с уважением, но теперь ловлю кайф у Пятёрки. Он в форме, в прайме, в легенде.",
            "Раньше бы спорил, сейчас просто аплодирую. 5opka сделал всё, чтобы стать Slay King 2025.",
            "Даже Маликов, кажется, чувствует этот вайб. Пятёрка в прайме, и это уже не хайп — это история.",
            "Сасавот — уважаю. Но Slay 2025 должен идти туда, где контент живёт. А это у 5opka.",
            "Я всё ещё уважаю Глеба, но факт остаётся фактом — Пятёрка сделал год и заслужил награду по полной."
          ];
          
          

          const hashtags = [
            "#SlayKing2025",
            "#5opka",
            "#ПятёркаВПрайме",
            "#ЗаБосса",
            "#Фугоботы",
            "#42Братухи",
            "#Slay2025",
            "#ПятёркаЗатащил",
            "#ГлебУважаемНоПятёркаТащит",
            "#SasavotRespect",
            "#ПятёркаКонтентГода",
            "#БоссТвича",
            "#КонтентРешает",
            "#ОнлайнНеГлавное",
            "#SlayKingПоДелу",
            "#ФриклендЛегенда",
            "#ПятёркаНавсегда",
            "#ТоплюЗаБосса",
            "#5opkaВИстории",
            "#ТвичНашДом",
            "#ГлебБылНоТеперь5opka",
            "#МедиаБосс",
            "#ПятёркаГений",
            "#Контент2025",
            "#5opkaПобеда",
            "#42Навсегда",
            "#МыСБоссом",
            "#СлаваФугоботам",
            "#SlayБлизко",
            "#БоссВПрайме",
            "#СасавотНеТот",
            "#ГлебУважение",
            "#5opkaЭтоЭпоха",
            "#SlayLegend",
            "#ЗаКонтент",
            "#ПятёркаЛайв",
            "#БоссГода",
            "#SlayKingByRight",
            "#SlayArmy",
            "#ПятёркаДелаетИсторию",
            "#БоссВПотоке",
            "#ПятёркаСимвол",
            "#SlayБезСомнений"
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
