import type { Album } from "../lib/types";
import { album, c, col, frame } from "./make";

/** Year 9 · Stage 5 · 中文真棒 II */
export const YEAR9: Album[] = [
  album({
    id: "y9-holiday-go",
    title: "放假去哪儿",
    titleEn: "Where are we going on holiday?",
    year: 9,
    source: "中文真棒 II · Lesson 1",
    note: "Transport + destination. Pattern: 坐 + vehicle + 去 + place.",
    frames: [
      frame("go", "怎么去", "How we go", [
        col("a1", "主语", "Who", [
          c("我们", "wǒmen", "we"),
          c("我和家人", "wǒ hé jiārén", "my family and I"),
          c("他们", "tāmen", "they"),
        ]),
        col("a2", "交通", "Transport", [
          c("坐飞机", "zuò fēijī", "take a plane"),
          c("坐火车", "zuò huǒchē", "take a train"),
          c("坐公交车", "zuò gōngjiāochē", "take a bus"),
          c("坐出租车", "zuò chūzūchē", "take a taxi"),
          c("开车", "kāichē", "drive"),
          c("走路", "zǒulù", "walk"),
        ]),
        col("a3", "目的地", "Place", [
          c("去北京", "qù Běijīng", "to Beijing"),
          c("去蓝山", "qù Lánshān", "to the Blue Mountains"),
          c("去歌剧院", "qù gējùyuàn", "to the Opera House"),
          c("去中国城", "qù Zhōngguóchéng", "to Chinatown"),
          c("去市中心", "qù shì zhōngxīn", "to the city centre"),
          c("去学校", "qù xuéxiào", "to school"),
        ])
      ]),
      frame("from-to", "从…到", "From … to", [
        col("b1", "起点", "From", [
          c("从悉尼到北京", "cóng Xīní dào Běijīng", "from Sydney to Beijing"),
          c("从我家到学校", "cóng wǒ jiā dào xuéxiào", "from my home to school"),
          c("从这里到中国城", "cóng zhèlǐ dào Zhōngguóchéng", "from here to Chinatown"),
        ]),
        col("b2", "交通", "Transport", [
          c("坐飞机要四个小时", "zuò fēijī yào sì ge xiǎoshí", "takes four hours by plane"),
          c("走路只要五分钟", "zǒulù zhǐ yào wǔ fēnzhōng", "takes only five minutes on foot"),
          c("开车只要半个小时", "kāichē zhǐ yào bàn ge xiǎoshí", "takes only half an hour by car"),
        ])
      ]),
    ],
  }),

  album({
    id: "y9-weather",
    title: "天气怎么样",
    titleEn: "What's the weather like?",
    year: 9,
    source: "中文真棒 II · Lesson 2",
    note: "Seasons, weather and 会 for the future.",
    frames: [
      frame("now", "现在", "Now", [
        col("a1", "地方", "Place", [
          c("北京现在", "Běijīng xiànzài", "Beijing now"),
          c("悉尼今天", "Xīní jīntiān", "Sydney today"),
          c("台北今天", "Táiběi jīntiān", "Taipei today"),
        ]),
        col("a2", "天气", "Weather", [
          c("是晴天", "shì qíngtiān", "is sunny"),
          c("是阴天", "shì yīntiān", "is cloudy"),
          c("下雨", "xiàyǔ", "is raining"),
          c("下雪", "xiàxuě", "is snowing"),
          c("很暖和", "hěn nuǎnhuo", "is warm"),
          c("很凉快", "hěn liángkuai", "is cool"),
        ])
      ]),
      frame("will", "会", "Will", [
        col("b1", "时间", "When", [
          c("明天会", "míngtiān huì", "tomorrow it will"),
          c("北京的冬天会", "Běijīng de dōngtiān huì", "Beijing winters will"),
          c("明年冬天的时候会", "míngnián dōngtiān de shíhou huì", "next winter it will"),
        ]),
        col("b2", "天气", "Weather", [
          c("下雪", "xiàxuě", "snow", "snow-b"),
          c("刮风", "guāfēng", "be windy"),
          c("下雨", "xiàyǔ", "rain", "rain-b"),
          c("很冷", "hěn lěng", "be very cold"),
        ])
      ]),
    ],
  }),

  album({
    id: "y9-holiday-past",
    title: "我假期去了加拿大",
    titleEn: "I went to Canada in the holidays",
    year: 9,
    source: "中文真棒 II · Lesson 3",
    note: "Past holiday with 了. Stage 5: recount.",
    frames: [
      frame("went", "去了", "Went", [
        col("a1", "主语", "Who", [
          c("我假期", "wǒ jiàqī", "in the holidays I"),
          c("我们去年", "wǒmen qùnián", "last year we"),
          c("他暑假", "tā shǔjià", "in the summer holidays he"),
          c("她寒假", "tā hánjià", "in the winter holidays she"),
        ]),
        col("a2", "去了", "Went", [
          c("去了加拿大", "qù le Jiānádà", "went to Canada"),
          c("去了澳大利亚", "qù le Àodàlìyà", "went to Australia"),
          c("去了北京", "qù le Běijīng", "went to Beijing"),
          c("去了中国", "qù le Zhōngguó", "went to China"),
          c("去了上海", "qù le Shànghǎi", "went to Shanghai"),
        ]),
      ]),
      frame("also", "还", "Also", [
        col("b1", "主语", "Who", [
          c("我们在悉尼", "wǒmen zài Xīní", "in Sydney we"),
          c("我在海边", "wǒ zài hǎibiān", "at the beach I"),
          c("他们在中国城", "tāmen zài Zhōngguóchéng", "in Chinatown they"),
        ]),
        col("b2", "还", "Also", [
          c("坐了火车，还", "zuò le huǒchē, hái", "took the train, and also"),
          c("去了公园，还", "qù le gōngyuán, hái", "went to the park, and also"),
        ]),
        col("b3", "活动", "Activity", [
          c("坐了船", "zuò le chuán", "took a ferry"),
          c("去了歌剧院", "qù le gējùyuàn", "went to the Opera House"),
          c("买了很多东西", "mǎi le hěn duō dōngxi", "bought a lot of things"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y9-weekend",
    title: "我周末想去中国城",
    titleEn: "I want to go to Chinatown this weekend",
    year: 9,
    source: "中文真棒 II · Lesson 4",
    note: "Weekend plans with 想 and 还是.",
    frames: [
      frame("want", "想去", "Want to go", [
        col("a1", "时间", "When", [
          c("我周末想", "wǒ zhōumò xiǎng", "this weekend I want to"),
          c("明天我想", "míngtiān wǒ xiǎng", "tomorrow I want to"),
          c("放假的时候我想", "fàngjià de shíhou wǒ xiǎng", "in the holidays I want to"),
          c("星期六他想", "xīngqīliù tā xiǎng", "on Saturday he wants to"),
        ]),
        col("a2", "活动", "Activity", [
          c("去中国城买东西", "qù Zhōngguóchéng mǎi dōngxi", "go to Chinatown to shop"),
          c("去公园骑自行车", "qù gōngyuán qí zìxíngchē", "go to the park to ride bikes"),
          c("去书店看书", "qù shūdiàn kàn shū", "go to the bookshop to read"),
          c("去电影院看电影", "qù diànyǐngyuàn kàn diànyǐng", "go to the cinema"),
          c("在家休息", "zài jiā xiūxi", "rest at home"),
        ]),
      ]),
      frame("or", "还是", "Or", [
        col("b1", "问", "Ask", [
          c("你们想去公园，还是", "nǐmen xiǎng qù gōngyuán, háishi", "do you want to go to the park, or"),
          c("你想去吃饭，还是", "nǐ xiǎng qù chīfàn, háishi", "do you want to go out to eat, or"),
        ]),
        col("b2", "选择", "Choice", [
          c("去中国城买东西？", "qù Zhōngguóchéng mǎi dōngxi", "go to Chinatown to shop?"),
          c("去书店？", "qù shūdiàn", "go to the bookshop?"),
          c("在家休息？", "zài jiā xiūxi", "rest at home?"),
          c("去看电影？", "qù kàn diànyǐng", "go to see a film?"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y9-directions",
    title: "去书店怎么走",
    titleEn: "How do I get to the bookshop?",
    year: 9,
    source: "中文真棒 II · Lesson 5",
    note: "Ask for and give simple directions.",
    frames: [
      frame("ask", "怎么走", "How to go", [
        col("a1", "请问", "Excuse me", [
          c("请问，去", "qǐngwèn, qù", "excuse me, to get to"),
          c("劳驾，去", "láojià, qù", "sorry to bother you — to get to"),
        ]),
        col("a2", "地点", "Place", [
          c("书店", "shūdiàn", "the bookshop"),
          c("饭馆", "fànguǎn", "the restaurant"),
          c("火车站", "huǒchēzhàn", "the train station"),
          c("图书馆", "túshūguǎn", "the library"),
          c("中国城", "Zhōngguóchéng", "Chinatown"),
          c("超市", "chāoshì", "the supermarket"),
        ]),
        col("a3", "问法", "Ask", [
          c("怎么走？", "zěnme zǒu", "how do I go?"),
          c("远不远？", "yuǎn bu yuǎn", "is it far?"),
        ]),
      ]),
      frame("tell", "往…走", "Go …", [
        col("b1", "方向", "Direction", [
          c("往前走", "wǎng qián zǒu", "go straight ahead"),
          c("往左转", "wǎng zuǒ zhuǎn", "turn left"),
          c("往右转", "wǎng yòu zhuǎn", "turn right"),
          c("过马路", "guò mǎlù", "cross the road"),
        ]),
        col("b2", "然后", "Then", [
          c("就到了", "jiù dào le", "and you are there"),
          c("，再往前走", ", zài wǎng qián zǒu", ", then keep going"),
          c("，学校就在那儿", ", xuéxiào jiù zài nàr", ", the school is just there"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y9-restaurant",
    title: "去饭馆吃饭",
    titleEn: "Eating at a restaurant",
    year: 9,
    source: "中文真棒 II · Lesson 6",
    note: "Order food and comment on it.",
    frames: [
      frame("order", "想吃", "Want to eat", [
        col("a1", "主语", "Who", [
          c("我想吃", "wǒ xiǎng chī", "I want to eat"),
          c("他想点", "tā xiǎng diǎn", "he wants to order"),
          c("我们想吃", "wǒmen xiǎng chī", "we want to eat"),
        ]),
        col("a2", "菜", "Dish", [
          c("饺子", "jiǎozi", "dumplings"),
          c("北京烤鸭", "Běijīng kǎoyā", "Peking duck"),
          c("炒饭", "chǎofàn", "fried rice"),
          c("面条", "miàntiáo", "noodles"),
          c("一碗汤", "yì wǎn tāng", "a bowl of soup"),
        ])
      ]),
      frame("comment", "觉得", "I think", [
        col("b1", "主语", "Who", [
          c("我觉得这家饭馆", "wǒ juéde zhè jiā fànguǎn", "I think this restaurant"),
          c("他觉得菜", "tā juéde cài", "he thinks the food"),
        ]),
        col("b2", "评价", "Opinion", [
          c("很不错。", "hěn búcuò", "is pretty good."),
          c("有一点儿贵。", "yǒu yìdiǎnr guì", "is a bit expensive."),
          c("太辣了。", "tài là le", "is too spicy."),
          c("非常好吃。", "fēicháng hǎochī", "is really delicious."),
        ]),
      ]),
    ],
  }),

  album({
    id: "y9-gifts",
    title: "我想买生日礼物",
    titleEn: "I want to buy a birthday present",
    year: 9,
    source: "中文真棒 II · Lessons 7–8",
    note: "Choose a present and say why. Same pattern as the HSC 'gifts' writing task.",
    frames: [
      frame("want", "想送", "Want to give", [
        col("a1", "意愿", "Intention", [c("我想送", "wǒ xiǎng sòng", "I want to give")]),
        col("a2", "对象", "Recipient", [
          c("妈妈", "māma", "Mum"),
          c("爸爸", "bàba", "Dad"),
          c("老师", "lǎoshī", "my teacher"),
          c("好朋友", "hǎo péngyou", "a good friend"),
          c("同学", "tóngxué", "a classmate"),
        ]),
        col("a3", "礼物", "Gift", [
          c("一盒巧克力", "yì hé qiǎokèlì", "a box of chocolates"),
          c("一张卡片", "yì zhāng kǎpiàn", "a card"),
          c("一块蛋糕", "yí kuài dàngāo", "a cake"),
          c("一本书", "yì běn shū", "a book"),
          c("一件衣服", "yí jiàn yīfu", "a piece of clothing"),
        ]),
        col("a4", "因为", "Because", [c("，因为我觉得", ", yīnwèi wǒ juéde", ", because I think")]),
        col("a5", "看法", "Opinion", [
          c("送这个很不错。", "sòng zhège hěn búcuò", "giving this is really nice."),
          c("这个礼物很特别。", "zhège lǐwù hěn tèbié", "this gift is very special."),
          c("一定很有意思。", "yídìng hěn yǒu yìsi", "it will definitely be interesting."),
        ]),
      ]),
      frame("wont", "不想送", "Don't want to", [
        col("b1", "意愿", "Intention", [c("我不想送", "wǒ bù xiǎng sòng", "I don't want to give")]),
        col("b2", "对象", "Recipient", [
          c("他", "tā", "him"),
          c("老师", "lǎoshī", "my teacher", "tea-b"),
        ]),
        col("b3", "礼物", "Gift", [
          c("礼品券", "lǐpǐn quàn", "a gift voucher"),
          c("零食", "língshí", "snacks"),
        ]),
        col("b4", "因为", "Because", [c("，因为我觉得", ", yīnwèi wǒ juéde", ", because I think", "cos-b")]),
        col("b5", "看法", "Opinion", [
          c("送这个有点儿贵。", "sòng zhège yǒudiǎnr guì", "giving this is a bit expensive."),
          c("他不会喜欢。", "tā bú huì xǐhuan", "he will not like it."),
        ]),
      ]),
    ],
  }),

  album({
    id: "y9-clothes",
    title: "你穿什么衣服",
    titleEn: "What are you wearing?",
    year: 9,
    source: "中文真棒 II · Lesson 9",
    note: "Clothes, colours and 穿 / 戴.",
    frames: [
      frame("wear", "穿", "Wear", [
        col("a1", "主语", "Who", [
          c("我今天穿", "wǒ jīntiān chuān", "today I am wearing"),
          c("他想穿", "tā xiǎng chuān", "he wants to wear"),
          c("她穿着", "tā chuān zhe", "she is wearing"),
        ]),
        col("a2", "衣服", "Clothes", [
          c("一件红衣服", "yí jiàn hóng yīfu", "a red top"),
          c("一条蓝裤子", "yì tiáo lán kùzi", "blue trousers"),
          c("一件黑外套", "yí jiàn hēi wàitào", "a black jacket"),
          c("一条白裙子", "yì tiáo bái qúnzi", "a white skirt"),
        ])
      ]),
      frame("hat", "戴", "Put on", [
        col("b1", "主语", "Who", [
          c("我想戴", "wǒ xiǎng dài", "I want to wear"),
          c("她戴着", "tā dài zhe", "she is wearing"),
        ]),
        col("b2", "配饰", "Item", [
          c("一顶帽子", "yì dǐng màozi", "a hat"),
          c("一副眼镜", "yí fù yǎnjìng", "glasses"),
        ]),
        col("b3", "评价", "Opinion", [
          c("，很好看", ", hěn hǎokàn", ", it looks good"),
          c("，很合适", ", hěn héshì", ", it suits me"),
          c("，很舒服", ", hěn shūfu", ", it is comfortable"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y9-career",
    title: "你想当什么",
    titleEn: "What do you want to be?",
    year: 9,
    source: "中文真棒 II · Lesson 10",
    note: "Future jobs with 以前 / 以后. Stage 5: aspirations.",
    frames: [
      frame("want", "想当", "Want to be", [
        col("a1", "主语", "Who", [
          c("以后我想当", "yǐhòu wǒ xiǎng dāng", "later I want to be"),
          c("长大以后他想当", "zhǎngdà yǐhòu tā xiǎng dāng", "when he grows up he wants to be"),
          c("我以前想当", "wǒ yǐqián xiǎng dāng", "I used to want to be"),
        ]),
        col("a2", "职业", "Job", [
          c("医生", "yīshēng", "a doctor"),
          c("老师", "lǎoshī", "a teacher"),
          c("工程师", "gōngchéngshī", "an engineer"),
          c("厨师", "chúshī", "a chef"),
          c("运动员", "yùndòngyuán", "an athlete"),
          c("科学家", "kēxuéjiā", "a scientist"),
        ])
      ]),
      frame("same", "跟…一样", "The same as", [
        col("b1", "主语", "Who", [
          c("我想跟爸爸一样当", "wǒ xiǎng gēn bàba yíyàng dāng", "I want to be, like Dad,"),
          c("她想跟妈妈一样当", "tā xiǎng gēn māma yíyàng dāng", "she wants to be, like Mum,"),
        ]),
        col("b2", "职业", "Job", [
          c("商人。", "shāngrén", "a businessperson."),
          c("老师。", "lǎoshī", "a teacher.", "tea-b"),
          c("医生。", "yīshēng", "a doctor.", "doc-b"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y9-appearance",
    title: "他们长什么样",
    titleEn: "What do they look like?",
    year: 9,
    source: "中文真棒 II · Lesson 11",
    note: "Describe a person's appearance and personality.",
    frames: [
      frame("looks", "长得", "Looks", [
        col("a1", "主语", "Who", [
          c("我哥哥长得", "wǒ gēge zhǎng de", "my older brother looks"),
          c("我妈妈长得", "wǒ māma zhǎng de", "my mum looks"),
          c("他长得", "tā zhǎng de", "he looks"),
        ]),
        col("a2", "外表", "Looks", [
          c("很高", "hěn gāo", "very tall"),
          c("有一点儿瘦", "yǒu yìdiǎnr shòu", "a bit thin"),
          c("不胖也不瘦", "bù pàng yě bù shòu", "neither fat nor thin"),
        ])
      ]),
      frame("trait", "性格", "Personality", [
        col("b1", "主语", "Who", [
          c("他很", "tā hěn", "he is very"),
          c("她非常", "tā fēicháng", "she is extremely"),
          c("我爸爸有一点儿", "wǒ bàba yǒu yìdiǎnr", "my dad is a little"),
        ]),
        col("b2", "特点", "Trait", [
          c("友好", "yǒuhǎo", "friendly"),
          c("幽默", "yōumò", "funny"),
          c("严格", "yángé", "strict"),
          c("安静", "ānjìng", "quiet"),
        ])
      ]),
    ],
  }),

  album({
    id: "y9-home",
    title: "这是我的家",
    titleEn: "This is my home",
    year: 9,
    source: "中文真棒 II · Lesson 12",
    note: "Rooms of the house and 附近.",
    frames: [
      frame("room", "房间", "Rooms", [
        col("a1", "指示", "This", [
          c("这是", "zhè shì", "this is"),
          c("旁边是", "pángbiān shì", "next to it is"),
          c("中间是", "zhōngjiān shì", "in the middle is"),
        ]),
        col("a2", "房间", "Room", [
          c("客厅", "kètīng", "the living room"),
          c("厨房", "chúfáng", "the kitchen"),
          c("我的卧室", "wǒ de wòshì", "my bedroom"),
          c("饭厅", "fàntīng", "the dining room"),
          c("书房", "shūfáng", "the study"),
        ])
      ]),
      frame("near", "附近", "Nearby", [
        col("b1", "我家附近有", "Near home", [
          c("我家附近有", "wǒ jiā fùjìn yǒu", "near my home there is"),
          c("学校附近有", "xuéxiào fùjìn yǒu", "near school there is"),
        ]),
        col("b2", "设施", "Place", [
          c("一个超市，很方便。", "yí ge chāoshì, hěn fāngbiàn", "a supermarket; it is convenient."),
          c("一个公园。", "yí ge gōngyuán", "a park."),
          c("很多饭馆。", "hěn duō fànguǎn", "lots of restaurants."),
        ]),
      ]),
    ],
  }),
];
