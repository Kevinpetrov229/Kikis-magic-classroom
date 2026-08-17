import type { Album, ActivityMeta, Chunk } from "../lib/types";

/**
 * Every combination inside a frame has to be grammatical Chinese, which is what
 * makes frames rather than one big table the unit of authoring.
 */
const c = (hz: string, py: string, en: string): Chunk => ({ id: hz, hz, py, en });

const GIFT_OBJECTS: Chunk[] = [
  c("一盒巧克力", "yì hé qiǎokèlì", "a box of chocolates"),
  c("一张礼品券", "yì zhāng lǐpǐn quàn", "a gift voucher"),
  c("一张卡片", "yì zhāng kǎpiàn", "a card"),
  c("一张电影票", "yì zhāng diànyǐng piào", "a movie ticket"),
  c("一个书包", "yí ge shūbāo", "a schoolbag"),
  c("一件衣服", "yí jiàn yīfu", "a piece of clothing"),
  c("一支笔", "yì zhī bǐ", "a pen"),
  c("一本小说", "yì běn xiǎoshuō", "a novel"),
  c("一个蛋糕", "yí ge dàngāo", "a cake"),
];

export const GIFTS: Album = {
  id: "gifts",
  title: "买礼物",
  titleEn: "Buying gifts",
  note: "Give a present to someone and say what you think of the idea.",
  created: 0,
  updated: 0,
  frames: [
    {
      id: "want",
      label: "想送",
      labelEn: "Wanting to give",
      columns: [
        {
          id: "g-a1",
          label: "意愿",
          labelEn: "Intention",
          chunks: [c("我想送", "wǒ xiǎng sòng", "I want to give")],
        },
        {
          id: "g-a2",
          label: "对象",
          labelEn: "Recipient",
          chunks: [
            c("她", "tā", "her"),
            c("妈妈", "māma", "Mom"),
            c("妹妹", "mèimei", "younger sister"),
            c("老师", "lǎoshī", "teacher"),
            c("好朋友", "hǎo péngyou", "good friend"),
            c("女朋友", "nǚ péngyou", "girlfriend"),
          ],
        },
        { id: "g-a3", label: "礼物", labelEn: "Gift", chunks: GIFT_OBJECTS },
        {
          id: "g-a4",
          label: "连接",
          labelEn: "Connective",
          chunks: [c("，因为我觉得", "yīnwèi wǒ juéde", ", because I think")],
        },
        {
          id: "g-a5",
          label: "看法",
          labelEn: "Opinion",
          chunks: [
            c("送这个很有意思。", "sòng zhège hěn yǒu yìsi", "giving this is very interesting."),
            c("送这个礼物很不错。", "sòng zhège lǐwù hěn búcuò", "giving this gift is very nice."),
            c("她会喜欢这个礼物。", "tā huì xǐhuan zhège lǐwù", "she will like this gift."),
            c("这个礼物很特别。", "zhège lǐwù hěn tèbié", "this gift is very special."),
          ],
        },
      ],
    },
    {
      id: "wont",
      label: "不想送",
      labelEn: "Not wanting to give",
      columns: [
        {
          id: "g-b1",
          label: "意愿",
          labelEn: "Intention",
          chunks: [c("我不想送", "wǒ bù xiǎng sòng", "I don't want to give")],
        },
        {
          id: "g-b2",
          label: "对象",
          labelEn: "Recipient",
          chunks: [
            c("他", "tā", "him"),
            c("爸爸", "bàba", "Dad"),
            c("哥哥", "gēge", "older brother"),
            c("老师", "lǎoshī", "teacher"),
            c("好朋友", "hǎo péngyou", "good friend"),
            c("男朋友", "nán péngyou", "boyfriend"),
          ],
        },
        { id: "g-b3", label: "礼物", labelEn: "Gift", chunks: GIFT_OBJECTS },
        {
          id: "g-b4",
          label: "连接",
          labelEn: "Connective",
          chunks: [c("，因为我觉得", "yīnwèi wǒ juéde", ", because I think")],
        },
        {
          id: "g-b5",
          label: "看法",
          labelEn: "Opinion",
          chunks: [
            c("送这个没有意思。", "sòng zhège méiyǒu yìsi", "giving this is not interesting."),
            c("送这个太无聊了。", "sòng zhège tài wúliáo le", "giving this is too boring."),
            c("送这个有点贵。", "sòng zhège yǒudiǎn guì", "giving this is a bit expensive."),
            c("他不会喜欢这个礼物。", "tā bú huì xǐhuan zhège lǐwù", "he will not like this gift."),
          ],
        },
      ],
    },
  ],
};

