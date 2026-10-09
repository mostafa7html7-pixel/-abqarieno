import { ReciterId, ReciterInfo, QuranSurah } from '../types';

export const RECITERS: ReciterInfo[] = [
  {
    id: 'abdulbasit',
    nameAr: 'الشيخ عبد الباسط عبد الصمد',
    titleAr: 'صوت مكة وقيثارة السماء الخالدة',
    descriptionAr: 'من أعظم قراء مصر والعالم الإسلامي، صاحب الحنجرة الذهبية والتلاوة المجودة الرخيمة.',
    defaultSurahId: 'abdulbasit-055'
  },
  {
    id: 'minshawi',
    nameAr: 'الشيخ محمد صديق المنشاوي',
    titleAr: 'الصوت الباكي ورائد الخشوع',
    descriptionAr: 'أحد أقطاب التلاوة المصرية الكبار، عُرف بالصوت الشجي المفعم بالتدبر والوقار.',
    defaultSurahId: 'minshawi-055'
  },
  {
    id: 'dossari',
    nameAr: 'الشيخ ياسر الدوسري',
    titleAr: 'إمام الحرم المكي الشريف',
    descriptionAr: 'ترتيل ندي ومؤثر يأسر القلوب، وقراءات ندية من رحاب المسجد الحرام.',
    defaultSurahId: 'dossari-078'
  },
  {
    id: 'radio_cairo',
    nameAr: 'إذاعة القرآن الكريم من القاهرة',
    titleAr: 'أثير القاهرة الخالد منذ ١٩٦٤',
    descriptionAr: 'البث الإذاعي المصري العريق، يصدح بآيات الذكر الحكيم وأصوات عمالقة دولة التلاوة المصرية.',
    defaultSurahId: 'radio-cairo-live'
  }
];

