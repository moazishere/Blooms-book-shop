/* ==========================================================
   Blooms — English / Arabic
   Static copy: English lives in index.html. Elements opt in with
     data-i18n="key"            → text
     data-i18n-html="key"       → markup
     data-i18n-attr="attr:key"  → attributes (comma separated)
   and only the Arabic is listed in `ar` below.
   Dynamic copy (built by script.js) has both languages in `ui`.
   ========================================================== */
(() => {
  const STACK = `<svg class="book-stack" viewBox="0 0 40 30" aria-hidden="true"><rect x="3" y="21" width="32" height="7" rx="1.5" fill="#86C3D6" /><rect x="3" y="23.2" width="32" height="1.6" fill="#fff" opacity=".7" /><rect x="6" y="13.5" width="29" height="7" rx="1.5" fill="#F2A86B" transform="rotate(-4 20 17)" /><rect x="6" y="15.7" width="29" height="1.6" fill="#fff" opacity=".7" transform="rotate(-4 20 17)" /><rect x="4" y="6" width="28" height="7" rx="1.5" fill="#86B97C" transform="rotate(3 18 9)" /><rect x="4" y="8.2" width="28" height="1.6" fill="#fff" opacity=".7" transform="rotate(3 18 9)" /></svg>`;

  const ar = {
    "meta.title": "بلومز — حيث يلتقي عشّاق الكتب ويقتنون كتبهم",
    "meta.description": "مكتبة بلومز: اكتشف الكتب، واحضر فعاليات الكتّاب، واقتنِ قراءتك المفضّلة التالية.",
    "skip": "انتقل إلى المحتوى",
    "logo.home": "مكتبة بلومز — الصفحة الرئيسية",

    "nav.aria": "القائمة الرئيسية",
    "nav.home": "الرئيسية",
    "nav.community": "المجتمع",
    "nav.clubs": "نوادي القراءة",
    "nav.events": "فعاليات الكتّاب",
    "nav.reviews": "آراء القرّاء",
    "nav.category": "التصنيفات",
    "nav.about": "من نحن",

    "search.placeholder": "ابحث بعنوان الكتاب أو اسم المؤلف",
    "search.filters": "عوامل التصفية",
    "filter.format": "نوع الغلاف",
    "filter.all": "الكل",
    "filter.paperback": "غلاف ورقي",
    "filter.hardcover": "غلاف مقوّى",
    "filter.sort": "ترتيب حسب",
    "sort.featured": "المختارة",
    "sort.price": "السعر: من الأقل إلى الأعلى",
    "sort.rating": "الأعلى تقييمًا",
    "sort.new": "الأحدث",
    "login": "تسجيل الدخول",

    "hero.eyebrow": "رفّ كتبك يتّسع...",
    "hero.title": `<span class="script">بلومز</span> — حيث يلتقي عشّاق الكتب ${STACK} <span class="script">ليتواصلوا</span> و<span class="script">يقتنوا</span>`,
    "hero.text": "اكتشف سحر الكتب الاستثنائي، وكوِّن مجتمعًا من القرّاء، واقتنِ كل ما يهواه قلبك. قصّتك المفضّلة التالية على بُعد نقرة واحدة.",
    "hero.cta": "ابدأ الآن",
    "hero.collage": "كتب مختارة",

    "trending.title": "الأكثر رواجًا هذا الأسبوع",
    "more.all": "عرض الكل",
    "carousel.prev": "الكتب السابقة",
    "carousel.next": "الكتب التالية",
    "carousel.track": "الكتب الرائجة",

    "botm.kicker": "كتاب شهر أكتوبر",
    "botm.cover": "نظرة سريعة: James",
    "botm.badge": "جائزة<b>بوليتزر</b>2025",
    "botm.text": "أنت تعرف هذا النهر، وتعرف هاك، لكنك لم تسمع جيم هكذا من قبل. يسلّم إيفريت الطوف للرجل الذي كان على متنه دائمًا، فتأتي النتيجة ماكرة وموجعة ومضحكة حقًا — كتاب وضعه فريقنا كلّه بين أيدي الزبائن هذا العام.",
    "botm.facts": "<li><strong>جائزة بوليتزر</strong> للرواية، 2025</li><li><strong>جائزة الكتاب الوطني</strong> للرواية، 2024</li><li><strong>غلاف مقوّى</strong>، 320 صفحة</li>",
    "botm.club": "ناقشه مع نادي روايات الخميس",
    "btn.addCart": "أضف إلى السلة",

    "cat.title": "التصنيفات الشائعة",
    "more.browseAll": "تصفّح الكل",
    "browse.title": "تصفّح الرفوف",
    "browse.tabs": "التصفية حسب النوع",
    "browse.empty": "لا توجد كتب تطابق «<span id=\"emptyQuery\"></span>».",
    "browse.clear": "امسح البحث وعوامل التصفية",

    "clubs.title": "نوادي القراءة",
    "clubs.note": "الانضمام مجاني. نلتقي في المكتبة أو عبر الإنترنت.",
    "clubs.readingNow": "نقرأ الآن",
    "clubs.members": "عضوًا",
    "club1.alt": "قرّاء حول طاولة وأمامهم كتب مفتوحة",
    "club1.name": "نادي روايات الخميس",
    "club1.desc": "أدب روائي، كتاب واحد كل شهر، ونقاشات طويلة حول النهايات. أول خميس من كل شهر، 7 مساءً.",
    "club2.alt": "ثلاثة أصدقاء على أريكة يضحكون حول كتاب",
    "club2.name": "جمعية الهيام",
    "club2.desc": "روايات رومانسية وكوميدية، والوجبات الخفيفة إلزامية. ظهر يوم أحد كل أسبوعين في غرفة القراءة.",
    "club3.alt": "سيدتان تقرآن في مقعدين وثيرين",
    "club3.name": "حلقة الصفحات الذهبية",
    "club3.desc": "نادٍ بإيقاع أهدأ مع نسخ بخط كبير متوفّرة. صباح كل ثلاثاء، مع الشاي والبسكويت.",

    "events.title": "الفعاليات القادمة",
    "events.alt": "كاتب يوقّع نسخة من كتابه لأحد القرّاء",
    "month.oct": "أكتوبر",
    "ev1.title": "أمسية القراءة الصامتة",
    "ev1.text": "أحضر أي كتاب تقرؤه. ساعة من الهدوء، ثم مشروبات وأحاديث. الخميس، 7:00 مساءً",
    "ev2.title": "لقاء توقيع مع كتّاب في أعمالهم الأولى",
    "ev2.text": "خمسة روائيين من المنطقة يصدرون روايتهم الأولى، يقرؤون ويتحاورون ويوقّعون. السبت، 2:00 ظهرًا",
    "ev3.title": "<i>James</i> — نقاش مفتوح",
    "ev3.text": "كتاب الشهر لدينا، يناقشه كل من يرغب في المشاركة. خصم 15% على النسخ في تلك الليلة. الأربعاء، 6:30 مساءً",
    "ev4.title": "حكايات مخيفة على ضوء الشموع",
    "ev4.text": "قصص أشباح تُقرأ بصوت عالٍ للكبار. الأزياء التنكّرية مرحّب بها وليست إلزامية. السبت، 8:00 مساءً",

    "reviews.title": "ماذا يقول القرّاء",
    "rev1.qv": "نظرة سريعة: Project Hail Mary",
    "rev1.quote": "بصراحة اشتريتو لأنو بسّة المكتبة كانت نايمة فوق الكتب وما قدرت قاوم. خلّصتو بيومين، وآخر شي بكيت على مخلوق فضائي، إي والله! ما ندمانة أبدًا.",
    "rev1.cap": "<b>راما ك.</b> عن <i>Project Hail Mary</i>",
    "rev2.qv": "نظرة سريعة: Braiding Sweetgrass",
    "rev2.quote": "نصحني فيه الشب يلي بالمحل، وما توقعت يعجبني هالقد. غيّرلي نظرتي لكل شي حواليّ، حتى لجنينة البيت. من وقتها اشتريت منو أربع نسخ وهديتهن لرفقاتي.",
    "rev2.cap": "<b>عمر ح.</b> عن <i>Braiding Sweetgrass</i>",
    "rev3.qv": "نظرة سريعة: The Thursday Murder Club",
    "rev3.quote": "قريناه أنا وصاحباتي سوا، وصرنا نعمل حالنا محققين بالحارة. بس لهلّق أكبر لغز حلّيناه مين عم ياخد جريدة الجيران كل يوم الصبح.",
    "rev3.cap": "<b>هالة س.</b> عن <i>The Thursday Murder Club</i>",

    "visit.altMain": "داخل مكتبة مضيئة برفوف عالية ونافذة مقوّسة",
    "visit.altInset": "ركن قراءة دافئ تحيط به رفوف الكتب",
    "visit.title": "تعال وتصفّح بنفسك",
    "visit.text": "بدأت بلومز متجرًا على الإنترنت، واليوم صار لدينا متجرنا الخاص في الشعلان، مليء بالكتب الجديدة والمستعملة، مع ركن قراءة دافئ، وفريق يسعده أن يحدّثك مطوّلًا عمّا ستقرؤه بعد ذلك.",
    "hours.week": "الاثنين – الجمعة",
    "hours.weekTime": "9:00 ص – 8:00 م",
    "hours.sat": "السبت",
    "hours.satTime": "10:00 ص – 9:00 م",
    "hours.sun": "الأحد",
    "hours.sunTime": "11:00 ص – 6:00 م",
    "visit.street": "الشعلان، دمشق، سوريا",

    "footer.blurb": "إصدارات جديدة، واختيارات فريقنا، ودعوات للفعاليات — رسالة واحدة في الأسبوع، لا أكثر.",
    "footer.email": "بريدك الإلكتروني",
    "footer.subscribe": "اشترك",
    "footer.shop": "المتجر",
    "footer.trending": "الأكثر رواجًا",
    "footer.allBooks": "جميع الكتب",
    "footer.categories": "التصنيفات",
    "footer.gift": "بطاقات الهدايا",
    "footer.community": "المجتمع",
    "footer.help": "المساعدة",
    "footer.shipping": "الشحن والإرجاع",
    "footer.faq": "الأسئلة الشائعة",
    "footer.contact": "تواصل معنا",
    "footer.rights": "بلومز. جميع الحقوق محفوظة.",
    "footer.credits": "الأغلفة من <a href=\"https://openlibrary.org\" rel=\"noopener\">Open Library</a> · الصور من <a href=\"https://unsplash.com\" rel=\"noopener\">Unsplash</a>",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",

    "cart.title": "سلّتك",
    "cart.close": "إغلاق السلة",
    "cart.empty": "سلّتك فارغة.",
    "cart.browse": "ابحث عن كتاب تقرؤه",
    "cart.subtotal": "المجموع الفرعي",
    "cart.checkout": "إتمام الشراء",
    "qv.close": "إغلاق",
  };

  const ui = {
    en: {
      addCart: "Add To Cart",
      added: "Added ✓",
      quickView: "Quick view: {title}",
      addAria: "Add {title} to cart",
      inStock: "{n} titles in stock",
      allBooks: "All books",
      bookCount: "{n} books",
      bookCountOne: "1 book",
      showAll: "Show all {n} books",
      openCart: "Open cart",
      openCartN: "Open cart, {n} items",
      openCartOne: "Open cart, 1 item",
      qtyFor: "Quantity for {title}",
      qtyDown: "Decrease quantity",
      qtyUp: "Increase quantity",
      remove: "Remove",
      shipAway: "You're <b>{amount}</b> away from free shipping.",
      shipFree: "You've unlocked <b>free shipping</b>.",
      toastAdded: "“{title}” added to your cart",
      toastRemoved: "Removed “{title}”",
      toastCheckout: "Checkout isn't connected yet — your cart is saved on this device.",
      toastSubscribed: "Subscribed. Look out for Thursday's email.",
      by: "by {author}",
      meta: "{format}, {pages} pages, published {year}",
      join: "Join club",
      joined: "Joined",
      toastJoined: "You've joined the {name}. See you there!",
      rsvp: "RSVP",
      going: "Going",
      toastGoing: "You're going to {name} on {date}.",
      toastCancel: "RSVP cancelled for {name}.",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      langLabel: "العربية",
      langAria: "عرض الموقع باللغة العربية",
    },
    ar: {
      addCart: "أضف إلى السلة",
      added: "أُضيف ✓",
      quickView: "نظرة سريعة: {title}",
      addAria: "أضف {title} إلى السلة",
      inStock: "العناوين المتوفّرة: {n}",
      allBooks: "كل الكتب",
      bookCount: "عدد الكتب: {n}",
      bookCountOne: "كتاب واحد",
      showAll: "اعرض جميع الكتب ({n})",
      openCart: "افتح السلة",
      openCartN: "افتح السلة، عدد العناصر: {n}",
      openCartOne: "افتح السلة، عنصر واحد",
      qtyFor: "كمية {title}",
      qtyDown: "إنقاص الكمية",
      qtyUp: "زيادة الكمية",
      remove: "إزالة",
      shipAway: "تبقّى <b>{amount}</b> لتحصل على شحن مجاني.",
      shipFree: "حصلت على <b>شحن مجاني</b>.",
      toastAdded: "أُضيف «{title}» إلى سلّتك",
      toastRemoved: "أُزيل «{title}»",
      toastCheckout: "إتمام الشراء غير مفعّل بعد — سلّتك محفوظة على هذا الجهاز.",
      toastSubscribed: "تم الاشتراك. ترقّب رسالتنا يوم الخميس.",
      by: "تأليف {author}",
      meta: "{format}، {pages} صفحة، نُشر عام {year}",
      join: "انضم إلى النادي",
      joined: "منضم",
      toastJoined: "انضممت إلى {name}. نراك هناك!",
      rsvp: "سجّل حضورك",
      going: "سأحضر",
      toastGoing: "تم تسجيل حضورك في «{name}» يوم {date}.",
      toastCancel: "أُلغي تسجيل حضورك في «{name}».",
      menuOpen: "فتح القائمة",
      menuClose: "إغلاق القائمة",
      langLabel: "English",
      langAria: "View the site in English",
    },
  };

  const genres = {
    fiction: "روايات",
    mystery: "غموض وتشويق",
    romance: "رومانسية",
    fantasy: "فانتازيا وخيال علمي",
    nonfiction: "كتب واقعية",
    poetry: "شِعر",
  };

  const formats = { Paperback: "غلاف ورقي", Hardcover: "غلاف مقوّى" };

  // Arabic blurbs for the catalogue in books.js (titles and authors stay in English)
  const blurbs = {
    "james": "مغامرات هكلبري فين كما يرويها جيم — ذكية وغاضبة ومضحكة جدًا. فازت بجائزة بوليتزر وجائزة الكتاب الوطني.",
    "the-women": "تنضمّ فرانكي ماكغراث إلى سلك ممرّضات الجيش وتُرسل إلى فيتنام — ثم تعود إلى بلد يرفض الاعتراف بأنها كانت هناك أصلًا.",
    "heaven-earth-grocery": "هيكل عظمي في قاع بئر في بوتستاون بولاية بنسلفانيا يكشف أسرار حيّ تشيكن هيل، حيث كان الجيران اليهود والسود يرعون بعضهم بعضًا.",
    "tomorrow-x3": "يلتقي سام وسادي طفلين بفضل لعبة سوبر ماريو، ثم يمضيان ثلاثين عامًا في صناعة ألعاب الفيديو — ويكادان يحطّمان بعضهما.",
    "demon-copperhead": "ديفيد كوبرفيلد يولد من جديد في جبال جنوب الأبالاش، يرويه صبي ورث شعر أبيه النحاسي وصوتًا لن تنساه.",
    "intermezzo": "شقيقان إيرلنديان — بيتر المحامي وإيفان معجزة الشطرنج — يتباعدان ثم يتقاربان في الأشهر التي تلي وفاة والدهما.",
    "orbital": "ستة عشر شروقًا، ويوم واحد، وستة روّاد فضاء على متن محطة الفضاء الدولية. الرواية الفائزة بجائزة بوكر عن التأمّل في الأرض من بعيد.",
    "lessons-in-chemistry": "إنه عام 1961، والكيميائية إليزابيث زوت أُقصيت من مختبرها — فتبدأ بتعليم الكيمياء في برنامج طبخ تلفزيوني.",
    "remarkably-bright-creatures": "أرملة تنظّف حوض الأسماك المحلي تنشأ بينها وبين مارسيلوس، الأخطبوط العملاق شديد الملاحظة، صداقة غير متوقّعة.",
    "pachinko": "أربعة أجيال من عائلة كورية في اليابان، من نُزل صغير في بوسان إلى صالات الباتشينكو في أوساكا ويوكوهاما.",
    "come-and-get-it": "مشرفة سكن جامعي في جامعة أركنساس تنجرّ إلى بحث أستاذة زائرة — وتتعقّد مشاكل الطلاب المالية.",
    "maggie": "رواية قصيرة بفكاهة سوداء عن نهاية زواج، وعمّا تقرّر امرأة أن تحمله معها بعد ذلك.",
    "yellowface": "حين تموت منافستها في حادث غريب، تسرق جون هايوارد مخطوطتها المكتملة وتنشرها باسمها. ما الذي قد يسوء؟",

    "thursday-murder-club": "أربعة أصدقاء في قرية هادئة للمتقاعدين يجتمعون أسبوعيًا للتحقيق في قضايا قديمة. ثم تقع جريمة حقيقية على عتبتهم.",
    "silent-patient": "تطلق أليشيا برينسون النار على زوجها خمس مرات ثم لا تنطق بكلمة بعدها. ومعالجها النفسي مصمّم على معرفة السبب.",
    "god-of-the-woods": "أغسطس 1975: تختفي فتاة من سريرها في مخيّم صيفي في جبال أديرونداك — الطفلة الثانية من العائلة الثرية نفسها التي تختفي.",
    "gone-girl": "في ذكرى زواجهما الخامسة تختفي إيمي دَن — وكل دليل يبدو أنه يشير إلى زوجها نيك.",
    "holly": "المحقّقة الخاصة هولي غيبني تتولّى قضية شخص مفقود تقودها إلى أستاذين متقاعدين مهذّبين جدًا وخطيرين جدًا.",

    "funny-story": "خطيب دافني يتركها من أجل حبيبة مايلز. فتنتقل دافني للعيش مع مايلز — كزميلَي سكن فقط، بالطبع.",
    "evelyn-hugo": "أيقونة هوليوودية منعزلة تروي أخيرًا حقيقة حياتها البرّاقة والفضائحية — والحب الكبير الوحيد الذي أخفته.",
    "beach-read": "كاتبة روايات رومانسية وروائي أدبي يعاني من عقدة الكتابة يتبادلان نوعيهما الأدبيين لصيف واحد. لن يقع أحدهما في الحب. بالتأكيد.",
    "love-is-a-war-song": "رواية رومانسية دافئة ومشرقة عن الموسيقى والعائلة والحكايات التي نرثها.",
    "cosmic-love": "كوميديا رومانسية طريفة عن صالون تجميل قد يغيّر موعد واحد فيه الكون الذي تستيقظ فيه.",

    "fourth-wing": "كان مقدّرًا لفيوليت سورنغيل أن تكون كاتبة سجلات. لكنها تُجبر على دخول كلية باسغياث الحربية، حيث يتخرّج فرسان التنانين أو يموتون.",
    "onyx-storm": "الجزء الثالث من سلسلة إمبيريان. تبحر فيوليت خلف حصون نافارا بحثًا عن حلفاء — بينما يقترب الفينين من الديار.",
    "project-hail-mary": "يستيقظ رايلاند غريس وحيدًا على متن سفينة فضاء بلا ذاكرة — ومصير الأرض على كتفيه. ثم يلتقي روكي.",
    "babel": "أكسفورد في ثلاثينيات القرن التاسع عشر. المترجمون يمدّون الإمبراطورية البريطانية بالقوة عبر الفضة المسحورة — حتى يبدأ طالب بالسؤال عمّن يدفع الثمن.",
    "piranesi": "يعيش بيرانيزي في البيت: قاعات لا نهاية لها من التماثيل، ومدّ يجتاح الغرف السفلى. وهو غير متأكّد من وجود أي شيء آخر.",
    "circe": "ابنة هيليوس تُنفى إلى جزيرة أيايا، حيث تصقل سحرها وتلتقي بأشهر شخصيات الأساطير.",
    "night-circus": "سيرك الأحلام لا يفتح أبوابه إلا ليلًا. وفي داخله ساحران شابّان عالقان في مبارزة لم يخترها أيٌّ منهما.",
    "water-moon": "في زقاق مخفي في طوكيو مطعم رامن يمكنك أن تقايض فيه ندمك. وفي أول ليلة تتولّى فيها هانا إدارته، يُسرق شيء ما.",
    "gate-of-the-feral-gods": "الجزء الرابع من «كارل زاحف الزنزانة». يصل كارل والأميرة دونات إلى الطابق الرابع، حيث الآلهة تراقب عن كثب.",

    "atomic-habits": "نظام عملي لبناء العادات الجيدة والتخلّص من السيئة — بتحسين صغير بنسبة واحد في المئة كل مرة.",
    "anxious-generation": "كيف أعادت طفولة يحكمها الهاتف تشكيل الصحة النفسية للشباب — وما الذي يمكن للأهل والمدارس وشركات التقنية فعله.",
    "braiding-sweetgrass": "عالمة نبات من شعب البوتاواتومي تضفر المعرفة الأصلية مع علم النبات في كتاب عن الامتنان والتبادل مع الطبيعة.",
    "crying-in-h-mart": "موسيقية فرقة Japanese Breakfast تكتب عن فقدان أمها الكورية — وعن العثور عليها من جديد في الطعام واللغة وممرّات متجر إتش مارت.",
    "educated": "نشأت تارا ويستوفر لدى أسرة من دعاة البقاء في أيداهو، ولم تدخل فصلًا دراسيًا قبل السابعة عشرة. ثم نالت الدكتوراه من كامبريدج.",
    "wild-edge-of-sorrow": "دليل رقيق من معالج نفسي يرى الحزن تجربة نعيشها معًا — مع طقوس لرعاية الفقد بدلًا من إخفائه.",

    "sun-and-her-flowers": "المجموعة الثانية لروبي كور تتنقّل بين الذبول والسقوط والتجذّر والنهوض والتفتّح.",
    "devotions": "مختارات ماري أوليفر بنفسها من قصائد أكثر من خمسين عامًا عن الانتباه والدهشة والعالم الطبيعي.",
    "time-is-a-mother": "المجموعة الثانية لأوشن فوونغ، كُتبت في أعقاب وفاة والدته — رقيقة ومفاجئة ومضاءة بالحزن.",
    "the-hurting-kind": "قصائد عن العائلة والنسب والعالم الحي من الشاعرة الأمريكية الرابعة والعشرين الحائزة لقب شاعر الولايات المتحدة.",
  };

  /* ---------- Runtime ---------- */
  const KEY = "blooms-lang";
  const root = document.documentElement;
  const english = new Map(); // element → original English { html, attrs }
  const listeners = [];
  let lang = root.lang === "ar" ? "ar" : "en";

  const fill = (str, vars = {}) => str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
  const t = (key, vars) => fill(ui[lang][key] ?? ui.en[key] ?? key, vars);
  const attrPairs = (el) => el.dataset.i18nAttr.split(",").map((p) => p.split(":").map((s) => s.trim()));

  const applyStatic = () => {
    document.querySelectorAll("[data-i18n], [data-i18n-html], [data-i18n-attr]").forEach((el) => {
      if (!english.has(el)) {
        english.set(el, {
          html: el.innerHTML,
          attrs: el.dataset.i18nAttr ? Object.fromEntries(attrPairs(el).map(([a]) => [a, el.getAttribute(a)])) : {},
        });
      }
      const orig = english.get(el);
      const textKey = el.dataset.i18n;
      const htmlKey = el.dataset.i18nHtml;
      if (textKey || htmlKey) {
        if (lang === "ar" && ar[textKey || htmlKey] != null) {
          if (textKey) el.textContent = ar[textKey];
          else el.innerHTML = ar[htmlKey];
        } else {
          el.innerHTML = orig.html;
        }
      }
      if (el.dataset.i18nAttr) {
        attrPairs(el).forEach(([attr, key]) => {
          const value = lang === "ar" && ar[key] != null ? ar[key] : orig.attrs[attr];
          if (value == null) el.removeAttribute(attr);
          else el.setAttribute(attr, value);
        });
      }
    });

    const toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.querySelector("span").textContent = t("langLabel");
      toggle.setAttribute("aria-label", t("langAria"));
      toggle.lang = lang === "ar" ? "en" : "ar"; // the label is written in the *other* language
    }
  };

  const setLang = (next) => {
    lang = next === "ar" ? "ar" : "en";
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem(KEY, lang); } catch { /* storage unavailable */ }
    applyStatic();
    listeners.forEach((fn) => fn(lang));
  };

  window.BloomsLang = {
    get lang() { return lang; },
    get rtl() { return lang === "ar"; },
    t,
    set: setLang,
    onChange: (fn) => listeners.push(fn),
    genre: (key, fallback) => (lang === "ar" ? genres[key] : fallback) || fallback,
    format: (f) => (lang === "ar" ? formats[f] : f) || f,
    blurb: (book) => (lang === "ar" && blurbs[book.id]) || book.blurb,
    locale: () => (lang === "ar" ? "ar-u-nu-latn" : "en-US"),
  };

  applyStatic();
  document.getElementById("langToggle")?.addEventListener("click", () => setLang(lang === "ar" ? "en" : "ar"));
})();