const DAY_ACTIONS: Chunk[] = [
  c("起床", "qǐchuáng", "get up"),
  c("吃早饭", "chī zǎofàn", "eat breakfast"),
  c("去学校", "qù xuéxiào", "go to school"),
  c("做作业", "zuò zuòyè", "do homework"),
  c("打篮球", "dǎ lánqiú", "play basketball"),
  c("看电视", "kàn diànshì", "watch TV"),
  c("玩手机", "wán shǒujī", "play on my phone"),
  c("睡觉", "shuìjiào", "go to sleep"),
];

const DAY_SUBJECTS: Chunk[] = [
  c("我", "wǒ", "I"),
  c("我的哥哥", "wǒ de gēge", "my older brother"),
  c("我的妹妹", "wǒ de mèimei", "my younger sister"),
  c("我和朋友", "wǒ hé péngyou", "my friends and I"),
];

const DAY_FEELINGS: Chunk[] = [
  c("我觉得很累。", "wǒ juéde hěn lèi", "I feel very tired."),
  c("我觉得很开心。", "wǒ juéde hěn kāixīn", "I feel very happy."),
  c("我有一点饿。", "wǒ yǒu yìdiǎn è", "I am a little hungry."),
  c("我要休息一下。", "wǒ yào xiūxi yíxià", "I want to rest for a bit."),
];

export const ROUTINE: Album = {
  id: "routine",
  title: "我的一天",
  titleEn: "My day",
  note: "Say when you do something and how it leaves you feeling.",
  created: 0,
  updated: 0,
  frames: [
    {
      id: "school",
      label: "上学的日子",
      labelEn: "School days",
      columns: [
        {
          id: "r-a1",
          label: "时间",
          labelEn: "Time",
          chunks: [
            c("早上七点", "zǎoshang qī diǎn", "at seven in the morning"),
            c("早上八点半", "zǎoshang bā diǎn bàn", "at half past eight in the morning"),
            c("中午十二点", "zhōngwǔ shí'èr diǎn", "at twelve noon"),
            c("下午四点", "xiàwǔ sì diǎn", "at four in the afternoon"),
            c("晚上九点半", "wǎnshang jiǔ diǎn bàn", "at half past nine at night"),
          ],
        },
        { id: "r-a2", label: "主语", labelEn: "Subject", chunks: DAY_SUBJECTS },
        { id: "r-a3", label: "活动", labelEn: "Activity", chunks: DAY_ACTIONS },
        {
          id: "r-a4",
          label: "连接",
          labelEn: "Connective",
          chunks: [c("，然后", "ránhòu", ", and then")],
        },
        { id: "r-a5", label: "感受", labelEn: "Feeling", chunks: DAY_FEELINGS },
      ],
    },
    {
      id: "weekend",
      label: "周末和假期",
      labelEn: "Weekends and holidays",
      columns: [
        {
          id: "r-b1",
          label: "时间",
          labelEn: "Time",
          chunks: [
            c("星期六早上", "xīngqīliù zǎoshang", "on Saturday morning"),
            c("星期天下午", "xīngqītiān xiàwǔ", "on Sunday afternoon"),
            c("放假的时候", "fàngjià de shíhou", "during the holidays"),
            c("每个周末", "měi ge zhōumò", "every weekend"),
          ],
        },
        { id: "r-b2", label: "主语", labelEn: "Subject", chunks: DAY_SUBJECTS },
        { id: "r-b3", label: "活动", labelEn: "Activity", chunks: DAY_ACTIONS },
        {
          id: "r-b4",
          label: "连接",
          labelEn: "Connective",
          chunks: [c("，所以", "suǒyǐ", ", so")],
        },
        { id: "r-b5", label: "感受", labelEn: "Feeling", chunks: DAY_FEELINGS },
      ],
    },
  ],
};

const FAMILY_PEOPLE: Chunk[] = [
  c("我的爸爸", "wǒ de bàba", "my dad"),
  c("我的妈妈", "wǒ de māma", "my mum"),
  c("我的哥哥", "wǒ de gēge", "my older brother"),
  c("我的姐姐", "wǒ de jiějie", "my older sister"),
  c("我的妹妹", "wǒ de mèimei", "my younger sister"),
];

const FAMILY_TRAITS: Chunk[] = [
  c("高", "gāo", "tall"),
  c("瘦", "shòu", "thin"),
  c("友好", "yǒuhǎo", "friendly"),
  c("严格", "yángé", "strict"),
  c("幽默", "yōumò", "funny"),
  c("安静", "ānjìng", "quiet"),
];

