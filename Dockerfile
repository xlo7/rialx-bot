FROM node:20-slim

# تعيين دليل العمل
WORKDIR /app

# تثبيت الحزم المطلوبة على نظام التشغيل
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# إنشاء ملف package.json
COPY package.json ./

# تثبيت الاعتماديات
RUN npm install

# نسخ كود المصدر
COPY . ./

# تشغيل البوت في وضع مستقل
CMD ["node", "bot.js"]
