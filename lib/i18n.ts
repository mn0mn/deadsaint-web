export const LOCALES = ["en", "fa"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "deadsaint-locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fa";
}

export const messages = {
  en: {
    nav: { shop: "Shop", manifesto: "Manifesto", contact: "Contact", login: "Login", cart: "Cart", account: "Account", language: "فارسی" },
    home: {
      kicker1: "FILE NO. DS-000000", kicker2: "EST. IN A GARAGE", stamp1: "SMALL BATCH", stamp2: "HANDMADE",
      intro: "Punk and metal fashion built like a battle jacket.", cta: "Shop the drop", tape1: "NO RESTOCKS", tape2: "SMALL BATCH", tape3: "BUILT FOR THE PIT",
      quote: "We don't design trends.", quote2: "We design battle scars.", manifesto: "Read the manifesto ↗", featured: "Fresh off the press"
    },
    shop: {
      title: "Shop", categories: "Shop categories", apparel: "Apparel", accessories: "Accessories", objects: "Objects",
      tshirts: "T-Shirts", longSleeves: "Long Sleeves", hoodies: "Hoodies", crewnecks: "Crewnecks", zipHoodies: "Zip Hoodies", jackets: "Jackets", vests: "Vests", pants: "Pants", shorts: "Shorts",
      caps: "Caps", beanies: "Beanies", jewelry: "Jewelry", chains: "Chains", belts: "Belts", bags: "Bags", totes: "Totes", patches: "Patches", pins: "Pins", badges: "Badges",
      posters: "Posters", artPrints: "Art Prints", zines: "Zines", limitedObjects: "Limited Objects", misc: "Misc"
    },
    cart: {
      loading: "LOADING YOUR HAUL", emptyEyebrow: "DEADSAINT / CART", nothing: "NOTHING", here: "HERE.", emptyText: "Your cart is currently deceased.", emptyText2: "Find something worth bringing back.", enterShop: "ENTER THE SHOP",
      shoppingCart: "DEADSAINT / SHOPPING CART", haul: "YOUR", haul2: "HAUL.", pieces: "PIECES", drop: "DEADSAINT / DROP", decrease: "Decrease quantity", increase: "Increase quantity", remove: "REMOVE", damage: "THE DAMAGE", subtotal: "SUBTOTAL", shipping: "SHIPPING", tax: "TAX", calculated: "CALCULATED AT CHECKOUT", checkout: "PROCEED TO CHECKOUT", continue: "← CONTINUE SHOPPING", warning: "ITEMS ARE NOT RESERVED UNTIL", warning2: "CHECKOUT IS COMPLETED."
    },
    about: {
      eyebrow: "// The Manifesto //", hero1: "We don't design trends.", hero2: "We design battle scars.",
      p1: "Deadsaint started in a garage with a screen press and a stack of old band tees nobody else wanted. No investors, no business plan, just a spray bottle of bleach, a stack of stencils, and too much time spent at shows watching people patch their jackets by hand.",
      p2: "Every patch, pin, and piece we put out is built for people who wear their scene on their sleeve, literally. No fast fashion. No throwaway drops. Just gear that survives the pit and looks better for it.",
      cta: "Shop the drop", patch1: "Sworn to", patch2: "Loud", code: "The Code",
      code1Title: "Small batch, no restocks", code1Body: "When it's gone, it's gone. We'd rather sell out than flood landfills with leftover stock nobody wanted.",
      code2Title: "Built to survive the pit", code2Body: "Heavyweight fabric, reinforced seams, patch-ready panels. If it can't take a beating, it doesn't ship.",
      code3Title: "DIY, not corporate", code3Body: "No focus groups. No trend chasing. Just people who live in this scene making gear for people who live in it too."
    },
    contact: {
      eyebrow: "THE DEADSAINT HOTLINE™", title: "TALK TO\nTHE DEAD.", intro1: "Got a question? Complaint? Love letter? Existential crisis?", intro2: "Send it our way. We're listening. Mostly.",
      tape1: "NO CORPORATE ROBOTS", tape2: "REAL HUMANS (ALLEGEDLY)", tape3: "EST. SOMEWHERE IN THE UNDERWORLD",
      emailLabel: "01 / EMAIL THE DEAD", emailTitle: "Got something to say?", emailBody: "Orders, sizing, collaborations, wholesale, existential complaints, or anything else that survived the night.",
      serviceLabel: "02 / CUSTOMER SERVICE DEPARTMENT", hours: "HOURS", awake: "WHEN WE'RE AWAKE", response: "RESPONSE TIME", eternity: "1–3 BUSINESS ETERNITIES", emergency: "EMERGENCY", buyShirt: "BUY ANOTHER SHIRT",
      socialLabel: "03 / SOCIAL DISTORTION", socialTitle: "Find us in the wild.", findLabel: "04 / COME FIND US", hq: "THE DEAD HQ", mapTitle: "DeadSaint location map", mapNote: "Coordinates are currently classified. Replace the lat/lng above when Dead HQ is ready to be discovered.",
      before: "BEFORE YOU SUMMON US", beforeBody: "Check your order email before blaming the spirits. If your parcel is genuinely lost, we'll help you hunt it down.", bottom1: "DEADSAINT / NO REFUNDS ON BAD ATTITUDES", bottom2: "☠ KEEP THE DEAD ALIVE ☠"
    },
    account: {
      loading: "LOADING YOUR DEAD FILE...", unknown: "UNKNOWN", unknownSubject: "UNKNOWN SUBJECT", file: "FILE NO.", classified: "CLASSIFIED / CUSTOMER", eyebrow: "THE DEAD FILE", title1: "YOUR", title2: "RECORD.", status: "STATUS", alive: "ALIVE-ish", subject: "SUBJECT", subjectName: "SUBJECT NAME", memberSince: "MEMBER SINCE", orders: "ORDERS", active: "ACTIVE", editProfile: "EDIT PROFILE ↗", logout: "LOG OUT ↗", sections: "Account sections",
      recent: "RECENT ACTIVITY", secrets: "NO SECRETS. PROBABLY.", retrieving: "RETRIEVING YOUR RECORDS...", unable: "UNABLE TO RETRIEVE ORDER RECORDS.", noOrders: "NO ORDERS IN THE FILE YET.", enterShop: "ENTER THE SHOP ↗", order: "ORDER", date: "DATE", item: "ITEM", total: "TOTAL", processing: "PROCESSING", orderContents: "ORDER CONTENTS", yourDetails: "YOUR DETAILS", identity: "IDENTITY", membership: "MEMBERSHIP", memberSinceText: "Member since:", ordersPlaced: "Orders placed:", accountStatus: "Account status:", editDetails: "EDIT DETAILS ↗", whereToSend: "WHERE TO SEND THE DEAD", noAddresses: "NO SAVED ADDRESSES YET.", addAddress: "+ ADD ADDRESS", settings: "SETTINGS", newsletter: "NEWSLETTER", newsletterBody: "Receive DeadSaint transmissions.", orderUpdates: "ORDER UPDATES", orderUpdatesBody: "Get notified when your package moves.", deleteAccount: "DELETE ACCOUNT", deleteBody: "This one is permanent. Obviously.", delete: "DELETE ↗", footer1: "THIS FILE IS PROPERTY OF DEADSAINT.", footer2: "HANDLE WITH QUESTIONABLE CARE."
    },
    product: {
      kicker: "DEAD SAINT / ARTIFACT", openGallery: "Open image gallery", viewImage: "View image", productImages: "Product images", chooseImage: "Choose product image", expand: "CLICK TO EXPAND", variation: "SELECT VARIATION", defaultVariant: "Default", adding: "ADDING...", add: "ADD TO CART", soldOut: "SOLD OUT", shipping: "FREE SHIPPING ON ORDERS OVER €100", livingDead: "MADE FOR THE LIVING DEAD", closeGallery: "Close image gallery", previous: "Previous image", next: "Next image"
    },
    notFound: { text: "That page doesn't exist.", home: "Back home" },
    footer: "Built to be worn out."
  },
  fa: {
    nav: { shop: "فروشگاه", manifesto: "مانیفست", contact: "تماس", login: "ورود", cart: "سبد خرید", account: "حساب کاربری", language: "EN" },
    home: {
      kicker1: "پرونده شماره DS-000000", kicker2: "تأسیس‌شده در یک گاراژ", stamp1: "تولید محدود", stamp2: "دست‌ساز",
      intro: "پوشاک پانک و متال، ساخته‌شده مثل یک کت جنگی.", cta: "مشاهده دراپ", tape1: "شارژ مجدد نداریم", tape2: "تولید محدود", tape3: "ساخته‌شده برای پیت",
      quote: "ما ترند طراحی نمی‌کنیم.", quote2: "ما جای زخم طراحی می‌کنیم.", manifesto: "خواندن مانیفست ↗", featured: "تازه از زیر چاپ"
    },
    shop: {
      title: "فروشگاه", categories: "دسته‌بندی‌ها", apparel: "پوشاک", accessories: "اکسسوری", objects: "اشیا",
      tshirts: "تیشرت", longSleeves: "آستین‌بلند", hoodies: "هودی", crewnecks: "سویشرت", zipHoodies: "هودی زیپ‌دار", jackets: "کت", vests: "جلیقه", pants: "شلوار", shorts: "شلوارک",
      caps: "کپ", beanies: "کلاه بافت", jewelry: "زیورآلات", chains: "زنجیر", belts: "کمربند", bags: "کیف", totes: "توت‌بگ", patches: "پچ", pins: "پین", badges: "بج",
      posters: "پوستر", artPrints: "چاپ هنری", zines: "زین", limitedObjects: "اشیای محدود", misc: "متفرقه"
    },
    cart: {
      loading: "در حال بارگذاری خریدها", emptyEyebrow: "ددسینت / سبد خرید", nothing: "هیچی", here: "اینجا نیست.", emptyText: "سبد خریدت فعلاً مرده است.", emptyText2: "چیزی پیدا کن که ارزش برگرداندن داشته باشد.", enterShop: "ورود به فروشگاه",
      shoppingCart: "ددسینت / سبد خرید", haul: "خرید", haul2: "تو.", pieces: "تعداد", drop: "ددسینت / دراپ", decrease: "کم کردن تعداد", increase: "زیاد کردن تعداد", remove: "حذف", damage: "حساب نهایی", subtotal: "جمع جزء", shipping: "ارسال", tax: "مالیات", calculated: "در مرحله پرداخت محاسبه می‌شود", checkout: "ادامه به پرداخت", continue: "← ادامه خرید", warning: "اقلام تا زمانی که", warning2: "پرداخت کامل نشود رزرو نیستند."
    },
    about: {
      eyebrow: "// مانیفست //", hero1: "ما ترند طراحی نمی‌کنیم.", hero2: "ما جای زخم طراحی می‌کنیم.",
      p1: "ددسینت در یک گاراژ با یک دستگاه چاپ سیلک و یک دسته تیشرت قدیمی گروه‌ها شروع شد که دیگر کسی نمی‌خواستشان. نه سرمایه‌گذار، نه بیزنس‌پلن؛ فقط یک بطری اسپری وایتکس، چند شابلون و زمان زیادی که در کنسرت‌ها صرف تماشای وصله‌دوزی دستی کت‌ها می‌شد.",
      p2: "هر پچ، پین و تکه‌ای که بیرون می‌دهیم برای آدم‌هایی ساخته شده که صحنه را روی آستینشان می‌پوشند، واقعاً. نه فست‌فشن، نه دراپ‌های یک‌بارمصرف. فقط تجهیزاتی که از پیت جان سالم به در می‌برند و با گذشت زمان بهتر به نظر می‌رسند.",
      cta: "مشاهده دراپ", patch1: "سوگند به", patch2: "بلند بودن", code: "قانون ما",
      code1Title: "تولید محدود، بدون شارژ مجدد", code1Body: "وقتی تمام شد، تمام شده. ترجیح می‌دهیم فروشمان تمام شود تا محل دفن زباله را با موجودی اضافه‌ای که کسی نمی‌خواست پر کنیم.",
      code2Title: "ساخته‌شده برای دوام در پیت", code2Body: "پارچه سنگین، درزهای تقویت‌شده و پنل‌های آماده پچ. اگر نتواند کتک بخورد، ارسال هم نمی‌شود.",
      code3Title: "DIY، نه شرکتی", code3Body: "نه گروه تمرکز، نه دنبال‌کردن ترند. فقط آدم‌هایی که در این صحنه زندگی می‌کنند و برای آدم‌هایی مثل خودشان تجهیزات می‌سازند."
    },
    contact: {
      eyebrow: "خط داغ DEADSAINT™", title: "با\nمرده‌ها حرف بزن.", intro1: "سؤالی داری؟ شکایتی؟ نامه عاشقانه؟ بحران وجودی؟", intro2: "بفرستش سمت ما. گوش می‌دهیم. بیشتر مواقع.",
      tape1: "ربات شرکتی نداریم", tape2: "آدم‌های واقعی (احتمالاً)", tape3: "تأسیس‌شده جایی در دنیای زیرین",
      emailLabel: "۰۱ / ایمیل به مرده‌ها", emailTitle: "حرفی داری؟", emailBody: "سفارش، سایزبندی، همکاری، عمده‌فروشی، شکایت‌های وجودی یا هر چیزی که از شب جان سالم به در برده.",
      serviceLabel: "۰۲ / بخش خدمات مشتریان", hours: "ساعات کاری", awake: "وقتی بیداریم", response: "زمان پاسخ", eternity: "۱–۳ ابدیت کاری", emergency: "اورژانس", buyShirt: "یک تیشرت دیگر بخر",
      socialLabel: "۰۳ / اعوجاج اجتماعی", socialTitle: "ما را در دنیای واقعی پیدا کن.", findLabel: "۰۴ / بیا پیدایمان کن", hq: "ستاد مرده‌ها", mapTitle: "نقشه موقعیت DeadSaint", mapNote: "مختصات فعلاً محرمانه است. وقتی ستاد مرده‌ها آماده کشف شد، طول و عرض جغرافیایی بالا را جایگزین کن.",
      before: "قبل از احضار ما", beforeBody: "قبل از سرزنش ارواح، ایمیل سفارشت را چک کن. اگر بسته واقعاً گم شده باشد، کمک می‌کنیم پیدایش کنی.", bottom1: "ددسینت / بازگشت وجه بابت نگرش بد نداریم", bottom2: "☠ مرده‌ها را زنده نگه دار ☠"
    },
    account: {
      loading: "در حال بارگذاری پرونده مرده‌ات...", unknown: "نامعلوم", unknownSubject: "سوژه نامعلوم", file: "پرونده شماره", classified: "محرمانه / مشتری", eyebrow: "پرونده مرده", title1: "پرونده", title2: "تو.", status: "وضعیت", alive: "نسبتاً زنده", subject: "سوژه", subjectName: "نام سوژه", memberSince: "عضویت از", orders: "سفارش‌ها", active: "فعال", editProfile: "ویرایش پروفایل ↗", logout: "خروج ↗", sections: "بخش‌های حساب",
      recent: "فعالیت اخیر", secrets: "هیچ رازی نیست. احتمالاً.", retrieving: "در حال دریافت سوابق...", unable: "دریافت سوابق سفارش‌ها ممکن نیست.", noOrders: "هنوز سفارشی در پرونده نیست.", enterShop: "ورود به فروشگاه ↗", order: "سفارش", date: "تاریخ", item: "آیتم", total: "مجموع", processing: "در حال پردازش", orderContents: "محتویات سفارش", yourDetails: "اطلاعات تو", identity: "هویت", membership: "عضویت", memberSinceText: "عضویت از:", ordersPlaced: "سفارش‌های ثبت‌شده:", accountStatus: "وضعیت حساب:", editDetails: "ویرایش اطلاعات ↗", whereToSend: "مقصد ارسال", noAddresses: "هنوز آدرس ذخیره‌شده‌ای نیست.", addAddress: "+ افزودن آدرس", settings: "تنظیمات", newsletter: "خبرنامه", newsletterBody: "پیام‌های DeadSaint را دریافت کن.", orderUpdates: "به‌روزرسانی سفارش", orderUpdatesBody: "وقتی بسته‌ات حرکت کرد باخبر شو.", deleteAccount: "حذف حساب", deleteBody: "این یکی دائمی است. مشخصاً.", delete: "حذف ↗", footer1: "این پرونده متعلق به DEADSAINT است.", footer2: "با مراقبت مشکوک جابه‌جا شود."
    },
    product: {
      kicker: "ددسینت / آرتیفکت", openGallery: "باز کردن گالری تصاویر", viewImage: "مشاهده تصویر", productImages: "تصاویر محصول", chooseImage: "انتخاب تصویر محصول", expand: "برای بزرگ‌نمایی کلیک کن", variation: "انتخاب مدل", defaultVariant: "پیش‌فرض", adding: "در حال افزودن...", add: "افزودن به سبد", soldOut: "ناموجود", shipping: "ارسال رایگان برای سفارش‌های بالای €۱۰۰", livingDead: "ساخته‌شده برای مرده‌های زنده", closeGallery: "بستن گالری", previous: "تصویر قبلی", next: "تصویر بعدی"
    },
    notFound: { text: "این صفحه وجود ندارد.", home: "بازگشت به خانه" },
    footer: "ساخته شده برای پوشیده و فرسوده شدن."
  }
} as const;

export type Messages = typeof messages.en;

export function getMessages(locale: Locale): Messages {
  return messages[locale] as Messages;
}
