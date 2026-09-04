import type { Album } from "../lib/types";
import { album, c, col, frame } from "./make";

/** Year 10 · Stage 5 · 中文真棒 III */
export const YEAR10: Album[] = [
  album({
    id: "y10-school",
    title: "我的新学校",
    titleEn: "My new school",
    year: 10,
    source: "中文真棒 III · Lesson 1",
    note: "Campus facilities. Pattern: 一…就…",
    frames: [
      frame("has", "有设施", "Facilities", [
        col("a1", "学校", "School", [
          c("学校有", "xuéxiào yǒu", "the school has"),
          c("新教学楼有", "xīn jiàoxuélóu yǒu", "the new teaching block has"),
          c("体育馆里面有", "tǐyùguǎn lǐmiàn yǒu", "inside the gym there are"),
        ]),
        col("a2", "设施", "Facility", [
          c("一个图书馆", "yí ge túshūguǎn", "a library"),
          c("一个操场", "yí ge cāochǎng", "a sports field"),
          c("两个室内游泳池", "liǎng ge shìnèi yóuyǒngchí", "two indoor pools"),
          c("一个食堂", "yí ge shítáng", "a canteen"),
          c("一个礼堂", "yí ge lǐtáng", "an assembly hall"),
        ])
      ]),
      frame("as-soon", "一…就", "As soon as", [
        col("b1", "一…就", "As soon as", [
          c("我一下课就", "wǒ yí xiàkè jiù", "as soon as class finishes I"),
          c("他一下课就", "tā yí xiàkè jiù", "as soon as class finishes he"),
          c("我们放学就", "wǒmen fàngxué jiù", "as soon as school ends we"),
        ]),
        col("b2", "活动", "What", [
          c("去打网球", "qù dǎ wǎngqiú", "go to play tennis"),
          c("去踢足球", "qù tī zúqiú", "go to play football"),
          c("去图书馆", "qù túshūguǎn", "go to the library"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-busy",
    title: "我每天都很忙",
    titleEn: "I am busy every day",
    year: 10,
    source: "中文真棒 III · Lesson 2",
    note: "Timetable, extra-curriculars and how you feel about them.",
    frames: [
      frame("feel", "觉得", "Feel", [
        col("a1", "主语", "Who", [
          c("我觉得", "wǒ juéde", "I think"),
          c("他觉得", "tā juéde", "he thinks"),
          c("她觉得", "tā juéde", "she thinks"),
        ]),
        col("a2", "什么", "What", [
          c("数学课", "shùxué kè", "maths"),
          c("中文课", "Zhōngwén kè", "Chinese"),
          c("课外活动", "kèwài huódòng", "extra-curriculars"),
          c("每天的功课", "měitiān de gōngkè", "everyday homework"),
        ]),
        col("a3", "评价", "Opinion", [
          c("很忙", "hěn máng", "is very busy"),
          c("有一点儿难", "yǒu yìdiǎnr nán", "is a bit difficult"),
          c("很有用", "hěn yǒuyòng", "is very useful"),
          c("很有趣", "hěn yǒuqù", "is very interesting"),
          c("太累了", "tài lèi le", "is too tiring"),
        ]),
      ]),
      frame("help", "帮助", "Help", [
        col("b1", "主语", "Who", [
          c("老师常常", "lǎoshī chángcháng", "the teacher often"),
          c("同学常常", "tóngxué chángcháng", "classmates often"),
          c("我妈妈常常", "wǒ māma chángcháng", "my mum often"),
        ]),
        col("b2", "帮助", "Help", [
          c("帮助我做功课", "bāngzhù wǒ zuò gōngkè", "helps me with homework"),
          c("帮助我练习中文", "bāngzhù wǒ liànxí Zhōngwén", "helps me practise Chinese"),
          c("帮助我复习", "bāngzhù wǒ fùxí", "helps me revise"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-personality",
    title: "他的性格很开朗",
    titleEn: "He has a cheerful personality",
    year: 10,
    source: "中文真棒 III · Lesson 3",
    note: "Describe character — Continuers 'the individual'.",
    frames: [
      frame("is", "很", "Is", [
        col("a1", "主语", "Who", [
          c("我的朋友", "wǒ de péngyou", "my friend"),
          c("我哥哥", "wǒ gēge", "my older brother"),
          c("我们的老师", "wǒmen de lǎoshī", "our teacher"),
        ]),
        col("a2", "程度", "Degree", [
          c("很", "hěn", "is very"),
          c("非常", "fēicháng", "is extremely"),
          c("有一点儿", "yǒu yìdiǎnr", "is a little"),
        ]),
        col("a3", "性格", "Trait", [
          c("开朗", "kāilǎng", "cheerful"),
          c("独立", "dúlì", "independent"),
          c("有礼貌", "yǒu lǐmào", "polite"),
          c("热情", "rèqíng", "warm"),
          c("认真", "rènzhēn", "hard-working"),
          c("聪明", "cōngmíng", "clever"),
        ])
      ]),
      frame("not", "不太", "Not very", [
        col("b1", "主语", "Who", [
          c("我弟弟不太", "wǒ dìdi bú tài", "my younger brother is not very"),
          c("他一点儿也不", "tā yìdiǎnr yě bù", "he is not at all"),
        ]),
        col("b2", "性格", "Trait", [
          c("安静。", "ānjìng", "quiet."),
          c("耐心。", "nàixīn", "patient."),
          c("负责。", "fùzé", "responsible."),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-camp",
    title: "参加中文夏令营",
    titleEn: "Joining a Chinese summer camp",
    year: 10,
    source: "中文真棒 III · Lesson 4",
    note: "Apply, join and say what you hope to do.",
    frames: [
      frame("join", "参加", "Join", [
        col("a1", "主语", "Who", [
          c("今年夏天我想参加", "jīnnián xiàtiān wǒ xiǎng cānjiā", "this summer I want to join"),
          c("她已经参加了", "tā yǐjīng cānjiā le", "she has already joined"),
          c("我们打算参加", "wǒmen dǎsuàn cānjiā", "we plan to join"),
        ]),
        col("a2", "活动", "Event", [
          c("中文夏令营", "Zhōngwén xiàlìngyíng", "a Chinese summer camp"),
          c("一个交流活动", "yí ge jiāoliú huódòng", "an exchange activity"),
          c("学校的中文比赛", "xuéxiào de Zhōngwén bǐsài", "the school's Chinese competition"),
          c("一个语言班", "yí ge yǔyán bān", "a language class"),
        ]),
      ]),
      frame("hope", "希望", "Hope", [
        col("b1", "希望", "Hope", [
          c("我希望可以", "wǒ xīwàng kěyǐ", "I hope I can"),
          c("参加以后，我希望", "cānjiā yǐhòu, wǒ xīwàng", "after joining I hope to"),
          c("她希望可以", "tā xīwàng kěyǐ", "she hopes she can"),
        ]),
        col("b2", "目的", "Aim", [
          c("交很多中国朋友", "jiāo hěn duō Zhōngguó péngyou", "make lots of Chinese friends"),
          c("提高我的汉语", "tígāo wǒ de Hànyǔ", "improve my Mandarin"),
          c("了解中国文化", "liǎojiě Zhōngguó wénhuà", "understand Chinese culture"),
          c("练习口语", "liànxí kǒuyǔ", "practise speaking"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-illness",
    title: "你哪儿不舒服",
    titleEn: "Where does it hurt?",
    year: 10,
    source: "中文真棒 III · Lesson 5",
    note: "Health: symptoms and seeing a doctor.",
    frames: [
      frame("symptom", "不舒服", "Unwell", [
        col("a1", "主语", "Who", [
          c("我", "wǒ", "I"),
          c("他", "tā", "he"),
          c("她", "tā", "she"),
          c("我妹妹", "wǒ mèimei", "my younger sister"),
        ]),
        col("a2", "症状", "Symptom", [
          c("发烧了", "fāshāo le", "has a fever"),
          c("感冒了", "gǎnmào le", "has a cold"),
          c("咳嗽", "késou", "is coughing"),
          c("嗓子疼", "sǎngzi téng", "has a sore throat"),
          c("有一点儿不舒服", "yǒu yìdiǎnr bù shūfu", "feels a bit unwell"),
          c("头痛", "tóu téng", "has a headache"),
        ]),
      ]),
      frame("doctor", "看病", "See a doctor", [
        col("b1", "所以", "So", [
          c("所以", "suǒyǐ", "so"),
          c("因此", "yīncǐ", "therefore"),
        ]),
        col("b2", "行动", "Action", [
          c("我去医院看病", "wǒ qù yīyuàn kànbìng", "I am going to hospital"),
          c("他想在家休息", "tā xiǎng zài jiā xiūxi", "he wants to rest at home"),
          c("妈妈让我吃药", "māma ràng wǒ chī yào", "Mum is making me take medicine"),
          c("我们去看医生", "wǒmen qù kàn yīshēng", "we are going to see a doctor"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-health-food",
    title: "多吃蔬菜少吃甜点",
    titleEn: "Eat more vegetables, fewer desserts",
    year: 10,
    source: "中文真棒 III · Lesson 6",
    note: "Healthy eating advice. Stage 5: health.",
    frames: [
      frame("should", "应该", "Should", [
        col("a1", "主语", "Who", [
          c("我们应该", "wǒmen yīnggāi", "we should"),
          c("医生说我应该", "yīshēng shuō wǒ yīnggāi", "the doctor says I should"),
          c("妈妈让我", "māma ràng wǒ", "Mum tells me to"),
        ]),
        col("a2", "建议", "Advice", [
          c("多吃蔬菜", "duō chī shūcài", "eat more vegetables"),
          c("少吃甜点", "shǎo chī tiándiǎn", "eat fewer desserts"),
          c("少喝可乐", "shǎo hē kělè", "drink less cola"),
          c("多喝水", "duō hē shuǐ", "drink more water"),
          c("早点睡觉", "zǎo diǎn shuìjiào", "go to bed earlier"),
        ]),
      ]),
      frame("because", "因为", "Because", [
        col("b1", "谁说", "Who", [
          c("因为我觉得", "yīnwèi wǒ juéde", "because I think"),
          c("医生说", "yīshēng shuō", "the doctor says"),
        ]),
        col("b2", "理由", "Reason", [
          c("这样对身体好", "zhèyàng duì shēntǐ hǎo", "this is good for your health"),
          c("甜点吃太多不好", "tiándiǎn chī tài duō bù hǎo", "too many desserts are not good"),
          c("运动也很重要", "yùndòng yě hěn zhòngyào", "exercise also matters"),
          c("睡觉也很重要", "shuìjiào yě hěn zhòngyào", "sleep also matters"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-music",
    title: "我是古典音乐迷",
    titleEn: "I am a classical-music fan",
    year: 10,
    source: "中文真棒 III · Lesson 7",
    note: "Leisure and the arts — Continuers 'the individual'.",
    frames: [
      frame("fan", "迷", "Fan of", [
        col("a1", "主语", "Who", [
          c("我是", "wǒ shì", "I am"),
          c("我姐姐是", "wǒ jiějie shì", "my older sister is"),
          c("他不是", "tā bú shì", "he is not"),
        ]),
        col("a2", "爱好", "Fan of", [
          c("古典音乐迷", "gǔdiǎn yīnyuè mí", "a classical-music fan"),
          c("流行音乐迷", "liúxíng yīnyuè mí", "a pop-music fan"),
          c("电影迷", "diànyǐng mí", "a film fan"),
          c("足球迷", "zúqiú mí", "a football fan"),
        ]),
      ]),
      frame("listen", "听", "Listen", [
        col("b1", "时间", "When", [
          c("我常常", "wǒ chángcháng", "I often"),
          c("做作业的时候我喜欢", "zuò zuòyè de shíhou wǒ xǐhuan", "when I do homework I like to"),
          c("坐车的时候她喜欢", "zuòchē de shíhou tā xǐhuan", "when she is on the bus she likes to"),
        ]),
        col("b2", "活动", "Activity", [
          c("听古典音乐", "tīng gǔdiǎn yīnyuè", "listen to classical music"),
          c("听音乐放松", "tīng yīnyuè fàngsōng", "listen to music to relax"),
          c("看中文电影", "kàn Zhōngwén diànyǐng", "watch Chinese films"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-sport",
    title: "你热身了没有",
    titleEn: "Have you warmed up?",
    year: 10,
    source: "中文真棒 III · Lesson 8",
    note: "Sport: warm-up, 了没有.",
    frames: [
      frame("done", "了没有", "Have you", [
        col("a1", "谁", "Who", [
          c("你", "nǐ", "have you"),
          c("你们", "nǐmen", "have you all"),
          c("他", "tā", "has he"),
          c("她", "tā", "has she"),
        ]),
        col("a2", "活动", "Activity", [
          c("热身", "rèshēn", "warmed up"),
          c("带运动服", "dài yùndòngfú", "brought sports kit"),
          c("开始比赛", "kāishǐ bǐsài", "started the match"),
          c("喝水", "hē shuǐ", "had a drink of water"),
        ]),
        col("a3", "了没有", "Yet", [c("了没有？", "le méiyǒu", "yet?")]),
      ]),
      frame("do", "先…再", "First … then", [
        col("b1", "建议", "Advice", [
          c("我们应该先热身，再", "wǒmen yīnggāi xiān rèshēn, zài", "we should warm up first, then"),
          c("他想先跑步，再", "tā xiǎng xiān pǎobù, zài", "he wants to run first, then"),
        ]),
        col("b2", "活动", "Activity", [
          c("打篮球", "dǎ lánqiú", "play basketball"),
          c("游泳", "yóuyǒng", "go swimming"),
          c("踢足球", "tī zúqiú", "play football"),
          c("做拉伸", "zuò lāshēn", "stretch"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-suburb",
    title: "我住在郊区",
    titleEn: "I live in the suburbs",
    year: 10,
    source: "中文真棒 III · Lessons 9–10",
    note: "Neighbourhood: 郊区, 便利, 小区.",
    frames: [
      frame("live", "住在", "Live", [
        col("a1", "主语", "Who", [
          c("我住在", "wǒ zhù zài", "I live in"),
          c("他们住在", "tāmen zhù zài", "they live in"),
          c("我以前住在", "wǒ yǐqián zhù zài", "I used to live in"),
        ]),
        col("a2", "地方", "Place", [
          c("郊区", "jiāoqū", "the suburbs"),
          c("市中心", "shì zhōngxīn", "the city centre"),
          c("一个很便利的小区", "yí ge hěn biànlì de xiǎoqū", "a very convenient neighbourhood"),
          c("学校附近", "xuéxiào fùjìn", "near the school"),
        ]),
      ]),
      frame("convenient", "方便", "Convenient", [
        col("b1", "因为", "Because", [
          c("因为附近有超市和车站，所以", "yīnwèi fùjìn yǒu chāoshì hé chēzhàn, suǒyǐ", "because there is a supermarket and a station nearby,"),
          c("虽然离学校有点儿远，但是", "suīrán lí xuéxiào yǒudiǎnr yuǎn, dànshì", "although it is a bit far from school,"),
          c("小区很大，所以", "xiǎoqū hěn dà, suǒyǐ", "the neighbourhood is big, so"),
        ]),
        col("b2", "结果", "Result", [
          c("生活很方便", "shēnghuó hěn fāngbiàn", "daily life is convenient"),
          c("空气比较好", "kōngqì bǐjiào hǎo", "the air is better"),
          c("我家很安静", "wǒ jiā hěn ānjìng", "my home is quiet"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-sale",
    title: "商场大减价",
    titleEn: "There's a big sale",
    year: 10,
    source: "中文真棒 III · Lesson 11",
    note: "Shopping, discounts and 比.",
    frames: [
      frame("buy", "买", "Buy", [
        col("a1", "主语", "Who", [
          c("商场大减价，我想买", "shāngchǎng dà jiǎnjià, wǒ xiǎng mǎi", "there's a big sale; I want to buy"),
          c("她已经买了", "tā yǐjīng mǎi le", "she has already bought"),
          c("我们想买", "wǒmen xiǎng mǎi", "we want to buy"),
        ]),
        col("a2", "东西", "Item", [
          c("一件衣服", "yí jiàn yīfu", "a piece of clothing"),
          c("一双鞋", "yì shuāng xié", "a pair of shoes"),
          c("很多东西", "hěn duō dōngxi", "lots of things"),
          c("一顶帽子", "yì dǐng màozi", "a hat"),
        ]),
      ]),
      frame("compare", "比", "Compare", [
        col("b1", "比较", "Compare", [
          c("这件衣服比那件", "zhè jiàn yīfu bǐ nà jiàn", "this top, compared with that one, is"),
          c("这个商场比那个", "zhège shāngchǎng bǐ nàge", "this mall, compared with that one, is"),
          c("这双鞋比那双", "zhè shuāng xié bǐ nà shuāng", "these shoes, compared with those, are"),
        ]),
        col("b2", "结果", "Result", [
          c("便宜", "piányi", "cheaper"),
          c("好看", "hǎokàn", "better looking"),
          c("方便", "fāngbiàn", "more convenient"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y10-exchange",
    title: "我是交换学生",
    titleEn: "I am an exchange student",
    year: 10,
    source: "中文真棒 III · Lesson 12",
    note: "Exchange, scholarships and applying — bridge into Continuers.",
    frames: [
      frame("am", "是", "I am", [
        col("a1", "主语", "Who", [
          c("明年我想当", "míngnián wǒ xiǎng dāng", "next year I want to be"),
          c("她是", "tā shì", "she is"),
          c("我申请当", "wǒ shēnqǐng dāng", "I have applied to be"),
        ]),
        col("a2", "身份", "Role", [
          c("交换学生", "jiāohuàn xuéshēng", "an exchange student"),
          c("留学生", "liúxuéshēng", "an overseas student"),
        ]),
        col("a3", "地点", "Place", [
          c("去中国。", "qù Zhōngguó", "and go to China."),
          c("去欧洲。", "qù Ōuzhōu", "and go to Europe."),
          c("去亚洲。", "qù Yàzhōu", "and go to Asia."),
        ]),
      ]),
      frame("apply", "申请", "Apply", [
        col("b1", "因为", "Because", [
          c("因为我想申请奖学金，所以", "yīnwèi wǒ xiǎng shēnqǐng jiǎngxuéjīn, suǒyǐ", "because I want a scholarship,"),
          c("为了提高中文，我决定", "wèile tígāo Zhōngwén, wǒ juédìng", "in order to improve my Chinese I have decided to"),
        ]),
        col("b2", "行动", "Action", [
          c("认真准备申请。", "rènzhēn zhǔnbèi shēnqǐng", "prepare the application carefully."),
          c("多练习口语。", "duō liànxí kǒuyǔ", "practise speaking more."),
        ]),
      ]),
    ],
  }),
];
