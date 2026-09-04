import type { Album } from "../lib/types";
import { album, c, col, frame } from "./make";

/** Year 7 · Stage 4 · 中文真棒 I Lessons 1–6 */
export const YEAR7: Album[] = [
  album({
    id: "y7-name",
    title: "我叫林月",
    titleEn: "My name is Lin Yue",
    year: 7,
    source: "中文真棒 I · Lesson 1",
    note: "Greet someone and say your name. Stage 4: identity.",
    frames: [
      frame("call", "我叫", "I am called", [
        col("a1", "主语", "Who", [
          c("我叫", "wǒ jiào", "I am called"),
          c("他叫", "tā jiào", "he is called"),
          c("她叫", "tā jiào", "she is called"),
          c("我的朋友叫", "wǒ de péngyou jiào", "my friend is called"),
        ]),
        col("a2", "名字", "Name", [
          c("林月", "Lín Yuè", "Lin Yue"),
          c("李文新", "Lǐ Wénxīn", "Li Wenxin"),
          c("王小东", "Wáng Xiǎodōng", "Wang Xiaodong"),
          c("张心华", "Zhāng Xīnhuá", "Zhang Xinhua"),
          c("朱丽亚", "Zhūlìyà", "Julia"),
        ])
      ]),
      frame("surname", "我姓", "My surname", [
        col("b1", "主语", "Who", [
          c("我姓", "wǒ xìng", "my surname is"),
          c("他姓", "tā xìng", "his surname is"),
          c("她姓", "tā xìng", "her surname is"),
        ]),
        col("b2", "姓", "Surname", [
          c("林", "Lín", "Lin"),
          c("李", "Lǐ", "Li"),
          c("王", "Wáng", "Wang"),
          c("张", "Zhāng", "Zhang"),
          c("朱", "Zhū", "Zhu"),
        ])
      ]),
    ],
  }),

  album({
    id: "y7-age",
    title: "我今年十三岁",
    titleEn: "I am thirteen this year",
    year: 7,
    source: "中文真棒 I · Lesson 2",
    note: "Say when you were born and how old you are.",
    frames: [
      frame("age", "岁数", "Age", [
        col("a1", "主语", "Who", [
          c("我", "wǒ", "I"),
          c("他", "tā", "he"),
          c("她", "tā", "she"),
          c("王小东", "Wáng Xiǎodōng", "Wang Xiaodong"),
        ]),
        col("a2", "时间", "Time", [c("今年", "jīnnián", "this year")]),
        col("a3", "年龄", "Age", [
          c("十二岁", "shí'èr suì", "twelve years old"),
          c("十三岁", "shísān suì", "thirteen years old"),
          c("十四岁", "shísì suì", "fourteen years old"),
          c("十五岁", "shíwǔ suì", "fifteen years old"),
        ])
      ]),
      frame("born", "出生", "Born", [
        col("b1", "主语", "Who", [
          c("我", "wǒ", "I", "wo-b"),
          c("他", "tā", "he", "ta-b"),
          c("她", "tā", "she", "ta-she-b"),
        ]),
        col("b2", "年份", "Year", [
          c("2006年出生", "èr líng líng liù nián chūshēng", "was born in 2006"),
          c("2007年出生", "èr líng líng qī nián chūshēng", "was born in 2007"),
          c("2011年出生", "èr líng yāo yāo nián chūshēng", "was born in 2011"),
          c("2012年出生", "èr líng yāo èr nián chūshēng", "was born in 2012"),
        ])
      ]),
    ],
  }),

  album({
    id: "y7-family",
    title: "我家有五口人",
    titleEn: "There are five people in my family",
    year: 7,
    source: "中文真棒 I · Lesson 3",
    note: "Introduce your family. Stage 4: family and relationships.",
    frames: [
      frame("have", "有家人", "Family members", [
        col("a1", "主语", "Who", [
          c("我家有", "wǒ jiā yǒu", "my family has"),
          c("他家有", "tā jiā yǒu", "his family has"),
          c("她家有", "tā jiā yǒu", "her family has"),
        ]),
        col("a2", "人数", "Number", [
          c("三口人", "sān kǒu rén", "three people"),
          c("四口人", "sì kǒu rén", "four people"),
          c("五口人", "wǔ kǒu rén", "five people"),
          c("六口人", "liù kǒu rén", "six people"),
        ]),
        col("a3", "连接", "Link", [c("，有", ", yǒu", ", with")]),
        col("a4", "成员", "Members", [
          c("爸爸、妈妈和我。", "bàba māma hé wǒ", "Dad, Mum and me."),
          c("爸爸、妈妈、哥哥和我。", "bàba māma gēge hé wǒ", "Dad, Mum, my older brother and me."),
          c("爸爸、妈妈、姐姐和我。", "bàba māma jiějie hé wǒ", "Dad, Mum, my older sister and me."),
          c("爸爸、妈妈、弟弟和妹妹。", "bàba māma dìdi hé mèimei", "Dad, Mum, a younger brother and a younger sister."),
        ]),
      ]),
      frame("this-is", "这是", "This is", [
        col("b1", "指示", "This", [
          c("这是我的", "zhè shì wǒ de", "this is my"),
          c("那是我的", "nà shì wǒ de", "that is my"),
          c("他是我的", "tā shì wǒ de", "he is my"),
          c("她是我的", "tā shì wǒ de", "she is my"),
        ]),
        col("b2", "家人", "Person", [
          c("爸爸", "bàba", "dad"),
          c("妈妈", "māma", "mum"),
          c("哥哥", "gēge", "older brother"),
          c("姐姐", "jiějie", "older sister"),
          c("弟弟", "dìdi", "younger brother"),
          c("妹妹", "mèimei", "younger sister"),
        ])
      ]),
    ],
  }),

  album({
    id: "y7-nationality",
    title: "她住在中国",
    titleEn: "She lives in China",
    year: 7,
    source: "中文真棒 I · Lesson 4",
    note: "Say where someone is from. Negative frame stays grammatical.",
    frames: [
      frame("is", "是…人", "Nationality", [
        col("a1", "主语", "Who", [
          c("我是", "wǒ shì", "I am"),
          c("他是", "tā shì", "he is"),
          c("她是", "tā shì", "she is"),
          c("我爸爸是", "wǒ bàba shì", "my dad is"),
          c("我妈妈是", "wǒ māma shì", "my mum is"),
        ]),
        col("a2", "国籍", "Nationality", [
          c("中国人", "Zhōngguó rén", "Chinese"),
          c("美国人", "Měiguó rén", "American"),
          c("英国人", "Yīngguó rén", "British"),
          c("法国人", "Fǎguó rén", "French"),
          c("德国人", "Déguó rén", "German"),
          c("澳大利亚人", "Àodàlìyà rén", "Australian"),
        ])
      ]),
      frame("isnt", "不是", "Not from", [
        col("b1", "主语", "Who", [
          c("我不是", "wǒ bú shì", "I am not"),
          c("他不是", "tā bú shì", "he is not"),
          c("她不是", "tā bú shì", "she is not"),
        ]),
        col("b2", "国籍", "Nationality", [
          c("美国人", "Měiguó rén", "American", "am-b"),
          c("英国人", "Yīngguó rén", "British", "uk-b"),
          c("法国人", "Fǎguó rén", "French", "fr-b"),
          c("韩国人", "Hánguó rén", "Korean"),
        ])
      ]),
    ],
  }),

  album({
    id: "y7-grew-up",
    title: "她在北京长大",
    titleEn: "She grew up in Beijing",
    year: 7,
    source: "中文真棒 I · Lesson 5",
    note: "Say where you live and where you grew up.",
    frames: [
      frame("live", "住在", "Live in", [
        col("a1", "主语", "Who", [
          c("我住在", "wǒ zhù zài", "I live in"),
          c("他住在", "tā zhù zài", "he lives in"),
          c("她住在", "tā zhù zài", "she lives in"),
          c("我们住在", "wǒmen zhù zài", "we live in"),
        ]),
        col("a2", "地方", "Place", [
          c("北京", "Běijīng", "Beijing"),
          c("上海", "Shànghǎi", "Shanghai"),
          c("台北", "Táiběi", "Taipei"),
          c("香港", "Xiānggǎng", "Hong Kong"),
          c("悉尼", "Xīní", "Sydney"),
          c("纽约", "Niǔyuē", "New York"),
        ])
      ]),
      frame("grew", "长大", "Grew up", [
        col("b1", "主语", "Who", [
          c("我在", "wǒ zài", "I"),
          c("他在", "tā zài", "he"),
          c("她在", "tā zài", "she"),
        ]),
        col("b2", "地方", "Place", [
          c("北京", "Běijīng", "Beijing", "bj-b"),
          c("上海", "Shànghǎi", "Shanghai", "sh-b"),
          c("东京", "Dōngjīng", "Tokyo"),
          c("巴黎", "Bālí", "Paris"),
          c("伦敦", "Lúndūn", "London"),
        ]),
        col("b3", "动词", "Verb", [c("长大。", "zhǎngdà", "grew up.")]),
      ]),
    ],
  }),

  album({
    id: "y7-languages",
    title: "我会说汉语",
    titleEn: "I can speak Chinese",
    year: 7,
    source: "中文真棒 I · Lesson 6",
    note: "Say which languages you can and cannot speak.",
    frames: [
      frame("can", "会说", "Can speak", [
        col("a1", "主语", "Who", [
          c("我会说", "wǒ huì shuō", "I can speak"),
          c("他会说", "tā huì shuō", "he can speak"),
          c("她会说", "tā huì shuō", "she can speak"),
          c("我爸爸会说", "wǒ bàba huì shuō", "my dad can speak"),
          c("我妈妈会说", "wǒ māma huì shuō", "my mum can speak"),
        ]),
        col("a2", "语言", "Language", [
          c("汉语", "Hànyǔ", "Mandarin"),
          c("英语", "Yīngyǔ", "English"),
          c("法语", "Fǎyǔ", "French"),
          c("德语", "Déyǔ", "German"),
          c("一点儿汉语", "yìdiǎnr Hànyǔ", "a little Mandarin"),
        ])
      ]),
      frame("cannot", "不会说", "Cannot speak", [
        col("b1", "主语", "Who", [
          c("我不会说", "wǒ bú huì shuō", "I cannot speak"),
          c("他不会说", "tā bú huì shuō", "he cannot speak"),
          c("他们不会说", "tāmen bú huì shuō", "they cannot speak"),
        ]),
        col("b2", "语言", "Language", [
          c("汉语", "Hànyǔ", "Mandarin", "han-b"),
          c("法语", "Fǎyǔ", "French", "fr-b"),
          c("日语", "Rìyǔ", "Japanese"),
          c("西班牙语", "Xībānyáyǔ", "Spanish"),
        ])
      ]),
    ],
  }),
];
