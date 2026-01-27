# تعليمات تغيير رابط حجز الموعد
# Booking URL Configuration Instructions

## العربية

### لتوجيه زر "حجز موعد" إلى رابط خارجي:

1. افتح ملف `.env` في المجلد الرئيسي للمشروع
2. ابحث عن السطر: `VITE_EXTERNAL_BOOKING_URL=`
3. أضف الرابط الخارجي بعد علامة `=`
   
   مثال:
   ```
   VITE_EXTERNAL_BOOKING_URL=https://example.com/booking
   ```

4. احفظ الملف
5. أعد بناء المشروع بتشغيل الأمر:
   ```bash
   pnpm build
   ```
6. أعد تشغيل الخادم

### للعودة إلى النموذج الداخلي:

1. افتح ملف `.env`
2. احذف الرابط واترك السطر فارغاً:
   ```
   VITE_EXTERNAL_BOOKING_URL=
   ```
3. أو احذف السطر بالكامل
4. احفظ الملف
5. أعد بناء المشروع وتشغيله

---

## English

### To redirect "Book Appointment" button to an external URL:

1. Open the `.env` file in the project root directory
2. Find the line: `VITE_EXTERNAL_BOOKING_URL=`
3. Add your external URL after the `=` sign
   
   Example:
   ```
   VITE_EXTERNAL_BOOKING_URL=https://example.com/booking
   ```

4. Save the file
5. Rebuild the project by running:
   ```bash
   pnpm build
   ```
6. Restart the server

### To return to the internal form:

1. Open the `.env` file
2. Delete the URL and leave the line empty:
   ```
   VITE_EXTERNAL_BOOKING_URL=
   ```
3. Or delete the entire line
4. Save the file
5. Rebuild and restart the project

---

## ملاحظات مهمة / Important Notes

- **يجب إعادة بناء المشروع** بعد أي تغيير في ملف `.env`
- **Must rebuild the project** after any change to the `.env` file

- الرابط الخارجي سيفتح في نافذة جديدة
- External URL will open in a new window

- إذا كان الحقل فارغاً، سيعمل النموذج الداخلي
- If the field is empty, the internal form will work
