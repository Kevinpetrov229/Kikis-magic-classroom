import type { Album } from "../lib/types";
import { album, c, col, frame } from "./make";

/** Year 12 · Stage 6 Continuers · HSC · 中文真棒 IV 7–12 + prescribed themes */
export const YEAR12: Album[] = [
  album({
    id: "y12-pocket-money",
    title: "我想赚点儿零用钱",
    titleEn: "I want to earn some pocket money",
    year: 12,
    source: "中文真棒 IV · Lesson 7 · Continuers: youth issues / work",
    note: "Part-time jobs, 零用钱, and why students work.",
    frames: [
      frame("earn", "赚钱", "Earn", [
        col("a1", "主语", "Who", [
          c("我想赚点儿零用钱，所以", "wǒ xiǎng zhuàn diǎnr língyòngqián, suǒyǐ", "I want to earn some pocket money, so"),
          c("很多高中生", "hěn duō gāozhōngshēng", "many senior students"),
          c("为了减轻家里的负担，我", "wèile jiǎnqīng jiā lǐ de fùdān, wǒ", "to ease the burden on my family I"),
          c("放假的时候她", "fàngjià de shíhou tā", "in the holidays she"),
        ]),
        col("a2", "工作", "Work", [
          c("去饭馆打工", "qù fànguǎn dǎgōng", "works in a restaurant"),
          c("周末做家教", "zhōumò zuò jiājiào", "tutors on weekends"),
          c("在超市帮忙", "zài chāoshì bāngmáng", "helps out at a supermarket"),
          c("在图书馆工作", "zài túshūguǎn gōngzuò", "works at the library"),
        ]),
      ]),
      frame("view", "看法", "View", [
        col("b1", "看法", "View", [
          c("我觉得打工可以", "wǒ juéde dǎgōng kěyǐ", "I think working can"),
          c("对年轻人来说，打工可以", "duì niánqīngrén lái shuō, dǎgōng kěyǐ", "for young people, work can"),
          c("虽然有人担心影响学习，但是打工可以", "suīrán yǒurén dānxīn yǐngxiǎng xuéxí, dànshì dǎgōng kěyǐ", "although some worry about study, work can"),
        ]),
        col("b2", "收获", "Gain", [
          c("学到社会责任", "xué dào shèhuì zérèn", "teach social responsibility"),
          c("让时间管理更好", "ràng shíjiān guǎnlǐ gèng hǎo", "improve time management"),
          c("让我更独立", "ràng wǒ gèng dúlì", "make me more independent"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-invite",
    title: "我来设计邀请卡吧",
    titleEn: "Let me design the invitation",
    year: 12,
    source: "中文真棒 IV · Lesson 8",
    note: "Invitations, email and school events.",
    frames: [
      frame("invite", "邀请", "Invite", [
        col("a1", "主语", "Who", [
          c("我想邀请你参加", "wǒ xiǎng yāoqǐng nǐ cānjiā", "I want to invite you to"),
          c("学校将举办", "xuéxiào jiāng jǔbàn", "the school will hold"),
          c("请你来参加", "qǐng nǐ lái cānjiā", "please come to"),
          c("我们打算举办", "wǒmen dǎsuàn jǔbàn", "we plan to hold"),
        ]),
        col("a2", "活动", "Event", [
          c("毕业晚会", "bìyè wǎnhuì", "the graduation party"),
          c("中文演讲比赛", "Zhōngwén yǎnjiǎng bǐsài", "the Chinese speaking competition"),
          c("一个典礼", "yí ge diǎnlǐ", "a ceremony"),
          c("中秋晚会", "Zhōngqiū wǎnhuì", "a Mid-Autumn party"),
        ]),
      ]),
      frame("send", "发", "Send", [
        col("b1", "我会", "I will", [
          c("我会发一封电子邮件", "wǒ huì fā yì fēng diànzǐ yóujiàn", "I will send an email"),
          c("我已经设计了邀请卡，准备", "wǒ yǐjīng shèjì le yāoqǐngkǎ, zhǔnbèi", "I have designed the invitation and am about to"),
          c("她会发短信", "tā huì fā duǎnxìn", "she will send a text"),
        ]),
        col("b2", "行动", "Action", [
          c("告诉大家时间地点", "gàosu dàjiā shíjiān dìdiǎn", "to tell everyone the time and place"),
          c("发给所有同学", "fā gěi suǒyǒu tóngxué", "send it to all classmates"),
          c("请老师也来", "qǐng lǎoshī yě lái", "and invite the teacher too"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-celebrate",
    title: "你会怎么庆祝",
    titleEn: "How will you celebrate?",
    year: 12,
    source: "中文真棒 IV · Lesson 9 · Continuers: Chinese-speaking communities",
    note: "Festivals and how families celebrate.",
    frames: [
      frame("festival", "过节", "Festival", [
        col("a1", "过节", "Festival", [
          c("过春节的时候，我们家", "guò Chūnjié de shíhou, wǒmen jiā", "at Spring Festival our family"),
          c("过中秋节，华人社区常常", "guò Zhōngqiūjié, huárén shèqū chángcháng", "at Mid-Autumn Festival the Chinese community often"),
          c("过生日我想", "guò shēngrì wǒ xiǎng", "for my birthday I want to"),
          c("过年的时候，爷爷奶奶会", "guònián de shíhou, yéye nǎinai huì", "at New Year Grandma and Grandpa"),
        ]),
        col("a2", "活动", "Activity", [
          c("一起吃团圆饭", "yìqǐ chī tuányuán fàn", "eat a reunion dinner together"),
          c("看舞龙舞狮", "kàn wǔlóng wǔshī", "watch dragon and lion dancing"),
          c("给长辈拜年", "gěi zhǎngbèi bàinián", "give New Year greetings to elders"),
          c("和朋友去吃饭", "hé péngyou qù chīfàn", "go out to eat with friends"),
        ]),
      ]),
      frame("meaning", "对…来说", "For …", [
        col("b1", "对…来说", "For", [
          c("对我来说，过节最重要的是", "duì wǒ lái shuō, guòjié zuì zhòngyào de shì", "for me the most important thing about a festival is"),
          c("对很多华人来说，春节代表着", "duì hěn duō huárén lái shuō, Chūnjié dàibiǎo zhe", "for many Chinese people Spring Festival represents"),
          c("对年轻人来说，过节也是", "duì niánqīngrén lái shuō, guòjié yě shì", "for young people a festival is also"),
        ]),
        col("b2", "意义", "Meaning", [
          c("和家人在一起", "hé jiārén zài yìqǐ", "being with family"),
          c("团圆和新的开始", "tuányuán hé xīn de kāishǐ", "reunion and a new start"),
          c("放松一下的机会", "fàngsōng yíxià de jīhuì", "a chance to relax"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-environment",
    title: "环境保护很重要",
    titleEn: "Protecting the environment matters",
    year: 12,
    source: "中文真棒 IV · Lesson 10 · Continuers: the changing world",
    note: "Pollution, plastic and what young people can do. Frequent HSC reading topic.",
    frames: [
      frame("problem", "问题", "Problem", [
        col("a1", "谁说", "Who", [
          c("我觉得", "wǒ juéde", "I think"),
          c("新闻说", "xīnwén shuō", "the news says"),
          c("老师说", "lǎoshī shuō", "the teacher says"),
        ]),
        col("a2", "问题", "Issue", [
          c("塑料污染越来越严重", "sùliào wūrǎn yuè lái yuè yánzhòng", "plastic pollution is getting worse"),
          c("乱扔垃圾很不好", "luàn rēng lājī hěn bù hǎo", "littering is really bad"),
          c("浪费水对未来不好", "làngfèi shuǐ duì wèilái bù hǎo", "wasting water is bad for the future"),
          c("空气污染必须改变", "kōngqì wūrǎn bìxū gǎibiàn", "air pollution has to change"),
        ]),
      ]),
      frame("can", "可以", "We can", [
        col("b1", "年轻人可以", "Young people can", [
          c("年轻人可以", "niánqīngrén kěyǐ", "young people can"),
          c("为了保护环境，我们应该", "wèile bǎohù huánjìng, wǒmen yīnggāi", "to protect the environment we should"),
          c("每个人都可以", "měi ge rén dōu kěyǐ", "everyone can"),
        ]),
        col("b2", "行动", "Action", [
          c("减少浪费", "jiǎnshǎo làngfèi", "cut down on waste"),
          c("坐公交车，少开车", "zuò gōngjiāochē, shǎo kāichē", "take the bus and drive less"),
          c("把垃圾分类", "bǎ lājī fēnlèi", "sort the rubbish"),
          c("少用塑料袋", "shǎo yòng sùliào dài", "use fewer plastic bags"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-messaging",
    title: "可以发短信问你吗",
    titleEn: "Can I text you?",
    year: 12,
    source: "中文真棒 IV · Lesson 11 · Continuers: youth / technology",
    note: "Phones, social media and staying in touch.",
    frames: [
      frame("text", "发短信", "Text", [
        col("a1", "主语", "Who", [
          c("有问题的时候我会", "yǒu wèntí de shíhou wǒ huì", "when I have a question I"),
          c("放假我们常常", "fàngjià wǒmen chángcháng", "in the holidays we often"),
          c("老师有时候会", "lǎoshī yǒu shíhou huì", "the teacher sometimes"),
          c("晚上她喜欢", "wǎnshang tā xǐhuan", "in the evening she likes to"),
        ]),
        col("a2", "方式", "How", [
          c("发短信问同学", "fā duǎnxìn wèn tóngxué", "text classmates to ask"),
          c("用手机聊天", "yòng shǒujī liáotiān", "chat on the phone"),
          c("在网上讨论功课", "zài wǎngshàng tǎolùn gōngkè", "discuss homework online"),
          c("发电子邮件", "fā diànzǐ yóujiàn", "send an email"),
        ]),
      ]),
      frame("view", "虽然", "Although", [
        col("b1", "虽然", "Although", [
          c("虽然手机让交流更方便，但是", "suīrán shǒujī ràng jiāoliú gèng fāngbiàn, dànshì", "although phones make contact easier,"),
          c("我觉得", "wǒ juéde", "I think"),
          c("对青少年来说", "duì qīngshàonián lái shuō", "for teenagers"),
        ]),
        col("b2", "看法", "View", [
          c("面对面聊天还是很重要", "miànduìmiàn liáotiān háishi hěn zhòngyào", "talking face to face still matters"),
          c("上网时间太长会影响健康", "shàngwǎng shíjiān tài cháng huì yǐngxiǎng jiànkāng", "too much time online affects health"),
          c("不能一天到晚看手机", "bù néng yì tiān dào wǎn kàn shǒujī", "you cannot look at a phone all day"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-learning-chinese",
    title: "学中文真有趣",
    titleEn: "Learning Chinese is interesting",
    year: 12,
    source: "中文真棒 IV · Lesson 12 · Continuers: education",
    note: "Why we study Chinese — staple HSC oral and writing topic.",
    frames: [
      frame("why", "为什么学", "Why study", [
        col("a1", "我觉得学中文", "I think Chinese", [
          c("我觉得学中文", "wǒ juéde xué Zhōngwén", "I think studying Chinese"),
          c("对澳大利亚学生来说，学中文", "duì Àodàlìyà xuéshēng lái shuō, xué Zhōngwén", "for Australian students, Chinese"),
          c("虽然汉字不容易，但是学中文", "suīrán hànzì bù róngyì, dànshì xué Zhōngwén", "although characters are not easy, studying Chinese"),
          c("对我来说，学中文", "duì wǒ lái shuō, xué Zhōngwén", "for me, studying Chinese"),
        ]),
        col("a2", "评价", "View", [
          c("真有趣", "zhēn yǒuqù", "is really interesting"),
          c("对将来的工作很有帮助", "duì jiānglái de gōngzuò hěn yǒu bāngzhù", "will help a lot with future work"),
          c("让我更了解华人社区", "ràng wǒ gèng liǎojiě huárén shèqū", "helps me understand the Chinese community"),
          c("可以认识更多朋友", "kěyǐ rènshi gèng duō péngyou", "lets me meet more friends"),
        ]),
      ]),
      frame("how", "怎么学", "How I learn", [
        col("b1", "为了提高中文，我", "To improve", [
          c("为了提高中文，我", "wèile tígāo Zhōngwén, wǒ", "to improve my Chinese I"),
          c("除了上课以外，我还", "chúle shàngkè yǐwài, wǒ hái", "besides class I also"),
          c("每天放学以后，我", "měitiān fàngxué yǐhòu, wǒ", "every day after school I"),
        ]),
        col("b2", "方法", "Method", [
          c("每天听中文歌", "měitiān tīng Zhōngwén gē", "listen to Chinese songs every day"),
          c("跟中国朋友练习口语", "gēn Zhōngguó péngyou liànxí kǒuyǔ", "practise speaking with Chinese friends"),
          c("看简单的中文新闻", "kàn jiǎndān de Zhōngwén xīnwén", "read simple Chinese news"),
          c("写一点儿日记", "xiě yìdiǎnr rìjì", "write a little in a diary"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-relationships",
    title: "我和家人的关系",
    titleEn: "My relationship with family",
    year: 12,
    source: "HSC Continuers · The individual — relationships",
    note: "Prescribed theme 1. Typical oral: 和父母相处, 朋友.",
    frames: [
      frame("get-on", "相处", "Get on", [
        col("a1", "主语", "Who", [
          c("我和父母相处得", "wǒ hé fùmǔ xiāngchǔ de", "I get on with my parents"),
          c("我和哥哥的关系", "wǒ hé gēge de guānxi", "my relationship with my older brother is"),
          c("虽然我们有时候会吵架，但是关系还是", "suīrán wǒmen yǒu shíhou huì chǎojià, dànshì guānxi háishi", "although we sometimes argue, our relationship is still"),
          c("我和朋友相处得", "wǒ hé péngyou xiāngchǔ de", "I get on with my friends"),
        ]),
        col("a2", "评价", "How", [
          c("很好", "hěn hǎo", "very good"),
          c("不错", "búcuò", "pretty good"),
          c("越来越好", "yuè lái yuè hǎo", "getting better and better"),
          c("比较亲密", "bǐjiào qīnmì", "quite close"),
        ]),
      ]),
      frame("friends", "朋友", "Friends", [
        col("b1", "对我来说", "For me", [
          c("对我来说，真正的朋友应该", "duì wǒ lái shuō, zhēnzhèng de péngyou yīnggāi", "for me a real friend should"),
          c("遇到困难的时候，朋友会", "yùdào kùnnan de shíhou, péngyou huì", "when I have difficulties, friends will"),
          c("好朋友常常", "hǎo péngyou chángcháng", "good friends often"),
        ]),
        col("b2", "品质", "Quality", [
          c("诚实，也会帮助我", "chéngshí, yě huì bāngzhù wǒ", "be honest and also help me"),
          c("听我说话", "tīng wǒ shuōhuà", "listen to me"),
          c("和我一起想办法", "hé wǒ yìqǐ xiǎng bànfǎ", "think of a way with me"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-communities",
    title: "华人社区的生活",
    titleEn: "Life in Chinese-speaking communities",
    year: 12,
    source: "HSC Continuers · Chinese-speaking communities",
    note: "Prescribed theme 2. Chinatown, language at home, visiting China.",
    frames: [
      frame("community", "社区", "Community", [
        col("a1", "在澳大利亚", "In Australia", [
          c("在澳大利亚的华人社区，人们常常", "zài Àodàlìyà de huárén shèqū, rénmen chángcháng", "in Australia's Chinese communities people often"),
          c("周末很多家庭会去中国城", "zhōumò hěn duō jiātíng huì qù Zhōngguóchéng", "at the weekend many families go to Chinatown to"),
          c("在家里我们有时候", "zài jiā lǐ wǒmen yǒu shíhou", "at home we sometimes"),
          c("过节的时候，大家会", "guòjié de shíhou, dàjiā huì", "at festival time everyone"),
        ]),
        col("a2", "活动", "Activity", [
          c("说中文、吃中餐", "shuō Zhōngwén, chī zhōngcān", "speak Chinese and eat Chinese food"),
          c("买菜、看朋友", "mǎi cài, kàn péngyou", "shop for food and see friends"),
          c("过春节、中秋节", "guò Chūnjié, Zhōngqiūjié", "celebrate Spring Festival and Mid-Autumn"),
          c("去中文学校", "qù Zhōngwén xuéxiào", "go to Chinese school"),
        ]),
      ]),
      frame("visit", "回国", "Visit", [
        col("b1", "如果有机会", "If I have the chance", [
          c("如果有机会去中国，我最想", "rúguǒ yǒu jīhuì qù Zhōngguó, wǒ zuì xiǎng", "if I get the chance to go to China I most want to"),
          c("明年去北京的时候，我想", "míngnián qù Běijīng de shíhou, wǒ xiǎng", "when I go to Beijing next year I want to"),
          c("放假去上海，我想", "fàngjià qù Shànghǎi, wǒ xiǎng", "when I go to Shanghai in the holidays I want to"),
        ]),
        col("b2", "体验", "Experience", [
          c("看看当地的生活", "kànkan dāngdì de shēnghuó", "see local life"),
          c("多说一点儿中文", "duō shuō yìdiǎnr Zhōngwén", "speak a bit more Chinese"),
          c("去几个有名的地方", "qù jǐ ge yǒumíng de dìfang", "visit a few famous places"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y12-youth-issues",
    title: "青年人的压力",
    titleEn: "Pressure on young people",
    year: 12,
    source: "HSC Continuers · The changing world — youth issues",
    note: "Prescribed theme 3. Study pressure, HSC, balance.",
    frames: [
      frame("pressure", "压力", "Pressure", [
        col("a1", "压力", "Pressure", [
          c("很多十二年级的学生觉得", "hěn duō shí'èr niánjí de xuéshēng juéde", "many Year 12 students feel"),
          c("准备HSC的时候，我常常", "zhǔnbèi HSC de shíhou, wǒ chángcháng", "when preparing for the HSC I often"),
          c("父母希望我成绩好，这让我", "fùmǔ xīwàng wǒ chéngjì hǎo, zhè ràng wǒ", "my parents want me to do well, which makes me"),
          c("作业太多的时候，她觉得", "zuòyè tài duō de shíhou, tā juéde", "when there is too much homework she feels"),
        ]),
        col("a2", "感受", "Feeling", [
          c("压力很大", "yālì hěn dà", "under a lot of pressure"),
          c("很累，但是不敢放松", "hěn lèi, dànshì bù gǎn fàngsōng", "tired but afraid to ease off"),
          c("有一点儿担心将来", "yǒu yìdiǎnr dānxīn jiānglái", "a bit worried about the future"),
          c("需要休息一下", "xūyào xiūxi yíxià", "I need a rest"),
        ]),
      ]),
      frame("balance", "平衡", "Balance", [
        col("b1", "我觉得", "I think", [
          c("我觉得学习重要，可是", "wǒ juéde xuéxí zhòngyào, kěshì", "I think study matters, but"),
          c("为了保持健康，年轻人应该", "wèile bǎochí jiànkāng, niánqīngrén yīnggāi", "to stay healthy young people should"),
          c("压力大的时候，我们要", "yālì dà de shíhou, wǒmen yào", "when the pressure is high we should"),
        ]),
        col("b2", "做法", "What to do", [
          c("也要运动和休息", "yě yào yùndòng hé xiūxi", "also exercise and rest"),
          c("跟朋友聊聊心里的压力", "gēn péngyou liáoliao xīn lǐ de yālì", "talk to friends about the pressure"),
          c("给自己一点时间", "gěi zìjǐ yìdiǎn shíjiān", "give ourselves a little time"),
        ]),
      ]),
    ],
  }),
];
