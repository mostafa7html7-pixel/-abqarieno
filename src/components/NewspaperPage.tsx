import React from 'react';
import { InteractiveCrossword } from './InteractiveCrossword';
import mastheadImg from '../assets/images/ahram_vintage_masthead_1791582139087.jpg';
import cairoPhotoImg from '../assets/images/vintage_cairo_news_photo_1791582151515.jpg';
import teaAdImg from '../assets/images/vintage_egyptian_ad_1791582163535.jpg';
import caricatureImg from '../assets/images/vintage_egyptian_caricature_1791582173327.jpg';

interface NewspaperPageProps {
  pageNumber: number;
}

export const NewspaperPage: React.FC<NewspaperPageProps> = ({ pageNumber }) => {
  return (
    <div className="w-full h-full text-stone-900 select-none p-5 sm:p-7 flex flex-col justify-between">
      
      {/* ──────────────── PAGE 1: المانشيت والصفحة الأولى ──────────────── */}
      {pageNumber === 1 && (
        <div className="space-y-4">
          {/* Masthead Header Graphic */}
          <div className="relative border-b-2 border-stone-800 pb-2">
            <div className="overflow-hidden rounded border border-stone-700/60 shadow-sm max-h-48 sm:max-h-56">
              <img
                src={mastheadImg}
                alt="جريدة الأهرام المصرية - أهرامات الجيزة الخالدة"
                className="w-full object-cover filter contrast-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Date and Edition Bar */}
            <div className="mt-2 py-1 border-y-2 border-stone-900 flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-amiri text-stone-950 font-bold">
              <span>الجمعة ٢٣ ربيع الأول ١٣٧٧ هـ</span>
              <span>القاهرة - شارع الجلاء • تأسست سنة ١٨٧٥</span>
              <span>١٨ أكتوبر ١٩٥٧ م • العدد: ٢٥٩١٠</span>
              <span>الثمن: ١٠ مليمات</span>
            </div>
          </div>

          {/* Main Historic Headline */}
          <div className="text-center border-b border-stone-400 pb-3">
            <h1 className="font-aref font-black text-2xl sm:text-4xl text-stone-950 leading-tight tracking-tight">
              مصر تفتتح عهداً جديداً من البناء والنهضة الصناعية الكبرى
            </h1>
            <p className="font-amiri text-sm sm:text-base text-stone-800 font-bold mt-1">
              مئات الآلاف من العمال والمهندسين يشيدون قلاع الإنتاج في حلوان وشبرا الخيمة وأسوان
            </p>
          </div>

          {/* 3-Column Broadsheet Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Left Column: Lead Story */}
            <div className="md:col-span-5 space-y-2 text-justify">
              <p className="newspaper-dropcap font-amiri text-xs sm:text-sm leading-relaxed text-stone-900">
                شهدت العاصمة صباح اليوم انطلاقة تاريخية كبرى لتدشين مجمعات الصلب والنسيج ومحطات توليد الطاقة الكهربائية، حيث توافدت وفود العمال والخبراء من شتى أرجاء القطر المصري للمشاركة في ملحمة التعمير والإنتاج. وأكدت التقارير الصادرة عن وزارة الأشغال أن خطط التنمية تمضي بخطى وثيقة لرفع مستوى معيشة الفلاح والعامل المصري، وربط شرايين التجارة والصناعة من الإسكندرية شمالاً حتى أسوان جنوباً.
              </p>
              <p className="font-amiri text-xs sm:text-sm leading-relaxed text-stone-900">
                وفي كلمته الافتتاحية، وجّه رئيس الوزراء تحية إكبار لأبناء النيل، مؤكداً أن الإرادة المصرية الصادقة قادرة على ترويض الصعاب وصنع المعجزات وتشييد صروح الاستقلال الاقتصادي.
              </p>
            </div>

            {/* Center Column: Cairo Historic Photo */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="border border-stone-800 p-1 bg-stone-100/50 shadow-sm">
                <img
                  src={cairoPhotoImg}
                  alt="القاهرة الكبرى ونهر النيل الخالد"
                  className="w-full object-cover max-h-44 rounded-sm filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-stone-700 italic text-center mt-1 font-amiri">
                  القاهرة الكبرى: حركة العمران ومراكب النيل الشراعية في ضياء الصباح
                </p>
              </div>

              {/* Weather & Prayer Times Box */}
              <div className="border border-stone-600 p-2 bg-amber-100/40 text-[11px] font-amiri space-y-1">
                <div className="flex justify-between font-bold border-b border-stone-400 pb-0.5">
                  <span>مواقيت الصلاة بالقاهرة:</span>
                  <span>الفجر ٤:٣٢ • الظهر ١١:٤٥ • المغرب ٥:٢٠</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>طقس الغد: مشمس دافئ وصحو</span>
                  <span>درجة الحرارة: العظمى ٢٧° • الصغرى ١٦°</span>
                </div>
              </div>
            </div>

            {/* Right Column: Markets & Currency */}
            <div className="md:col-span-3 space-y-2 border-r border-stone-300 pr-3">
              <div className="border-b border-stone-700 pb-1">
                <h3 className="font-aref font-bold text-sm text-stone-950">أسواق المال والذهب</h3>
                <p className="text-[10px] text-stone-600">بورصة القاهرة والإسكندرية</p>
              </div>
              <ul className="text-xs space-y-1 text-stone-800">
                <li className="flex justify-between">
                  <span>الذهب عيار ٢١:</span>
                  <span className="font-mono font-bold">٩٦ قرشاً</span>
                </li>
                <li className="flex justify-between">
                  <span>الجنيه الإسترليني:</span>
                  <span className="font-mono font-bold">٩٧.٥ قرش</span>
                </li>
                <li className="flex justify-between">
                  <span>سهم البنك الأهلي:</span>
                  <span className="font-mono font-bold">١٤.٢ جنيه</span>
                </li>
                <li className="flex justify-between">
                  <span>أردب القمح البلدي:</span>
                  <span className="font-mono font-bold">٣٨٠ قرشاً</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-stone-300 text-[11px] text-stone-700 italic">
                «حركة الملاحة بقناة السويس تسجل عبور ٤٨ سفينة شحن بانتظام تام».
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── PAGE 2: مقالات الرأي وقضايا الفكر ──────────────── */}
      {pageNumber === 2 && (
        <div className="space-y-4">
          <div className="border-b-2 border-stone-900 pb-1.5 flex justify-between items-baseline">
            <h2 className="font-aref font-black text-2xl text-stone-950">
              أعمدة الفكر وقضايا الأدب
            </h2>
            <span className="text-xs text-stone-600 font-bold">الصفحة الثانية • مقالات الرأي</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Naguib Mahfouz Article */}
            <div className="border border-stone-400 p-3 bg-amber-50/40 space-y-2">
              <div className="border-b border-stone-300 pb-1 flex justify-between items-center">
                <h3 className="font-aref font-bold text-lg text-stone-950">
                  تأملات في الحارة المصرية وسر الخلود
                </h3>
                <span className="text-xs font-bold text-stone-700">بقلم: نجيب محفوظ</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-800 text-justify">
                ليست الحارة مجرد جدران وأزقة ملتوية تقطنها الأجساد، بل هي وعاء الروح المصرية المتوارثة عبر آلاف السنين. حين تجلس في مقهى الحرافيش وتستمع إلى هدير المارة وأصوات الباعة، تشعر وكأن الزمان يتوقف لحظة ليتأمل ذاته. إن البسطاء هم حراس هذا الوطن الأمناء؛ بابتسامتهم الصابرة، وبإيمانهم الراسخ بأن الغد يحمل دائماً بشائر الفرج.
              </p>
              <p className="text-xs leading-relaxed text-stone-700 italic border-t border-stone-200 pt-1">
                «إن سر البقاء لا يكمن في القصور العالية، بل في القلوب التي تعمرها المحبة والإخلاص لهذا التراب».
              </p>
            </div>

            {/* Tawfiq Al-Hakim Article */}
            <div className="border border-stone-400 p-3 bg-amber-50/40 space-y-2">
              <div className="border-b border-stone-300 pb-1 flex justify-between items-center">
                <h3 className="font-aref font-bold text-lg text-stone-950">
                  عصا الحكيم .. حديث عن بهجة الصباح
                </h3>
                <span className="text-xs font-bold text-stone-700">بقلم: توفيق الحكيم</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-800 text-justify">
                سألتني عصاي هذا الصباح ونحن نتريض على ضفاف النيل: لماذا يستيقظ الناس مثقلين بالهموم بينما النهر يتدفق في سلام؟ قلت لها: لأن الإنسان اعتاد أن يحمل المستقبل فوق كتفيه قبل أن يحين أوانه. افتح نافذتك للشمس، واستمع إلى صوت القرآن الندي وهو ينساب مع أذان الفجر، وستعلم أن كل يوم هو هبة جديدة تستحق أن تعاش بعين الطفل وفكر الفيلسوف.
              </p>
              <p className="text-xs leading-relaxed text-stone-700 italic border-t border-stone-200 pt-1">
                «الفن والحكمة صنوان، لا يزهران إلا في تربة النفس الهادئة المطمئنة».
              </p>
            </div>
          </div>

          {/* Readers Letters & Editorial Post */}
          <div className="border-t-2 border-stone-800 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 border-b border-stone-300 pb-0.5">بريد الأهرام</h4>
              <p className="text-stone-700 text-justify leading-normal">
                رسالة من قارئ بالإسكندرية يطالب بزيادة عدد المكتبات العامة في الأحياء الشعبية لنشر الثقافة بين النشء.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 border-b border-stone-300 pb-0.5">يوميات الأستاذ</h4>
              <p className="text-stone-700 text-justify leading-normal">
                أحمد بهاء الدين يكتب عن ضرورة العناية بالحرف اليدوية والفنون التراثية في خان الخليلي وسوق النحاسين.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 border-b border-stone-300 pb-0.5">حكمة التحرير</h4>
              <p className="text-stone-700 text-justify leading-normal italic">
                «الصحافة رسالة شرف، وقلم الكاتب ميثاق أمانة بينه وبين التاريخ».
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── PAGE 3: صفحة التسالي والمنوعات ──────────────── */}
      {pageNumber === 3 && (
        <div className="space-y-4">
          <div className="border-b-2 border-stone-900 pb-1.5 flex justify-between items-baseline">
            <h2 className="font-aref font-black text-2xl text-stone-950">
              تسالي ومنوعات وقافلة الضحك
            </h2>
            <span className="text-xs text-stone-600 font-bold">الصفحة الثالثة • الكاريكاتير والكلمات المتقاطعة</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Caricature Box */}
            <div className="lg:col-span-5 space-y-1.5">
              <div className="border-2 border-stone-800 p-2 bg-stone-50 shadow-sm">
                <div className="flex justify-between items-center text-xs border-b border-stone-400 pb-1 mb-1 font-bold">
                  <span>كاريكاتير اليوم</span>
                  <span className="font-aref text-stone-700">ريشة: صلاح جاهين</span>
                </div>
                <img
                  src={caricatureImg}
                  alt="كاريكاتير مصري ساخر في المقهى البلدي"
                  className="w-full object-cover max-h-60 rounded-sm filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[11px] font-aref text-center text-stone-950 font-bold mt-1">
                  — «يا عم الحاج .. قريت الجريدة كلها ولسه بتدور على إيه؟» <br/>
                  — «بدور على راحة البال وكوباية الشاي المضبوطة!»
                </p>
              </div>

              {/* Jokes and Anecdotes */}
              <div className="border border-stone-400 p-2.5 bg-amber-100/30 text-xs space-y-1">
                <h4 className="font-bold text-stone-900">نوادر وطرف مصرية:</h4>
                <p className="text-stone-800 leading-relaxed text-justify">
                  دخل رجل بخيل على بائع الجرائد وسأله: «بكام جريدة الأهرام؟» قال البائع: «بعشرة مليمات». قال: «طب وإذا قريت بس المانشيت والكلمات المتقاطعة تحاسبني بكام؟!»
                </p>
              </div>
            </div>

            {/* Interactive Crossword Puzzle */}
            <div className="lg:col-span-7">
              <InteractiveCrossword />
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── PAGE 4: الفنون والأدب والرياضة وإعلانات زمان ──────────────── */}
      {pageNumber === 4 && (
        <div className="space-y-4">
          <div className="border-b-2 border-stone-900 pb-1.5 flex justify-between items-baseline">
            <h2 className="font-aref font-black text-2xl text-stone-950">
              أضواء الفنون والرياضة وإعلانات زمان
            </h2>
            <span className="text-xs text-stone-600 font-bold">الصفحة الرابعة • كلاسيكيات القاهرة</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Umm Kulthum & Arts Section */}
            <div className="md:col-span-7 space-y-3">
              <div className="border-2 border-stone-800 p-3 bg-amber-50/50 space-y-2">
                <div className="flex justify-between items-baseline border-b border-stone-400 pb-1">
                  <h3 className="font-aref font-black text-xl text-stone-950">
                    كوكب الشرق «أم كلثوم» تسحر الملايين بمسرح قصر النيل
                  </h3>
                  <span className="text-xs text-stone-600 font-bold">حفل أول خميس</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
                  في ليلة قاهرية ساحرة حبست فيها العواصم العربية أنفاسها، شدت سيدة الغناء العربي «أم كلثوم» برائعتها الجديدة من ألحان رياض السنباطي وكلمات الشاعر أحمد رامي. وقد احتشد في القاعة نخبة رجال الفكر والأدب والسياسة، وظلت الجماهير تهتف لساعات مطالبة بإعادة الكوبليهات، في مشهد يجسد سطوة الطرب الأصيل على الوجدان العربي.
                </p>
              </div>

              {/* Cinema & Sports News */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="border border-stone-500 p-2 bg-stone-50">
                  <h4 className="font-bold text-stone-900 border-b border-stone-300 pb-0.5">سينما ريفولي ومترو</h4>
                  <p className="text-stone-700 mt-1 leading-normal">
                    عرض الفيلم الغنائي الجديد للعندليب الأسمر عبد الحليم حافظ وفاتن حمامة، إقبال جماهيري منقطع النظير في وسط البلد.
                  </p>
                </div>
                <div className="border border-stone-500 p-2 bg-stone-50">
                  <h4 className="font-bold text-stone-900 border-b border-stone-300 pb-0.5">ديربي الكرة المصرية</h4>
                  <p className="text-stone-700 mt-1 leading-normal">
                    استعدادات مكثفة للأهلي والزمالك في لقاء القمة بملعب مختار التتش، والجمهور يترقب صراع الهجوم في ختام الدوري.
                  </p>
                </div>
              </div>
            </div>

            {/* Vintage Ad: Royal Mint Tea */}
            <div className="md:col-span-5 space-y-1">
              <div className="border-2 border-stone-900 p-1.5 bg-[#fbf6ea] shadow-sm">
                <img
                  src={teaAdImg}
                  alt="إعلان زمان - شاي الملكي بالنعناع الأصلي"
                  className="w-full object-cover max-h-72 rounded-sm filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-stone-600 text-center mt-1 italic font-amiri">
                  إعلانات الأهرام التجارية: مشروب الضيافة المصرية الأصيل منذ نصف قرن
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── PAGE 5: كشكول الملاحظات والمذكرات الحرة ──────────────── */}
      {pageNumber === 5 && (
        <div className="space-y-4 h-full flex flex-col">
          <div className="border-b-2 border-stone-900 pb-1.5 flex justify-between items-baseline">
            <h2 className="font-aref font-black text-2xl text-stone-950">
              كشكول الملاحظات والمذكرات الصحفية
            </h2>
            <span className="text-xs text-stone-600 font-bold">الصفحة الخامسة • مساحة القارئ والكاتب</span>
          </div>

          <div className="flex-1 border-2 border-dashed border-stone-400 p-4 rounded bg-amber-50/20 relative">
            <div className="text-center text-stone-500 mb-4">
              <span className="text-sm font-aref font-bold text-stone-800">
                «مساحة حرة مفتوحة لأفكارك، خواطرك، أو تدريب خطك بالقلم الرصاص والجاف»
              </span>
              <p className="text-xs text-stone-600 mt-1">
                استخدم أدوات القلم الجاف والرصاص والأستيكة والأختام في الشريط العلوي للكتابة والتدوين
              </p>
            </div>

            {/* Faint ruling lines for writing */}
            <div className="space-y-7 opacity-40 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-b border-stone-400 h-1"></div>
              ))}
            </div>

            {/* Editorial Stamp Watermark */}
            <div className="absolute bottom-6 left-6 text-stone-400 border border-stone-300 p-3 rounded font-aref text-xs pointer-events-none rotate-3 opacity-60">
              دار الأهرام للنشر والتوزيع • أرشيف القراء
            </div>
          </div>
        </div>
      )}

      {/* Page Footer Navigation Indicator */}
      <div className="pt-3 border-t border-stone-400/80 flex items-center justify-between text-xs text-stone-700 font-amiri">
        <span>جريدة الأهرام • ديوان الحياة المصرية المعاصرة</span>
        <span className="font-bold text-stone-950 font-mono">صفحة {pageNumber} من ٥</span>
        <span>اضغط على حواف الجريدة أو أزرار التقليب لتصفح باقي الصفحات</span>
      </div>

    </div>
  );
};
