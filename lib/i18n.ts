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
    footer: "ساخته شده برای پوشیده و فرسوده شدن."
  }
} as const;

export type Messages = typeof messages.en;

export function getMessages(locale: Locale): Messages {
  return messages[locale] as Messages;
}