export const FAMILY: Album = {
  id: "family",
  title: "我的家人",
  titleEn: "My family",
  note: "Describe someone at home, then say something about your relationship.",
  created: 0,
  updated: 0,
  frames: [
    {
      id: "positive",
      label: "肯定",
      labelEn: "Affirmative",
      columns: [
        { id: "f-a1", label: "家人", labelEn: "Person", chunks: FAMILY_PEOPLE },
        {
          id: "f-a2",
          label: "程度",
          labelEn: "Degree",
          chunks: [
            c("很", "hěn", "is very"),
            c("非常", "fēicháng", "is extremely"),
            c("有一点", "yǒu yìdiǎn", "is a little"),
          ],
        },
        { id: "f-a3", label: "特点", labelEn: "Trait", chunks: FAMILY_TRAITS },
        {
          id: "f-a4",
          label: "连接",
          labelEn: "Connective",
          chunks: [c("，而且", "érqiě", ", and moreover")],
        },
        {
          id: "f-a5",
          label: "关系",
          labelEn: "Relationship",
          chunks: [
            c("我们常常一起看电视。", "wǒmen chángcháng yìqǐ kàn diànshì", "we often watch TV together."),
            c("我很喜欢和家人聊天。", "wǒ hěn xǐhuan hé jiārén liáotiān", "I really like chatting with my family."),
            c("我们的关系很好。", "wǒmen de guānxi hěn hǎo", "our relationship is very good."),
          ],
        },
      ],
    },
    {
      id: "negative",
      label: "否定",
      labelEn: "Negative",
      columns: [
        { id: "f-b1", label: "家人", labelEn: "Person", chunks: FAMILY_PEOPLE },
        {
          id: "f-b2",
          label: "程度",
          labelEn: "Degree",
          chunks: [
            c("不太", "bú tài", "is not very"),
            c("一点也不", "yìdiǎn yě bù", "is not at all"),
          ],
        },
        { id: "f-b3", label: "特点", labelEn: "Trait", chunks: FAMILY_TRAITS },
        {
          id: "f-b4",
          label: "连接",
          labelEn: "Connective",
          chunks: [c("，可是", "kěshì", ", but")],
        },
        {
          id: "f-b5",
          label: "关系",
          labelEn: "Relationship",
          chunks: [
            c("我们的关系还不错。", "wǒmen de guānxi hái búcuò", "our relationship is still pretty good."),
            c("我还是很爱我的家人。", "wǒ háishi hěn ài wǒ de jiārén", "I still love my family very much."),
            c("我们很少吵架。", "wǒmen hěn shǎo chǎojià", "we rarely argue."),
          ],
        },
      ],
    },
  ],
};

export const SEED_ALBUMS: Album[] = [GIFTS, ROUTINE, FAMILY];

export const ACTIVITIES: ActivityMeta[] = [
  {
    id: "jumble",
    hz: "听写拼句",
    en: "Dictation jumble",
    strand: "Listening",
    brief: "Hear the sentence, then stamp the chunks back in the right order.",
  },
  {
    id: "missing",
    hz: "找缺失",
    en: "Find the missing chunk",
    strand: "Into Chinese",
    brief: "One chunk is missing from the Chinese. Read the English and stamp it in.",
  },
  {
    id: "match",
    hz: "配句意",
    en: "Sentence match",
    strand: "Into English",
    brief: "Read the Chinese and choose the English that matches it exactly.",
  },
  {
    id: "trapdoor",
    hz: "陷门",
    en: "Trapdoor",
    strand: "Memory",
    brief: "Guess the hidden sentence chunk by chunk. One wrong stamp and the page is wiped.",
  },
  {
    id: "typing",
    hz: "跟打练习",
    en: "Typing practice",
    strand: "Writing",
    brief: "Type the sentence character by character with a Chinese punctuation pad.",
  },
  {
    id: "cloze",
    hz: "选词填空",
    en: "Cloze",
    strand: "Into Chinese",
    brief: "One word bank, five sentences, one gap in each.",
  },
  {
    id: "order",
    hz: "句子排序",
    en: "Sentence ordering",
    strand: "Into Chinese",
    brief: "Drag the scrambled chunks into a sentence that works.",
  },
  {
    id: "trace",
    hz: "写汉字",
    en: "Character writing",
    strand: "Writing",
    brief: "Trace the stroke order of every character the album teaches.",
  },
];
