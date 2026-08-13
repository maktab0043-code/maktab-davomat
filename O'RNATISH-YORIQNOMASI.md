# Maktab davomat ilovalari — o'rnatish yo'riqnomasi

Bu paketda 2 ta ilova bor:
- **director-ilova.html** — direktor uchun
- **oqituvchi-ilova.html** — o'qituvchilar uchun

Ikkalasi ham bitta umumiy bulutli bazaga ulanadi, shuning uchun o'qituvchi QR skanerlaganda ma'lumot **darhol** direktor ilovasida ko'rinadi.

Butun jarayon bir marta, ~15–20 daqiqa vaqt oladi. Buni direktor o'zi yoki texnikadan tushunadigan birov qilib bersa bo'ladi. Shundan keyin o'qituvchilar hech qanday sozlash bilan shug'ullanmaydi — faqat havolani ochib, ekranga qo'shib qo'yishadi.

---

## 1-qadam: Bepul Firebase loyihasi yaratish (ma'lumotlar bazasi)

1. https://console.firebase.google.com ga o'ting va Google hisobingiz bilan kiring.
2. **"Add project" / "Loyiha qo'shish"** tugmasini bosing.
3. Loyihaga nom bering, masalan `maktab-davomat`. Google Analytics so'ralsa — kerak emas, o'chirib qo'yavering.
4. Loyiha yaratilgach, chap menyudan **Build → Firestore Database** ni oching.
5. **"Create database"** tugmasini bosing, joylashuv sifatida `eur3` yoki eng yaqinini tanlang.
6. Xavfsizlik qoidalarini so'raganda — boshlanishda **"test mode" / "test rejimi"**ni tanlang (bu vaqtinchalik, hammaga ochiq yozish huquqi beradi — kichik maktab ilovasi uchun yetarli, lekin xohlasangiz keyinroq qattiqlashtirish mumkin, pastdagi eslatmaga qarang).

## 2-qadam: Veb-ilova konfiguratsiyasini olish

1. Loyiha sozlamalariga o'ting: chap yuqoridagi ⚙️ belgi → **Project settings**.
2. Pastga tushing, **"Your apps"** bo'limida `</>` (Web) belgisini bosing.
3. Ilovaga nom bering (masalan `maktab-app`) va **"Register app"** ni bosing. Hosting kerak emas.
4. Sizga shunga o'xshash kod ko'rsatiladi:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "maktab-davomat.firebaseapp.com",
  projectId: "maktab-davomat",
  storageBucket: "maktab-davomat.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

5. Shu qiymatlarni nusxalab oling.

## 3-qadam: Qiymatlarni ikkala HTML faylga joylashtirish

Har ikkala faylda (**director-ilova.html** va **oqituvchi-ilova.html**) matn muharriri (Notepad, VS Code va h.k.) bilan oching va `firebaseConfig` deb boshlanadigan qismni toping:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  ...
};
```

Shu joyni 2-qadamda olgan **o'zingiznikiga** almashtiring. **Diqqat: ikkala faylda ham bir xil qiymatlar bo'lishi shart** — aks holda direktor va o'qituvchi ilovalari bir-birini "ko'rmaydi".

## 4-qadam: Fayllarni bepul hostingga joylashtirish

Ilova telefonda ochilishi va "Bosh ekranga qo'shish" ishlashi uchun fayllar internetda (https havolada) turishi kerak. Eng oson bepul yo'l — **GitHub Pages**:

1. https://github.com da bepul hisob oching (agar yo'q bo'lsa).
2. Yangi repository (ombor) yarating, nomi masalan `maktab-davomat`, **Public** qilib.
3. Ushbu paketdagi **barcha fayllarni** (2 ta .html, 2 ta .json, 2 ta -sw.js, barcha .png) shu omborga yuklang ("Add file → Upload files").
4. Repository **Settings → Pages** bo'limiga o'ting, "Branch" ni `main` qilib saqlang.
5. Bir necha daqiqadan so'ng sizga shunga o'xshash havolalar ishlaydi:
   - Direktor: `https://FOYDALANUVCHI-NOMI.github.io/maktab-davomat/director-ilova.html`
   - O'qituvchi: `https://FOYDALANUVCHI-NOMI.github.io/maktab-davomat/oqituvchi-ilova.html`

*(Netlify yoki Vercel orqali ham xuddi shunday bepul joylashtirish mumkin — qaysi birini bilsangiz, o'shanidan foydalaning.)*

## 5-qadam: Telefonlarga "ilova" sifatida o'rnatish

**Direktor:**
1. Yuqoridagi direktor havolasini telefon brauzerida (Chrome/Safari) oching.
2. Sozlamalar bo'limida maktab joylashuvini, xodimlar ro'yxatini va (xohlasa) Telegram bot ma'lumotlarini kiritadi, doimiy QR kodni yaratadi.
3. Brauzer menyusidan **"Bosh ekranga qo'shish" / "Add to Home Screen"** ni bosadi — endi ekranda oddiy ilova belgisi paydo bo'ladi, brauzer paneli ko'rinmaydi.

**O'qituvchilar:**
1. O'qituvchi havolasini (masalan Telegram guruhga tashlab) ularga yuboring.
2. Har bir o'qituvchi havolani bir marta ochadi va **"Bosh ekranga qo'shish"** ni bosadi.
3. Shundan keyin ular hech qachon havolani qayta kiritishmaydi — doim tayyor ilova belgisini bosishadi.

## Telegramga avtomatik yuborish uchun bot yaratish

1. Telegramda **@BotFather** ga yozing → `/newbot` → nom bering → sizga bot tokeni beriladi.
2. Botni xabar yubormoqchi bo'lgan guruhingizga a'zo qilib qo'shing va **admin** qiling.
3. Guruh Chat ID sini olish uchun botga guruhda biror xabar yozdiring, so'ng brauzerda quyidagini oching:
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
   Natijada `"chat":{"id": -100...}` ko'rinadi — shu raqam Chat ID.
4. Direktor ilovasidagi Sozlamalar bo'limiga bot tokeni va Chat ID ni kiriting.

## Xavfsizlik haqida eslatma

2-qadamda tanlangan "test mode" — bazaga istalgan kishi yozishi mumkin degani (agar ilova havolasini va Firebase manzilini bilsa). Kichik maktab loyihasi uchun bu odatda muammo emas, lekin xohlasangiz, Firestore xavfsizlik qoidalarini keyinroq qattiqlashtirish mumkin (masalan, faqat ma'lum domendan yozishga ruxsat berish). Bu qo'shimcha texnik sozlash bo'lib, kerak bo'lsa alohida so'rang — yordam beraman.

## Nima uchun bunday qilingan?

Ilovalar to'liq mahalliy (faqat telefon ichida) ishlasa, direktor va o'qituvchi qurilmalari bir-biri bilan gaplasha olmaydi — chunki ular jismonan boshqa-boshqa telefonlar. Shu sababli ma'lumotlar internet orqali umumiy joyga (Firebase) yozib boriladi, va har ikkala ilova o'sha umumiy joydan o'qiydi. Bu — WhatsApp yoki istalgan boshqa ko'p qurilmali ilova ham xuddi shunday ishlaydi.
