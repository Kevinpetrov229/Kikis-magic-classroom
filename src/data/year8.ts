import type { Album } from "../lib/types";
import { album, c, col, frame } from "./make";

/** Year 8 · Stage 4 · 中文真棒 I Lessons 7–12 */
export const YEAR8: Album[] = [
  album({
    id: "y8-subjects",
    title: "我喜欢体育",
    titleEn: "I like PE",
    year: 8,
    source: "中文真棒 I · Lesson 7",
    note: "Talk about school subjects and which day you have them.",
    frames: [
      frame("like", "喜欢", "Like", [
        col("a1", "主语", "Who", [
          c("我喜欢", "wǒ xǐhuan", "I like"),
          c("他喜欢", "tā xǐhuan", "he likes"),
          c("她最喜欢", "tā zuì xǐhuan", "she likes … most"),
          c("我们喜欢", "wǒmen xǐhuan", "we like"),
        ]),
        col("a2", "科目", "Subject", [
          c("体育", "tǐyù", "PE"),
          c("数学", "shùxué", "maths"),
          c("科学", "kēxué", "science"),
          c("地理", "dìlǐ", "geography"),
          c("历史", "lìshǐ", "history"),
          c("音乐", "yīnyuè", "music"),
          c("美术", "měishù", "visual arts"),
        ])
      ]),
      frame("have", "有课", "Have a lesson", [
        col("b1", "时间", "When", [
          c("星期一", "xīngqīyī", "on Monday"),
          c("星期二", "xīngqī'èr", "on Tuesday"),
          c("星期三", "xīngqīsān", "on Wednesday"),
          c("星期五", "xīngqīwǔ", "on Friday"),
          c("每天", "měitiān", "every day"),
        ]),
        col("b2", "主语", "Who", [
          c("我有", "wǒ yǒu", "I have"),
          c("我们有", "wǒmen yǒu", "we have"),
        ]),
        col("b3", "科目", "Subject", [
          c("体育课", "tǐyù kè", "PE"),
          c("数学课", "shùxué kè", "maths"),
          c("音乐课", "yīnyuè kè", "music"),
          c("两节科学课", "liǎng jié kēxué kè", "two science periods"),
        ])
      ]),
    ],
  }),

  album({
    id: "y8-routine",
    title: "我六点半起床",
    titleEn: "I get up at half past six",
    year: 8,
    source: "中文真棒 I · Lesson 8",
    note: "Daily routine with clock times. Stage 4: daily life.",
    frames: [
      frame("time", "作息", "Routine", [
        col("a1", "主语", "Who", [
          c("我", "wǒ", "I"),
          c("他", "tā", "he"),
          c("她", "tā", "she"),
          c("我哥哥", "wǒ gēge", "my older brother"),
        ]),
        col("a2", "时间", "Time", [
          c("早上六点半", "zǎoshang liù diǎn bàn", "at half past six in the morning"),
          c("早上七点", "zǎoshang qī diǎn", "at seven in the morning"),
          c("中午十二点", "zhōngwǔ shí'èr diǎn", "at twelve noon"),
          c("下午四点", "xiàwǔ sì diǎn", "at four in the afternoon"),
          c("晚上九点半", "wǎnshang jiǔ diǎn bàn", "at half past nine at night"),
        ]),
        col("a3", "活动", "Activity", [
          c("起床", "qǐchuáng", "get up"),
          c("吃早饭", "chī zǎofàn", "eat breakfast"),
          c("上学", "shàngxué", "go to school"),
          c("放学回家", "fàngxué huí jiā", "finish school and go home"),
          c("做功课", "zuò gōngkè", "do homework"),
          c("睡觉", "shuìjiào", "go to sleep"),
        ])
      ]),
      frame("then", "先…然后", "First … then", [
        col("b1", "主语", "Who", [c("我先", "wǒ xiān", "first I"), c("他先", "tā xiān", "first he")]),
        col("b2", "第一件", "First", [
          c("吃早饭", "chī zǎofàn", "eat breakfast", "bf-b"),
          c("做功课", "zuò gōngkè", "do homework", "hw-b"),
          c("回家", "huí jiā", "go home"),
        ]),
        col("b3", "然后", "Then", [c("，然后", ", ránhòu", ", and then")]),
        col("b4", "第二件", "Next", [
          c("上学。", "shàngxué", "go to school."),
          c("吃饭。", "chīfàn", "eat."),
          c("睡觉。", "shuìjiào", "go to sleep.", "sleep-b"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y8-hobbies",
    title: "他的爱好是运动",
    titleEn: "His hobby is sport",
    year: 8,
    source: "中文真棒 I · Lesson 9",
    note: "Say what you like doing after school.",
    frames: [
      frame("hobby", "爱好", "Hobby", [
        col("a1", "主语", "Who", [
          c("我的爱好是", "wǒ de àihào shì", "my hobby is"),
          c("他的爱好是", "tā de àihào shì", "his hobby is"),
          c("她的爱好是", "tā de àihào shì", "her hobby is"),
        ]),
        col("a2", "活动", "Activity", [
          c("运动", "yùndòng", "sport"),
          c("唱歌", "chànggē", "singing"),
          c("跳舞", "tiàowǔ", "dancing"),
          c("上网", "shàngwǎng", "going online"),
          c("打篮球", "dǎ lánqiú", "playing basketball"),
          c("游泳", "yóuyǒng", "swimming"),
        ])
      ]),
      frame("do", "一起做", "Do together", [
        col("b1", "主语", "Who", [
          c("我喜欢", "wǒ xǐhuan", "I like to"),
          c("我们喜欢", "wǒmen xǐhuan", "we like to"),
          c("我常和朋友", "wǒ cháng hé péngyou", "I often, with friends,"),
        ]),
        col("b2", "地点", "Place", [
          c("在家里", "zài jiā lǐ", "at home"),
          c("在公园", "zài gōngyuán", "in the park"),
          c("在学校", "zài xuéxiào", "at school"),
        ]),
        col("b3", "活动", "Activity", [
          c("踢足球", "tī zúqiú", "play football"),
          c("打网球", "dǎ wǎngqiú", "play tennis"),
          c("跑步", "pǎobù", "go jogging"),
          c("听音乐", "tīng yīnyuè", "listen to music"),
          c("玩游戏", "wán yóuxì", "play games"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y8-meals",
    title: "他很喜欢中餐",
    titleEn: "He likes Chinese food very much",
    year: 8,
    source: "中文真棒 I · Lesson 10",
    note: "Say what meals you like, with frequency.",
    frames: [
      frame("like", "喜欢吃", "Like eating", [
        col("a1", "主语", "Who", [
          c("我", "wǒ", "I"),
          c("他", "tā", "he"),
          c("她", "tā", "she"),
        ]),
        col("a2", "程度", "How often", [
          c("很喜欢", "hěn xǐhuan", "really likes"),
          c("非常喜欢", "fēicháng xǐhuan", "likes very much"),
          c("常常吃", "chángcháng chī", "often eats"),
          c("有时候吃", "yǒu shíhou chī", "sometimes eats"),
        ]),
        col("a3", "食物", "Food", [
          c("中餐", "zhōngcān", "Chinese food"),
          c("西餐", "xīcān", "Western food"),
          c("饺子", "jiǎozi", "dumplings"),
          c("面条", "miàntiáo", "noodles"),
          c("包子", "bāozi", "steamed buns"),
          c("快餐", "kuàicān", "fast food"),
        ])
      ]),
      frame("example", "比如", "For example", [
        col("b1", "主语", "Who", [c("我喜欢中餐，比如", "wǒ xǐhuan zhōngcān, bǐrú", "I like Chinese food, for example")]),
        col("b2", "食物", "Food", [
          c("粥", "zhōu", "congee"),
          c("油条", "yóutiáo", "fried dough sticks"),
          c("饺子和面条", "jiǎozi hé miàntiáo", "dumplings and noodles"),
        ])
      ]),
    ],
  }),

  album({
    id: "y8-drinks",
    title: "冰奶茶很好喝",
    titleEn: "Iced milk tea is tasty",
    year: 8,
    source: "中文真棒 I · Lesson 11",
    note: "Order a drink or a dish and say how it tastes.",
    frames: [
      frame("order", "点了", "Ordered", [
        col("a1", "主语", "Who", [
          c("我昨天点了", "wǒ zuótiān diǎn le", "yesterday I ordered"),
          c("他点了", "tā diǎn le", "he ordered"),
          c("我们点了", "wǒmen diǎn le", "we ordered"),
        ]),
        col("a2", "饮料", "Item", [
          c("一杯冰奶茶", "yì bēi bīng nǎichá", "a cup of iced milk tea"),
          c("一杯热咖啡", "yì bēi rè kāfēi", "a cup of hot coffee"),
          c("一杯果汁", "yì bēi guǒzhī", "a glass of juice"),
          c("一碗炒饭", "yì wǎn chǎofàn", "a bowl of fried rice"),
          c("一份沙拉", "yí fèn shālā", "a serving of salad"),
        ])
      ]),
      frame("taste", "好喝", "Tastes good", [
        col("b1", "食物", "Item", [
          c("冰奶茶", "bīng nǎichá", "iced milk tea"),
          c("热咖啡", "rè kāfēi", "hot coffee"),
          c("果汁", "guǒzhī", "juice"),
        ]),
        col("b2", "评价", "Opinion", [
          c("很好喝", "hěn hǎohē", "tastes good"),
          c("有一点儿甜", "yǒu yìdiǎnr tián", "is a bit sweet"),
          c("不太好喝", "bú tài hǎohē", "doesn't taste very good"),
        ])
      ]),
    ],
  }),

  album({
    id: "y8-flavour",
    title: "橙子有一点儿酸",
    titleEn: "The orange is a little sour",
    year: 8,
    source: "中文真棒 I · Lesson 12",
    note: "Describe flavour and give a reason with 因为.",
    frames: [
      frame("taste", "味道", "Flavour", [
        col("a1", "食物", "Food", [
          c("橙子", "chéngzi", "oranges"),
          c("苹果", "píngguǒ", "apples"),
          c("西瓜", "xīguā", "watermelon"),
          c("海鲜", "hǎixiān", "seafood"),
          c("蔬菜", "shūcài", "vegetables"),
        ]),
        col("a2", "味道", "Taste", [
          c("有一点儿酸", "yǒu yìdiǎnr suān", "are a little sour"),
          c("很甜", "hěn tián", "are very sweet"),
          c("有一点儿辣", "yǒu yìdiǎnr là", "are a little spicy"),
          c("有一点儿咸", "yǒu yìdiǎnr xián", "are a little salty"),
        ])
      ]),
      frame("because", "因为", "Because", [
        col("b1", "主语", "Who", [
          c("我不买橙子，因为", "wǒ bù mǎi chéngzi, yīnwèi", "I don't buy oranges because"),
          c("他不吃海鲜，因为", "tā bù chī hǎixiān, yīnwèi", "he doesn't eat seafood because"),
          c("她喜欢西瓜，因为", "tā xǐhuan xīguā, yīnwèi", "she likes watermelon because"),
        ]),
        col("b2", "理由", "Reason", [
          c("太酸了。", "tài suān le", "it is too sour."),
          c("有一点儿苦。", "yǒu yìdiǎnr kǔ", "it is a bit bitter."),
          c("很甜。", "hěn tián", "it is very sweet.", "sweet-b"),
        ]),
      ]),
    ],
  }),
];