export const SURAHS_LIST: QuranSurah[] = [
  // عبد الباسط عبد الصمد
  {
    id: 'abdulbasit-001',
    number: 1,
    nameAr: 'سورة الفاتحة',
    englishName: 'Al-Fatiha',
    ayahCount: 7,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/001.mp3'
  },
  {
    id: 'abdulbasit-018',
    number: 18,
    nameAr: 'سورة الكهف',
    englishName: 'Al-Kahf',
    ayahCount: 110,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/018.mp3'
  },
  {
    id: 'abdulbasit-019',
    number: 19,
    nameAr: 'سورة مريم',
    englishName: 'Maryam',
    ayahCount: 98,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/019.mp3'
  },
  {
    id: 'abdulbasit-036',
    number: 36,
    nameAr: 'سورة يس (قلب القرآن)',
    englishName: 'Ya-Sin',
    ayahCount: 83,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/036.mp3'
  },
  {
    id: 'abdulbasit-055',
    number: 55,
    nameAr: 'سورة الرحمن (عروس القرآن)',
    englishName: 'Ar-Rahman',
    ayahCount: 78,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/055.mp3'
  },
  {
    id: 'abdulbasit-056',
    number: 56,
    nameAr: 'سورة الواقعة',
    englishName: 'Al-Waqi\'ah',
    ayahCount: 96,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/056.mp3'
  },
  {
    id: 'abdulbasit-067',
    number: 67,
    nameAr: 'سورة الملك (المنجية)',
    englishName: 'Al-Mulk',
    ayahCount: 30,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/067.mp3'
  },
  {
    id: 'abdulbasit-093',
    number: 93,
    nameAr: 'سورة الضحى',
    englishName: 'Ad-Duha',
    ayahCount: 11,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/093.mp3'
  },
  {
    id: 'abdulbasit-112',
    number: 112,
    nameAr: 'سورة الإخلاص',
    englishName: 'Al-Ikhlas',
    ayahCount: 4,
    reciterId: 'abdulbasit',
    audioUrl: 'https://server7.mp3quran.net/basit/112.mp3'
  },

  // محمد صديق المنشاوي
  {
    id: 'minshawi-001',
    number: 1,
    nameAr: 'سورة الفاتحة',
    englishName: 'Al-Fatiha',
    ayahCount: 7,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/001.mp3'
  },
  {
    id: 'minshawi-012',
    number: 12,
    nameAr: 'سورة يوسف (أحسن القصص)',
    englishName: 'Yusuf',
    ayahCount: 111,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/012.mp3'
  },
  {
    id: 'minshawi-019',
    number: 19,
    nameAr: 'سورة مريم',
    englishName: 'Maryam',
    ayahCount: 98,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/019.mp3'
  },
  {
    id: 'minshawi-036',
    number: 36,
    nameAr: 'سورة يس',
    englishName: 'Ya-Sin',
    ayahCount: 83,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/036.mp3'
  },
  {
    id: 'minshawi-055',
    number: 55,
    nameAr: 'سورة الرحمن',
    englishName: 'Ar-Rahman',
    ayahCount: 78,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/055.mp3'
  },
  {
    id: 'minshawi-067',
    number: 67,
    nameAr: 'سورة الملك',
    englishName: 'Al-Mulk',
    ayahCount: 30,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/067.mp3'
  },
  {
    id: 'minshawi-049',
    number: 49,
    nameAr: 'سورة الحجرات',
    englishName: 'Al-Hujurat',
    ayahCount: 18,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/049.mp3'
  },
  {
    id: 'minshawi-050',
    number: 50,
    nameAr: 'سورة ق',
    englishName: 'Qaf',
    ayahCount: 45,
    reciterId: 'minshawi',
    audioUrl: 'https://server10.mp3quran.net/minsh/050.mp3'
  },

  // ياسر الدوسري
  {
    id: 'dossari-001',
    number: 1,
    nameAr: 'سورة الفاتحة',
    englishName: 'Al-Fatiha',
    ayahCount: 7,
    reciterId: 'dossari',
    audioUrl: 'https://server11.mp3quran.net/yasser/001.mp3'
  },
  {
    id: 'dossari-018',
    number: 18,
    nameAr: 'سورة الكهف',
    englishName: 'Al-Kahf',
    ayahCount: 110,
    reciterId: 'dossari',
    audioUrl: 'https://server11.mp3quran.net/yasser/018.mp3'
  },
  {
    id: 'dossari-036',
    number: 36,
    nameAr: 'سورة يس',
    englishName: 'Ya-Sin',
    ayahCount: 83,
    reciterId: 'dossari',
    audioUrl: 'https://server11.mp3quran.net/yasser/036.mp3'
  },
  {
    id: 'dossari-055',
    number: 55,
    nameAr: 'سورة الرحمن',
    englishName: 'Ar-Rahman',
    ayahCount: 78,
    reciterId: 'dossari',
    audioUrl: 'https://server11.mp3quran.net/yasser/055.mp3'
  },
  {
    id: 'dossari-078',
    number: 78,
    nameAr: 'سورة النبأ (عمّ يتساءلون)',
    englishName: 'An-Naba',
    ayahCount: 40,
    reciterId: 'dossari',
    audioUrl: 'https://server11.mp3quran.net/yasser/078.mp3'
  },
  {
    id: 'dossari-079',
    number: 79,
    nameAr: 'سورة النازعات',
    englishName: 'An-Nazi\'at',
    ayahCount: 46,
    reciterId: 'dossari',
    audioUrl: 'https://server11.mp3quran.net/yasser/079.mp3'
  },
  {
    id: 'dossari-087',
    number: 87,
    nameAr: 'سورة الأعلى',
    englishName: 'Al-A\'la',
    ayahCount: 19,
    reciterId: 'dossari',
    audioUrl: 'https://server11.mp3quran.net/yasser/087.mp3'
  },

  // إذاعة القرآن الكريم من القاهرة
  {
    id: 'radio-cairo-live',
    number: 0,
    nameAr: 'البث المباشر لإذاعة القرآن الكريم من القاهرة',
    englishName: 'Cairo Quran Radio Live',
    ayahCount: 0,
    reciterId: 'radio_cairo',
    audioUrl: 'https://stream.radiojar.com/8s5u8pdtstzuv'
  },
  {
    id: 'radio-cairo-fajr',
    number: 89,
    nameAr: 'تلاوات فجر القاهرة النادرة (أرشيف ماسبيرو)',
    englishName: 'Maspero Archive Dawn Recitation',
    ayahCount: 30,
    reciterId: 'radio_cairo',
    audioUrl: 'https://server7.mp3quran.net/basit/089.mp3'
  }
];
