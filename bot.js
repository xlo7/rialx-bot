const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// تحميل متغيرات البيئة
dotenv.config();

// التحقق من وجود توكن البوت
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN environment variable not found');
  process.exit(1);
}

// إنشاء كائن البوت
const bot = new TelegramBot(token, { polling: true });

console.log('Starting Telegram bot...');
console.log(`Bot token prefix: ${token.substring(0, 5)}...`);

// معالجة أمر /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `مرحباً! هذا هو بوت RialX.\nوقت التشغيل: ${new Date().toLocaleString()}`);
});

// معالجة أمر /status
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  const memoryUsage = process.memoryUsage();
  const memoryInfo = `استخدام الذاكرة: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`;
  
  bot.sendMessage(chatId, `🟢 البوت يعمل!\n${memoryInfo}\nآخر تحديث: ${new Date().toLocaleString()}`);
});

// معالجة جميع الرسائل النصية الأخرى
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `تلقيت رسالتك: ${msg.text}`);
  }
});

console.log('Bot is now running. Press CTRL+C to exit.');

// معالجة إيقاف البرنامج بأمان
process.on('SIGINT', () => {
  console.log('Gracefully shutting down bot...');
  bot.stopPolling();
  process.exit(0);
});
