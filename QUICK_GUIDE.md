# دليل الاستخدام السريع - نظام إدارة رابط الحجز الخارجي

## 📋 نظرة عامة
هذا النظام يسمح لك بالتحكم في سلوك أزرار "احجز الآن" في الموقع:
- **إذا كان هناك رابط خارجي:** تتوجه جميع الأزرار إلى الرابط الخارجي
- **إذا كان الرابط فارغاً:** تفتح جميع الأزرار النموذج الداخلي للحجز

## 🔧 كيفية تغيير الرابط

### الخطوة 1: تعديل ملف config.js
افتح الملف التالي:
```
/home/ubuntu/newsalamat/client/public/config.js
```

### الخطوة 2: تحديث الرابط
**لإضافة رابط خارجي:**
```javascript
window.EXTERNAL_BOOKING_URL = "https://your-booking-site.com";
```

**للعودة للنموذج الداخلي:**
```javascript
window.EXTERNAL_BOOKING_URL = "";
```

### الخطوة 3: إعادة بناء المشروع
```bash
cd /home/ubuntu/newsalamat
pnpm build
```

### الخطوة 4: إعادة تشغيل السيرفر
```bash
# إيقاف السيرفر الحالي
ps aux | grep "node dist" | grep -v grep | awk '{print $2}' | xargs kill -9

# تشغيل السيرفر الجديد
PORT=5000 pnpm start > /tmp/newsalamat.log 2>&1 &
```

## 🚀 أمر واحد لتطبيق التغييرات
بعد تعديل config.js، نفذ هذا الأمر:
```bash
cd /home/ubuntu/newsalamat && pnpm build && ps aux | grep "node dist" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null; PORT=5000 pnpm start > /tmp/newsalamat.log 2>&1 & echo "✓ تم تطبيق التغييرات"
```

## 📝 أمثلة

### مثال 1: إضافة رابط خارجي
```bash
# 1. تعديل الملف
echo '// ضع الرابط الخارجي هنا، أو اتركه فارغاً للنموذج الداخلي
window.EXTERNAL_BOOKING_URL = "https://tamiview.xyz/";' > /home/ubuntu/newsalamat/client/public/config.js

# 2. تطبيق التغييرات
cd /home/ubuntu/newsalamat && pnpm build && ps aux | grep "node dist" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null; PORT=5000 pnpm start > /tmp/newsalamat.log 2>&1 &
```

### مثال 2: حذف الرابط (العودة للنموذج الداخلي)
```bash
# 1. تعديل الملف
echo '// ضع الرابط الخارجي هنا، أو اتركه فارغاً للنموذج الداخلي
window.EXTERNAL_BOOKING_URL = "";' > /home/ubuntu/newsalamat/client/public/config.js

# 2. تطبيق التغييرات
cd /home/ubuntu/newsalamat && pnpm build && ps aux | grep "node dist" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null; PORT=5000 pnpm start > /tmp/newsalamat.log 2>&1 &
```

## ⚠️ ملاحظات مهمة
1. **يجب** إعادة البناء بعد كل تعديل على config.js
2. **يجب** إعادة تشغيل السيرفر بعد البناء
3. الملف الصحيح للتعديل: `/client/public/config.js` (المصدر)
4. لا تعدل `/dist/public/config.js` لأنه يتم استبداله عند البناء

## 🌐 رابط الموقع
https://5000-iw0zsqhuu5aweemqn0fnk-89fa67a6.sg1.manus.computer

## 🔍 التحقق من الإعدادات الحالية
```bash
cat /home/ubuntu/newsalamat/client/public/config.js
```

## 📊 حالة السيرفر
```bash
# فحص إذا كان السيرفر يعمل
ps aux | grep "node dist" | grep -v grep

# عرض سجلات السيرفر
tail -f /tmp/newsalamat.log
```
