import type { Album } from "../lib/types";
import { album, c, col, frame } from "./make";

/** Year 11 · Stage 6 Continuers · Preliminary · 中文真棒 IV Lessons 1–6 */
export const YEAR11: Album[] = [
  album({
    id: "y11-lets-go",
    title: "我们出发吧",
    titleEn: "Let's go",
    year: 11,
    source: "中文真棒 IV · Lesson 1 · Continuers: leisure / travel",
    note: "Book tickets: 出发地, 目的地, 自由行 / 跟团游.",
    frames: [
      frame("plan", "打算", "Plan", [
        col("a1", "主语", "Who", [
          c("暑假我们打算", "shǔjià wǒmen dǎsuàn", "in the summer holidays we plan to"),
          c("林月想", "Lín Yuè xiǎng", "Lin Yue wants to"),
          c("他们决定", "tāmen juédìng", "they have decided to"),
          c("爱莎希望", "Àishā xīwàng", "Aisha hopes to"),
        ]),
        col("a2", "方式", "How", [
          c("自由行去桂林", "zìyóuxíng qù Guìlín", "travel independently to Guilin"),
          c("跟团游去上海", "gēntuán yóu qù Shànghǎi", "take a tour to Shanghai"),
          c("坐高铁去南京", "zuò gāotiě qù Nánjīng", "take the high-speed rail to Nanjing"),
          c("先坐飞机到上海", "xiān zuò fēijī dào Shànghǎi", "fly to Shanghai first"),
        ]),
      ]),
      frame("ticket", "订票", "Book", [
        col("b1", "我想", "I want", [
          c("我想订", "wǒ xiǎng dìng", "I want to book"),
          c("我们可以买", "wǒmen kěyǐ mǎi", "we can buy"),
          c("有学生证可以半价买", "yǒu xuéshēngzhèng kěyǐ bànjià mǎi", "with a student card you can buy at half price"),
        ]),
        col("b2", "票", "Ticket", [
          c("高铁票", "gāotiě piào", "high-speed rail tickets"),
          c("单程票", "dānchéng piào", "a one-way ticket"),
          c("来回票", "láihuí piào", "a return ticket"),
          c("机票", "jīpiào", "plane tickets"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y11-luggage",
    title: "行李收好了吗",
    titleEn: "Have you packed?",
    year: 11,
    source: "中文真棒 IV · Lesson 2",
    note: "Packing, 了吗, and travel documents.",
    frames: [
      frame("packed", "收好了吗", "Packed?", [
        col("a1", "谁的", "Whose", [
          c("你的", "nǐ de", "have you"),
          c("他的", "tā de", "has he"),
          c("我们的", "wǒmen de", "have we"),
        ]),
        col("a2", "物品", "Item", [
          c("行李", "xíngli", "luggage"),
          c("护照", "hùzhào", "passport"),
          c("机票", "jīpiào", "tickets"),
          c("学生证", "xuéshēngzhèng", "student card"),
        ]),
        col("a3", "了吗", "Yet", [c("收好了吗？", "shōu hǎo le ma", "been packed?")]),
      ]),
      frame("need", "要带", "Need to bring", [
        col("b1", "去旅行要带", "For the trip", [
          c("去旅行要带", "qù lǚxíng yào dài", "for the trip you need to bring"),
          c("我已经带了", "wǒ yǐjīng dài le", "I have already packed"),
          c("她还没带", "tā hái méi dài", "she still has not packed"),
        ]),
        col("b2", "物品", "Item", [
          c("护照和学生证", "hùzhào hé xuéshēngzhèng", "a passport and student card"),
          c("一些衣服和充电器", "yìxiē yīfu hé chōngdiànqì", "some clothes and a charger"),
          c("一点儿人民币", "yìdiǎnr rénmínbì", "a bit of RMB"),
          c("雨伞和药", "yǔsǎn hé yào", "an umbrella and medicine"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y11-tourism",
    title: "你打算去哪儿旅游",
    titleEn: "Where do you plan to travel?",
    year: 11,
    source: "中文真棒 IV · Lesson 3 · Continuers: Chinese-speaking communities",
    note: "Famous sites and 听说.",
    frames: [
      frame("heard", "听说", "I hear", [
        col("a1", "听说", "I hear", [
          c("我听说桂林很美，所以", "wǒ tīngshuō Guìlín hěn měi, suǒyǐ", "I hear Guilin is beautiful, so"),
          c("我听说东方明珠塔很漂亮，所以", "wǒ tīngshuō Dōngfāng Míngzhūtǎ hěn piàoliang, suǒyǐ", "I hear the Oriental Pearl Tower is beautiful, so"),
          c("我还没坐过高铁，所以", "wǒ hái méi zuò guo gāotiě, suǒyǐ", "I have never taken high-speed rail, so"),
          c("小东说南京有意思，所以", "Xiǎodōng shuō Nánjīng yǒu yìsi, suǒyǐ", "Xiaodong says Nanjing is interesting, so"),
        ]),
        col("a2", "打算", "Plan", [
          c("很想去看看", "hěn xiǎng qù kànkan", "I really want to go and see it"),
          c("想体验一下", "xiǎng tǐyàn yíxià", "I want to try it"),
          c("打算明年去", "dǎsuàn míngnián qù", "I plan to go next year"),
        ]),
      ]),
      frame("sites", "名胜", "Sites", [
        col("b1", "我想去", "I want to go", [
          c("我想去", "wǒ xiǎng qù", "I want to go to"),
          c("旅行团会去", "lǚxíng tuán huì qù", "the tour will go to"),
          c("他们打算去", "tāmen dǎsuàn qù", "they plan to go to"),
        ]),
        col("b2", "地点", "Place", [
          c("夫子庙", "Fūzǐ Miào", "the Confucius Temple"),
          c("中山陵", "Zhōngshān Líng", "Sun Yat-sen's Mausoleum"),
          c("桂林和阳朔", "Guìlín hé Yángshuò", "Guilin and Yangshuo"),
          c("上海外滩", "Shànghǎi Wàitān", "the Bund in Shanghai"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y11-buildings",
    title: "这些建筑很好看",
    titleEn: "These buildings are beautiful",
    year: 11,
    source: "中文真棒 IV · Lesson 4",
    note: "Describe architecture and compare cities.",
    frames: [
      frame("look", "好看", "Look good", [
        col("a1", "建筑", "Building", [
          c("这些建筑", "zhèxiē jiànzhù", "these buildings"),
          c("上海的高楼", "Shànghǎi de gāolóu", "Shanghai's tall buildings"),
          c("传统的房子", "chuántǒng de fángzi", "traditional houses"),
          c("北京的胡同", "Běijīng de hútòng", "Beijing's hutongs"),
        ]),
        col("a2", "评价", "Opinion", [
          c("很好看", "hěn hǎokàn", "look really good"),
          c("很有特色", "hěn yǒu tèsè", "are very distinctive"),
          c("又现代又漂亮", "yòu xiàndài yòu piàoliang", "are both modern and beautiful"),
          c("很有历史感", "hěn yǒu lìshǐ gǎn", "feel very historic"),
        ]),
      ]),
      frame("compare", "比", "Compare", [
        col("b1", "比较", "Compare", [
          c("上海的建筑比北京的", "Shànghǎi de jiànzhù bǐ Běijīng de", "Shanghai's buildings, compared with Beijing's, are"),
          c("老房子比新楼", "lǎo fángzi bǐ xīn lóu", "old houses, compared with new blocks, are"),
          c("外滩比市中心", "Wàitān bǐ shì zhōngxīn", "the Bund, compared with the city centre, is"),
        ]),
        col("b2", "结果", "Result", [
          c("更高", "gèng gāo", "taller"),
          c("更有历史感", "gèng yǒu lìshǐ gǎn", "more historic"),
          c("更特别", "gèng tèbié", "more special"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y11-future",
    title: "你将来有什么打算",
    titleEn: "What are your plans for the future?",
    year: 11,
    source: "中文真棒 IV · Lesson 5 · Continuers: the individual — aspirations",
    note: "Future study and work. Core HSC oral topic.",
    frames: [
      frame("plan", "将来", "In future", [
        col("a1", "主语", "Who", [
          c("将来我想", "jiānglái wǒ xiǎng", "in the future I want to"),
          c("大学毕业以后我想", "dàxué bìyè yǐhòu wǒ xiǎng", "after university I want to"),
          c("如果可以的话，我想", "rúguǒ kěyǐ de huà, wǒ xiǎng", "if possible I want to"),
          c("她将来想", "tā jiānglái xiǎng", "in the future she wants to"),
        ]),
        col("a2", "打算", "Plan", [
          c("当医生", "dāng yīshēng", "become a doctor"),
          c("当老师", "dāng lǎoshī", "become a teacher"),
          c("当公务员", "dāng gōngwùyuán", "become a public servant"),
          c("去中国留学", "qù Zhōngguó liúxué", "study in China"),
          c("一边工作一边学中文", "yìbiān gōngzuò yìbiān xué Zhōngwén", "work and study Chinese at the same time"),
        ]),
      ]),
      frame("reason", "因为", "Because", [
        col("b1", "因为", "Because", [
          c("因为", "yīnwèi", "because"),
          c("主要是因为", "zhǔyào shì yīnwèi", "mainly because"),
          c("我觉得是因为", "wǒ juéde shì yīnwèi", "I think it is because"),
        ]),
        col("b2", "理由", "Reason", [
          c("这个工作对社会有帮助", "zhège gōngzuò duì shèhuì yǒu bāngzhù", "this job helps society"),
          c("我想了解中国文化", "wǒ xiǎng liǎojiě Zhōngguó wénhuà", "I want to understand Chinese culture"),
          c("中文对我将来的工作很有用", "Zhōngwén duì wǒ jiānglái de gōngzuò hěn yǒuyòng", "Chinese will be useful for my future work"),
          c("这个工作很有意思", "zhège gōngzuò hěn yǒu yìsi", "this job is very interesting"),
        ]),
      ]),
    ],
  }),

  album({
    id: "y11-internship",
    title: "我在动物园实习",
    titleEn: "I am interning at the zoo",
    year: 11,
    source: "中文真棒 IV · Lesson 6 · Continuers: the world of work",
    note: "Part-time work and internships.",
    frames: [
      frame("intern", "实习", "Intern", [
        col("a1", "主语", "Who", [
          c("这个假期我在", "zhège jiàqī wǒ zài", "these holidays I am at"),
          c("她正在", "tā zhèngzài", "she is currently at"),
          c("同学介绍我去", "tóngxué jièshào wǒ qù", "a classmate recommended I go to"),
          c("周末他在", "zhōumò tā zài", "at the weekend he is at"),
        ]),
        col("a2", "地点", "Place", [
          c("动物园实习", "dòngwùyuán shíxí", "the zoo on an internship"),
          c("图书馆打工", "túshūguǎn dǎgōng", "the library for a part-time job"),
          c("饭馆帮忙", "fànguǎn bāngmáng", "a restaurant to help out"),
          c("超市工作", "chāoshì gōngzuò", "the supermarket working"),
        ]),
      ]),
      frame("learn", "学到", "Learn", [
        col("b1", "虽然", "Although", [
          c("虽然很累，但是", "suīrán hěn lèi, dànshì", "although it is tiring,"),
          c("不但可以赚钱，而且", "búdàn kěyǐ zhuànqián, érqiě", "not only can I earn money, but"),
          c("时间有限，可是", "shíjiān yǒuxiàn, kěshì", "time is limited, but"),
        ]),
        col("b2", "收获", "Gain", [
          c("我学到了很多东西", "wǒ xué dào le hěn duō dōngxi", "I have learned a lot"),
          c("对将来很有帮助", "duì jiānglái hěn yǒu bāngzhù", "it will help a lot in future"),
          c("认识了不少朋友", "rènshi le bù shǎo péngyou", "I have met quite a few friends"),
        ]),
      ]),
    ],
  }),
];
