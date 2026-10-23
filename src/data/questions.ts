export interface Option {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  textAr: string;
}

export type Category = 
  | 'RBC Physiology & Metabolism'
  | 'Anaemia & Nutritional Disorders'
  | 'Haemoglobinopathies & Thalassaemia'
  | 'Leukaemia & Myeloproliferative Disorders'
  | 'Leukocytes & Immunology'
  | 'Haemostasis, Platelets & Coagulation'
  | 'Laboratory Medicine & Diagnostics';

export interface Question {
  id: number;
  question: string;
  questionAr: string;
  options: Option[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  category: Category;
  explanation: string;
  explanationAr: string;
  pearl: string;
}

export const CATEGORIES: Category[] = [
  'RBC Physiology & Metabolism',
  'Anaemia & Nutritional Disorders',
  'Haemoglobinopathies & Thalassaemia',
  'Leukaemia & Myeloproliferative Disorders',
  'Leukocytes & Immunology',
  'Haemostasis, Platelets & Coagulation',
  'Laboratory Medicine & Diagnostics',
];

export const HAEMATOLOGY_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "2,3-bisphosphoglycerate (2,3-BPG) is produced via:",
    questionAr: "يتم إنتاج 2,3-ثنائي فوسفوغليسيرات (2,3-BPG) عبر مسار:",
    options: [
      { key: "A", text: "The urea cycle", textAr: "دورة اليوريا" },
      { key: "B", text: "The pentose phosphate pathway", textAr: "مسار فوسفات البنتوز" },
      { key: "C", text: "The Rapoport–Luebering shunt", textAr: "تحويلة رابوبورت-لوبيرينغ" },
      { key: "D", text: "Mitochondrial glucose oxidation", textAr: "الأكسدة الميتوكوندرية للجلوكوز" }
    ],
    correctAnswer: "C",
    category: "RBC Physiology & Metabolism",
    explanation: "2,3-bisphosphoglycerate (2,3-BPG) is synthesized from 1,3-bisphosphoglycerate in erythrocytes via the Rapoport–Luebering shunt, a bypass of the glycolytic pathway catalyzed by bisphosphoglycerate mutase. 2,3-BPG binds deoxyhemoglobin and decreases oxygen affinity, facilitating O2 unloading in peripheral tissues.",
    explanationAr: "يتم تصنيع 2,3-BPG في كريات الدم الحمراء عبر تحويلة رابوبورت-لوبيرينغ (Rapoport–Luebering shunt) المتفرعة من التحلل السكري، وهو عامل أساسي يقلل انجذاب الهيموجلوبين للأكسجين لتسهيل تحريره في الأنسجة.",
    pearl: "High-Yield: Erythrocytes lack mitochondria; the Rapoport–Luebering shunt bypasses the ATP-generating phosphoglycerate kinase step to regulate tissue oxygenation."
  },
  {
    id: 2,
    question: "The hormone that stimulates platelet production is:",
    questionAr: "الهرمون الذي يحفز إنتاج الصفائح الدموية هو:",
    options: [
      { key: "A", text: "Thrombopoietin (TPO)", textAr: "ترومبوبويتين (TPO)" },
      { key: "B", text: "Calcitonin", textAr: "كالسيتونين" },
      { key: "C", text: "Erythropoietin", textAr: "إريثروبويتين" },
      { key: "D", text: "Insulin", textAr: "أنسولين" }
    ],
    correctAnswer: "A",
    category: "Haemostasis, Platelets & Coagulation",
    explanation: "Thrombopoietin (TPO) is the primary glycoprotein hormone regulating megakaryocytopoiesis and platelet production. Produced constitutively primarily by the liver and to a lesser extent the kidneys, it binds to the c-Mpl receptor on megakaryocytes.",
    explanationAr: "الترومبوبويتين (TPO) هو الهرمون الرئيسي المنتج أساساً في الكبد لتحفيز نضج الخلايا النواء (Megakaryocytes) وإنتاج الصفائح الدموية.",
    pearl: "Platelet count self-regulates TPO levels: circulating platelets bind and clear TPO via their c-Mpl receptors."
  },
  {
    id: 3,
    question: "Auer rods are characteristic of:",
    questionAr: "تعتبر عصيات أوير (Auer rods) مميزة لـ:",
    options: [
      { key: "A", text: "Acute myeloid leukaemia (AML)", textAr: "ابيضاض الدم النقوي الحاد (AML)" },
      { key: "B", text: "Sickle cell anaemia", textAr: "فقر الدم المنجلي" },
      { key: "C", text: "Chronic lymphocytic leukaemia", textAr: "ابيضاض الدم الليمفاوي المزمن" },
      { key: "D", text: "Thalassaemia trait", textAr: "سمة الثلاسيميا" }
    ],
    correctAnswer: "A",
    category: "Leukaemia & Myeloproliferative Disorders",
    explanation: "Auer rods are crystalline cytoplasmic inclusions composed of fused primary azurophilic granules containing myeloperoxidase (MPO). They are pathognomonic for myeloblasts and monoblasts, definitively confirming Acute Myeloid Leukaemia (AML), particularly acute promyelocytic leukaemia (APL/AML M3).",
    explanationAr: "عصيات أوير (Auer rods) هي تجمعات بلورية حبيبية تنشأ من حبيبات الأزوروفيل في أرومات النقي، وتعتبر علامة فارقة قاطعة لسرطان الدم النقوي الحاد (AML).",
    pearl: "Auer rods = Myeloid lineage (AML). Never seen in Acute Lymphoblastic Leukaemia (ALL)."
  },
  {
    id: 4,
    question: "The average lifespan of a normal red blood cell is:",
    questionAr: "متوسط عمر كرية الدم الحمراء الطبيعية هو:",
    options: [
      { key: "A", text: "300 days", textAr: "300 يوم" },
      { key: "B", text: "120 days", textAr: "120 يوماً" },
      { key: "C", text: "10 days", textAr: "10 أيام" },
      { key: "D", text: "30 days", textAr: "30 يوماً" }
    ],
    correctAnswer: "B",
    category: "RBC Physiology & Metabolism",
    explanation: "Normal human erythrocytes circulate in the peripheral bloodstream for an average lifespan of approximately 120 days (~4 months) before senescent changes lead to phagocytosis and clearance by the reticuloendothelial system (mainly splenic macrophages).",
    explanationAr: "تعيش كرية الدم الحمراء الطبيعية حوالي 120 يوماً في الدورة الدموية قبل أن تشيخ ويتم التخلص منها بواسطة الطحال والجهاز الشبكي البطاني.",
    pearl: "Platelet lifespan is 7-10 days, neutrophils 6-8 hours to a few days, whereas erythrocytes persist for ~120 days."
  },
  {
    id: 5,
    question: "Haemolytic anaemia results from:",
    questionAr: "ينتج فقر الدم الانحلالي عن:",
    options: [
      { key: "A", text: "Low white cell count", textAr: "انخفاض عدد خلايا الدم البيضاء" },
      { key: "B", text: "Reduced red cell production in the marrow", textAr: "انخفاض إنتاج كريات الدم الحمراء في النقي" },
      { key: "C", text: "Increased destruction and shortened lifespan of red cells", textAr: "زيادة تكسر وقصر عمر كريات الدم الحمراء" },
      { key: "D", text: "Dietary iron deficiency", textAr: "نقص الحديد الغذائي" }
    ],
    correctAnswer: "C",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Haemolytic anaemia is characterized by premature destruction of erythrocytes (<120 days), exceeding the marrow's compensatory erythropoietic capacity. Hallmark lab findings include elevated reticulocytes, high indirect bilirubin, elevated LDH, and decreased haptoglobin.",
    explanationAr: "يحدث فقر الدم الانحلالي بسبب تكسير مفرط ومبكر لكريات الدم الحمراء يفوق قدرة نخاع العظم التعويضية على إنتاجها.",
    pearl: "Triad of hemolysis: Reticulocytosis + Elevated unconjugated bilirubin + Low serum haptoglobin."
  },
  {
    id: 6,
    question: "Haptoglobin falls in haemolysis because it:",
    questionAr: "ينخفض الهابتوغلوبين في انحلال الدم لأنه:",
    options: [
      { key: "A", text: "Is made in red cells", textAr: "يُصنع داخل كريات الدم الحمراء" },
      { key: "B", text: "Is excreted only by the kidneys", textAr: "يُطرح فقط عن طريق الكليتين" },
      { key: "C", text: "Converts to iron", textAr: "يتحول إلى حديد" },
      { key: "D", text: "Binds free haemoglobin and is consumed", textAr: "يرتبط بالهيموجلوبين الحر ويُستهلك" }
    ],
    correctAnswer: "D",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Haptoglobin is a plasma alpha-2 glycoprotein produced by the liver that binds free extracellular hemoglobin released during intravascular (and severe extravascular) hemolysis with high affinity. The hemoglobin-haptoglobin complex is rapidly cleared by CD163 macrophage receptors in the liver, depleting circulating haptoglobin levels.",
    explanationAr: "الهابتوغلوبين يرتبط بالهيموجلوبين الحر لمنع فقدانه وتسمم الكلى، ويتم ابتلاع المعقد وتفكيكه بسرعة في الكبد، مما يؤدي لنضوبه وانخفاض مستواه في مصل الدم.",
    pearl: "An undetectable or depressed haptoglobin is one of the most sensitive indicators of ongoing hemolysis."
  },
  {
    id: 7,
    question: "Pernicious anaemia is caused by:",
    questionAr: "يحدث فقر الدم الوبيل (Pernicious anaemia) بسبب:",
    options: [
      { key: "A", text: "Immune destruction of red cells", textAr: "تدمير مناعي لكريات الدم الحمراء" },
      { key: "B", text: "Dietary iron deficiency", textAr: "نقص الحديد الغذائي" },
      { key: "C", text: "G6PD deficiency", textAr: "عوز إنزيم G6PD" },
      { key: "D", text: "Deficiency of intrinsic factor from gastric parietal cell loss", textAr: "عوز العامل الداخلي نتيجة فقدان الخلايا الجدارية المعدية" }
    ],
    correctAnswer: "D",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Pernicious anaemia is an autoimmune condition characterized by autoimmune atrophic gastritis where autoantibodies target gastric parietal cells (H+/K+ ATPase) and/or intrinsic factor (IF). Without intrinsic factor, dietary cobalamin (Vitamin B12) cannot be absorbed in the terminal ileum.",
    explanationAr: "فقر الدم الوبيل هو مرض مناعي ذاتي تدمر فيه الأجسام المضادة خلايا المعدة الجدارية مسببة نقص العامل الداخلي (Intrinsic Factor) اللازم لامتصاص فيتامين B12 في اللفائفي.",
    pearl: "Autoantibodies against intrinsic factor (anti-IF) are highly specific for pernicious anaemia."
  },
  {
    id: 8,
    question: "In normal haemoglobin, the iron in heme is in the state:",
    questionAr: "في الهيموجلوبين الطبيعي، يكون الحديد في الهيم بالحالة:",
    options: [
      { key: "A", text: "Fe⁴⁺", textAr: "Fe⁴⁺" },
      { key: "B", text: "Fe³⁺", textAr: "Fe³⁺" },
      { key: "C", text: "Fe⁰", textAr: "Fe⁰" },
      { key: "D", text: "Fe²⁺", textAr: "Fe²⁺ (الحديدوز - Ferrous)" }
    ],
    correctAnswer: "D",
    category: "RBC Physiology & Metabolism",
    explanation: "Physiological hemoglobin requires iron in the ferrous (Fe2+) state to reversibly bind molecular oxygen. Oxidation of iron to the ferric (Fe3+) state produces methemoglobin, which is incapable of binding oxygen.",
    explanationAr: "يجب أن يكون الحديد في حالة الحديدوز (Fe²⁺) الثنائية ليرتبط بعكسية مع جزيء الأكسجين؛ أما تحوله إلى Fe³⁺ الثلاثي فينتج الميتهيموجلوبين العاجز عن نقل الأكسجين.",
    pearl: "Mnemonic: 'Fe2+ binds O2' (ferrous binds two). Oxidation to Fe3+ = Methemoglobin."
  },
  {
    id: 9,
    question: "Sickle cell anaemia is caused by:",
    questionAr: "ينجم فقر الدم المنجلي عن:",
    options: [
      { key: "A", text: "Raised HbF", textAr: "ارتفاع هيموجلوبين F" },
      { key: "B", text: "The presence of HbS", textAr: "وجود هيموجلوبين S (HbS)" },
      { key: "C", text: "Iron deficiency", textAr: "عوز الحديد" },
      { key: "D", text: "Vitamin B12 deficiency", textAr: "عوز فيتامين B12" }
    ],
    correctAnswer: "B",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Sickle cell anaemia (homozygous HbSS) is caused by a point mutation (GAG to GTG) in codon 6 of the beta-globin gene, resulting in the substitution of hydrophilic glutamic acid with hydrophobic valine (Glu6Val). Under deoxygenated conditions, HbS polymerizes into long fibers that deform red cells into a sickle shape.",
    explanationAr: "ينتج فقر الدم المنجلي عن طفرة نقطية تستبدل حمض الجلوتاميك بالفالين عند الموضع 6 في سلسلة بيتا، مكوناً هيموجلوبين S الذي يتبلمر عند نقص الأكسجين ليغير شكل الخلية إلى هلالي أو منجلي.",
    pearl: "HbS mutation: β6 Glu -> Val. In HbC it is β6 Glu -> Lys."
  },
  {
    id: 10,
    question: "Unconjugated bilirubin rises in haemolysis because:",
    questionAr: "يرتفع البيليروبين غير المقترن في انحلال الدم لأن:",
    options: [
      { key: "A", text: "Iron absorption increases", textAr: "امتصاص الحديد يزداد" },
      { key: "B", text: "Calcium levels fall", textAr: "مستويات الكالسيوم تنخفض" },
      { key: "C", text: "The liver fails to conjugate it", textAr: "الكبد يفشل في ربطه تماماً" },
      { key: "D", text: "Haem is broken down and converted to bilirubin", textAr: "الهيم يتفكك ويتحول إلى بيليروبين بكميات تفوق قدرة الكبد" }
    ],
    correctAnswer: "D",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "When red blood cells are destroyed in large numbers, hemoglobin is released and catabolized by reticuloendothelial macrophages. Heme oxygenase cleaves heme into biliverdin and iron, and biliverdin reductase converts it into unconjugated (indirect) bilirubin, exceeding the liver's UDP-glucuronosyltransferase conjugating capacity.",
    explanationAr: "يؤدي تكسر كريات الدم الحمراء إلى تحرر الهيم وتحوله إلى بيليروبين غير مقترن بواسطة خلايا البلعمة بكميات ضخمة تفوق طاقة الكبد الاقترانية، مما يؤدي لليرقان اللاحلولي.",
    pearl: "Unconjugated bilirubin is water-insoluble, bound to albumin, and does not appear in urine (acholuric jaundice)."
  },
  {
    id: 11,
    question: "In iron deficiency anaemia, red cells are typically:",
    questionAr: "في فقر الدم بعوز الحديد، تكون كريات الدم الحمراء عادة:",
    options: [
      { key: "A", text: "Small and hypochromic", textAr: "صغيرة وناقصة الصباغ (Microcytic & Hypochromic)" },
      { key: "B", text: "Sickle-shaped", textAr: "منجلية الشكل" },
      { key: "C", text: "Large in size", textAr: "كبيرة الحجم (Macrocytic)" },
      { key: "D", text: "Spherical", textAr: "كروية الشكل" }
    ],
    correctAnswer: "A",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Lack of iron impairs heme and hemoglobin synthesis. As erythroblasts divide in the bone marrow without sufficient hemoglobin filling, they undergo extra mitotic divisions, resulting in microcytic (MCV < 80 fL) and hypochromic (MCH < 27 pg) erythrocytes.",
    explanationAr: "يؤدي نقص الحديد إلى ضعف تصنيع الهيموجلوبين، فتنتج كريات دم حمراء صغيرة الحجم (Microcytic) باهتة قليلة الصباغ مع اتساع المنطقة الشاحبة المركزية (Hypochromic).",
    pearl: "Blood smear in IDA: Microcytic hypochromic red cells, anisopoikilocytosis, and pencil/cigar cells."
  },
  {
    id: 12,
    question: "Basophils contain granules rich in:",
    questionAr: "تحتوي حبيبات الخلايا القاعدية (Basophils) بكثرة على:",
    options: [
      { key: "A", text: "Iron", textAr: "الحديد" },
      { key: "B", text: "Albumin", textAr: "الألبومين" },
      { key: "C", text: "Erythropoietin", textAr: "الإريثروبويتين" },
      { key: "D", text: "Histamine", textAr: "الهستامين (Histamine) والهيبارين" }
    ],
    correctAnswer: "D",
    category: "Leukocytes & Immunology",
    explanation: "Basophils are circulating granulocytes characterized by large, coarse, dark-purple metachromatic granules that contain histamine, heparin, leukotrienes, and chondroitin sulfate, playing a pivotal role in immediate hypersensitivity and allergic reactions.",
    explanationAr: "حبيبات الخلايا القاعدية تحتوي على وسائط التهابية فاعلة أهمها الهستامين (Histamine) والهيبارين، وتساهم في التفاعلات التحسسية والالتهابية الحادة.",
    pearl: "Persistent absolute basophilia (>0.1 x 10^9/L) is a classic clue for Chronic Myeloid Leukaemia (CML) and other myeloproliferative neoplasms."
  },
  {
    id: 13,
    question: "In beta-thalassaemia trait, HbA2 is:",
    questionAr: "في سمة الثلاسيميا بيتا (حامل الثلاسيميا)، تكون نسبة HbA2:",
    options: [
      { key: "A", text: "Below 2%", textAr: "أقل من 2%" },
      { key: "B", text: "About 50%", textAr: "حوالي 50%" },
      { key: "C", text: "Above 3.5%", textAr: "أعلى من 3.5% (عادة 3.6% - 7%)" },
      { key: "D", text: "Zero", textAr: "صفر" }
    ],
    correctAnswer: "C",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Beta-thalassaemia minor (trait) involves reduced synthesis of beta-globin chains. In compensation, delta chain synthesis combines with excess alpha chains (alpha2-delta2), raising HbA2 above 3.5% (typically 3.6%–7.0%). This elevation is the cornerstone of laboratory diagnosis by hemoglobin electrophoresis or HPLC.",
    explanationAr: "تعتبر زيادة نسبة الهيموجلوبين HbA2 فوق 3.5% (ألفا2-دلتا2) هي المعيار التشخيصي الذهبي لسمة الثلاسيميا بيتا (Beta-thalassaemia trait).",
    pearl: "Normal HbA2 is 2.0% - 3.3%. In beta-thalassaemia trait, HbA2 > 3.5%. Note: Co-existing severe iron deficiency can falsely normalize HbA2."
  },
  {
    id: 14,
    question: "Bone marrow aspiration is mainly used to:",
    questionAr: "يُستخدم رشف نقي العظم (Bone marrow aspiration) بشكل رئيسي لـ:",
    options: [
      { key: "A", text: "Diagnose kidney disease", textAr: "تشخيص أمراض الكلى" },
      { key: "B", text: "Measure blood pressure", textAr: "قياس ضغط الدم" },
      { key: "C", text: "Diagnose leukaemia and determine its type", textAr: "تشخيص ابيضاض الدم وتحديد نوعه" },
      { key: "D", text: "Measure blood sugar", textAr: "قياس سكر الدم" }
    ],
    correctAnswer: "C",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Bone marrow aspiration provides a cytologic smear to assess cell morphology, blast percentages, maturation arrest, flow cytometry immunophenotyping, cytogenetics, and molecular testing essential for diagnosing and classifying hematologic malignancies such as leukaemias, multiple myeloma, and myelodysplastic syndromes.",
    explanationAr: "يُعد رشف نخاع العظم الفحص التشخيصي الأساسي لدراسة أشكال وتصنيف خلايا الدم المتسرطنة (Leukaemia) وإجراء التنميط الظاهري المناعي والجينات.",
    pearl: "Marrow aspiration evaluates cytomorphology and flow cytometry; trephine biopsy assesses overall cellularity, architecture, and marrow fibrosis."
  },
  {
    id: 15,
    question: "The main pathway for ATP production in red cells is:",
    questionAr: "المسار الرئيسي لإنتاج طاقة ATP في كريات الدم الحمراء هو:",
    options: [
      { key: "A", text: "Protein catabolism", textAr: "هدم البروتينات" },
      { key: "B", text: "Glycolysis (Embden–Meyerhof pathway)", textAr: "التحلل السكري (مسار إمبدن-مايرهوف)" },
      { key: "C", text: "Fatty acid oxidation", textAr: "أكسدة الأحماض الدهنية" },
      { key: "D", text: "The Krebs cycle", textAr: "دورة كريبس" }
    ],
    correctAnswer: "B",
    category: "RBC Physiology & Metabolism",
    explanation: "Mature red blood cells lack mitochondria, so they cannot perform oxidative phosphorylation or the Krebs cycle. They rely exclusively on anaerobic glycolysis (Embden–Meyerhof pathway) to convert glucose into lactate, generating 2 molecules of ATP per glucose molecule to power Na+/K+ ATPase pumps and maintain cellular integrity.",
    explanationAr: "لعدم امتلاك كريات الدم الحمراء ميتوكوندريا، فإنها تعتمد كلياً على التحلل السكري اللاهوائي (Embden–Meyerhof) لإنتاج جزيئات ATP الضرورية للحفاظ على مضخات الغشاء الخلوي وشكله المقعر.",
    pearl: "Pyruvate kinase deficiency is the most common glycolytic enzyme defect causing hereditary non-spherocytic hemolytic anemia."
  },
  {
    id: 16,
    question: "Haematology is the branch of medicine that studies:",
    questionAr: "علم أمراض الدم (Haematology) هو فرع الطب الذي يختص بدراسة:",
    options: [
      { key: "A", text: "The central nervous system", textAr: "الجهاز العصبي المركزي" },
      { key: "B", text: "The digestive system and its diseases", textAr: "الجهاز الهضمي وأمراضه" },
      { key: "C", text: "Blood, its forming organs and their diseases", textAr: "الدم وأعضاء تكوينه وأمراضهما" },
      { key: "D", text: "Muscles and joints", textAr: "العضلات والمفاصل" }
    ],
    correctAnswer: "C",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Haematology encompasses the physiology, pathology, etiology, diagnosis, treatment, prognosis, and prevention of disorders related to blood, bone marrow, spleen, lymph nodes, and hemostatic/coagulation proteins.",
    explanationAr: "علم الدم (Haematology) هو التخصص الطبي الذي يعنى بدراسة الدم، ومكوناته، والأعضاء المكونة له كالنقي والطحال، واضطرابات التخثر وسرطانات الدم.",
    pearl: "Derived from the Greek 'haima' (blood) and 'logos' (study)."
  },
  {
    id: 17,
    question: "T lymphocytes mature in the:",
    questionAr: "تنضج الخلايا الليمفاوية التائية (T cells) في:",
    options: [
      { key: "A", text: "Thymus", textAr: "الغدة الصعترية (Thymus)" },
      { key: "B", text: "Long bones", textAr: "العظام الطويلة" },
      { key: "C", text: "Spleen only", textAr: "الطحال فقط" },
      { key: "D", text: "Liver", textAr: "الكبد" }
    ],
    correctAnswer: "A",
    category: "Leukocytes & Immunology",
    explanation: "T cell progenitors arise from hematopoietic stem cells in the bone marrow, then migrate to the thymus where they undergo positive selection (MHC restriction) and negative selection (central tolerance) to mature into immunocompetent CD4+ helper or CD8+ cytotoxic T cells.",
    explanationAr: "تنشأ طليعة الخلايا التائية في نخاع العظم ثم تهاجر إلى الغدة التيموسية/الصعترية (Thymus) حيث تنضج وتخضع لعمليات الاصطفاء الإيجابي والسلبي.",
    pearl: "T for Thymus (T-lymphocytes); B for Bone marrow (B-lymphocytes, or Bursa of Fabricius in birds)."
  },
  {
    id: 18,
    question: "A common symptom of leukaemia is:",
    questionAr: "من الأعراض الشائعة لابيضاض الدم (Leukaemia):",
    options: [
      { key: "A", text: "Localised itching only", textAr: "حكة موضعية فقط" },
      { key: "B", text: "Excessive weight gain only", textAr: "زيادة مفرطة في الوزن فقط" },
      { key: "C", text: "Mild headache only", textAr: "صداع خفيف فقط" },
      { key: "D", text: "Fatigue, pallor, bruising and bleeding", textAr: "الإرهاق، الشحوب، الكدمات والنزف غير المبرر" }
    ],
    correctAnswer: "D",
    category: "Leukaemia & Myeloproliferative Disorders",
    explanation: "Leukemic infiltration suppresses normal bone marrow hematopoiesis (bone marrow failure), resulting in anemia (fatigue, lethargy, pallor), thrombocytopenia (petechiae, purpura, easy bruising, mucosal bleeding), and functional neutropenia (recurrent fever, infections).",
    explanationAr: "يؤدي ارتشاح خلايا اللوكيميا في نخاع العظم إلى فشل إنتاج الخلايا الطبيعية، مسبباً أنيميا (تعب وشحوب)، ونقص صفائح (نزيف وكدمات)، ونقص مناعة وعدوى متكررة.",
    pearl: "The classic presentation of acute leukemia is the clinical manifestation of marrow replacement: pancytopenia."
  },
  {
    id: 19,
    question: "G6PD deficiency commonly shows its effects after exposure to:",
    questionAr: "غالباً ما تظهر أعراض عوز إنزيم G6PD بعد التعرض لـ:",
    options: [
      { key: "A", text: "Fava beans and certain oxidant drugs", textAr: "الفول الحراتي وبعض الأدوية المؤكسدة" },
      { key: "B", text: "Pregnancy", textAr: "الحمل" },
      { key: "C", text: "Sunlight alone", textAr: "أشعة الشمس وحدها" },
      { key: "D", text: "Dairy products", textAr: "منتجات الألبان" }
    ],
    correctAnswer: "A",
    category: "RBC Physiology & Metabolism",
    explanation: "Glucose-6-phosphate dehydrogenase (G6PD) deficiency is an X-linked recessive disorder where red cells cannot generate adequate NADPH to regenerate reduced glutathione. Oxidative stressors—such as fava beans (favism), infections, or oxidant medications (primaquine, dapsone, sulfa drugs, rasburicase)—cause acute intravascular/extravascular hemolysis with Heinz body formation and bite cells.",
    explanationAr: "يؤدي عوز G6PD إلى عجز الخلية عن حماية نفسها من الجذور الحرة لقلة مركب NADPH؛ ويحدث الانحلال بعد تناول الفول (Favism) أو أدوية مؤكسدة مثل السلفا والدابسون والبريماكين.",
    pearl: "Blood smear in acute G6PD crisis: 'Bite cells' (degmacytes) created when splenic macrophages pluck out oxidized hemoglobin aggregates (Heinz bodies)."
  },
  {
    id: 20,
    question: "The packed cell volume (PCV, haematocrit) represents:",
    questionAr: "يمثل حجم الخلايا المكدسة (PCV / الهيماتوكريت):",
    options: [
      { key: "A", text: "The erythrocyte sedimentation rate", textAr: "معدل ترسب كريات الدم الحمراء" },
      { key: "B", text: "The iron concentration in plasma", textAr: "تركيز الحديد في البلازما" },
      { key: "C", text: "The platelet count per microlitre", textAr: "تعداد الصفائح لكل ميكرولتر" },
      { key: "D", text: "The proportion of blood volume occupied by red cells", textAr: "النسبة المئوية لحجم الدم التي تشغلها كريات الدم الحمراء" }
    ],
    correctAnswer: "D",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Packed cell volume (PCV), synonymous with haematocrit (Hct), is the percentage or fraction of whole blood volume occupied by erythrocytes following centrifugation. In adult males, normal is typically 40–52%; in females, 36–48%.",
    explanationAr: "الهيماتوكريت (Hct/PCV) هو النسبة المئوية لحجم كريات الدم الحمراء بالنسبة لحجم الدم الكلي بعد إجراء التثفيل/الطرد المركزي.",
    pearl: "Rule of Three: Hemoglobin (g/dL) x 3 ≈ Hematocrit (%). E.g., Hb 15 g/dL -> Hct ~45%."
  },
  {
    id: 21,
    question: "Koilonychia (spoon-shaped nails) is a sign of:",
    questionAr: "تعتبر تقعر الأظافر (الأظافر الملعقية - Koilonychia) علامة مميزة لـ:",
    options: [
      { key: "A", text: "Thalassaemia major", textAr: "الثلاسيميا الكبرى" },
      { key: "B", text: "Chronic iron deficiency", textAr: "عوز الحديد المزمن والمتقدم" },
      { key: "C", text: "Vitamin B12 deficiency", textAr: "عوز فيتامين B12" },
      { key: "D", text: "Chronic lymphocytic leukaemia", textAr: "ابيضاض الدم الليمفاوي المزمن" }
    ],
    correctAnswer: "B",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Koilonychia refers to concave, upward-curving, spoon-shaped fingernails that can hold a drop of water. It is a classic clinical tissue sign of long-standing, severe iron deficiency anaemia caused by iron-dependent epithelial enzyme depletion.",
    explanationAr: "تقعر الأظافر (Koilonychia) أو الأظافر الملعقية ينتج عن نقص الحديد المزمن الحاد الذي يسبب هشاشة وضعف النسيج الظهاري وقاعدة الظفر.",
    pearl: "Other epithelial signs of chronic iron deficiency: Angular cheilitis, atrophic glossitis, and esophageal webs (Plummer–Vinson syndrome)."
  },
  {
    id: 22,
    question: "Lymphocytes commonly increase in:",
    questionAr: "يرتفع عدد الخلايا الليمفاوية عادة في حالات:",
    options: [
      { key: "A", text: "Iron deficiency", textAr: "عوز الحديد" },
      { key: "B", text: "Haemolytic anaemia only", textAr: "فقر الدم الانحلالي فقط" },
      { key: "C", text: "Severe dehydration", textAr: "الجفاف الشديد" },
      { key: "D", text: "Viral infections", textAr: "العدوى الفيروسية" }
    ],
    correctAnswer: "D",
    category: "Leukocytes & Immunology",
    explanation: "Absolute lymphocytosis is a typical reactive response to acute viral infections (such as Epstein-Barr virus/infectious mononucleosis, CMV, viral hepatitis, and pertussis, which is a bacterial exception). In contrast, acute bacterial infections typically cause neutrophilia.",
    explanationAr: "يزداد تعداد الخلايا اللمفاوية (Lymphocytosis) استجابة للالتهابات الفيروسية، في حين تزداد العدلات (Neutrophils) في الإنتانات البكتيرية الحادة.",
    pearl: "Atypical reactive lymphocytes on a blood smear with fever and lymphadenopathy strongly suggest EBV mononucleosis."
  },
  {
    id: 23,
    question: "Most erythropoietin is produced in the:",
    questionAr: "يتم إنتاج معظم هرمون الإريثروبويتين (EPO) في:",
    options: [
      { key: "A", text: "Bone marrow", textAr: "نخاع العظم" },
      { key: "B", text: "Kidney", textAr: "الكليتين (خلايا حول الأنابيب الخلالية)" },
      { key: "C", text: "Adult liver", textAr: "كبد البالغين" },
      { key: "D", text: "Spleen", textAr: "الطحال" }
    ],
    correctAnswer: "B",
    category: "RBC Physiology & Metabolism",
    explanation: "Approximately 85–90% of erythropoietin (EPO) in adults is synthesized by renal peritubular interstitial fibroblasts in response to tissue hypoxia sensed via Hypoxia-Inducible Factor (HIF). The remaining 10–15% is produced by the liver.",
    explanationAr: "تنتج الكلية ما يقارب 85-90% من هرمون الإريثروبويتين في البالغين استجابة لنقص أكسجة الأنسجة، ويساهم الكبد بالنسبة المتبقية.",
    pearl: "Chronic Kidney Disease (CKD) inevitably causes normocytic normochromic anemia due to loss of peritubular EPO production."
  },
  {
    id: 24,
    question: "B lymphocytes mature in the:",
    questionAr: "تنضج الخلايا الليمفاوية البائية (B cells) في:",
    options: [
      { key: "A", text: "Thymus", textAr: "الغدة الصعترية" },
      { key: "B", text: "Liver", textAr: "الكبد" },
      { key: "C", text: "Kidney", textAr: "الكلى" },
      { key: "D", text: "Bone marrow", textAr: "نخاع العظم (Bone marrow)" }
    ],
    correctAnswer: "D",
    category: "Leukocytes & Immunology",
    explanation: "In mammals, B lymphocytes develop and complete their primary maturation process in the bone marrow before migrating to secondary lymphoid organs (lymph nodes, spleen). During maturation, B cells rearrange immunoglobulin heavy and light chain genes.",
    explanationAr: "تتطور وتنضج الخلايا اللمفاوية البائية في نخاع العظم (Bone Marrow) حيث تخضع لترتيب جينات الأجسام المضادة وتثبيط التفاعل الذاتي.",
    pearl: "B cells mature in the Bone marrow and differentiate into plasma cells that secrete antibodies."
  },
  {
    id: 25,
    question: "Thalassaemia is an inherited disorder of:",
    questionAr: "الثلاسيميا هي اضطراب وراثي ناتج عن خلل في:",
    options: [
      { key: "A", text: "Iron absorption", textAr: "امتصاص الحديد" },
      { key: "B", text: "Fibrin production", textAr: "إنتاج الفايبرين" },
      { key: "C", text: "Platelet formation", textAr: "تكوين الصفائح الدموية" },
      { key: "D", text: "Globin chain synthesis in haemoglobin", textAr: "تخليق سلاسل الجلوبين في الهيموجلوبين" }
    ],
    correctAnswer: "D",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Thalassaemias are a heterogeneous group of hereditary microcytic hemolytic disorders characterized by absent or reduced synthesis of one or more globin polypeptide chains of hemoglobin (alpha- or beta-chains), leading to globin chain imbalance, ineffective erythropoiesis, and hemolysis.",
    explanationAr: "الثلاسيميا مرض وراثي ينتج عن نقص أو انعدام تصنيع إحدى سلاسل الجلوبين (ألفا أو بيتا)، مما يخل بتكوين الهيموجلوبين ويسبب انحلال الدم وفقر دم صغير الكريات.",
    pearl: "Thalassaemia = Quantitative globin defect (underproduction). Sickle cell = Qualitative globin defect (structural variant)."
  },
  {
    id: 26,
    question: "Absorption of vitamin B12 requires:",
    questionAr: "يتطلب امتصاص فيتامين B12 وجود:",
    options: [
      { key: "A", text: "Folic acid", textAr: "حمض الفوليك" },
      { key: "B", text: "Intrinsic factor", textAr: "العامل الداخلي (Intrinsic Factor)" },
      { key: "C", text: "Bile salts only", textAr: "الأملاح الصفراوية فقط" },
      { key: "D", text: "Ferrous iron", textAr: "حديد بحالة الحديدوز" }
    ],
    correctAnswer: "B",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Vitamin B12 (cobalamin) combines in the duodenum with Intrinsic Factor (IF), a glycoprotein secreted by gastric parietal cells. The IF-B12 complex travels down the small bowel and binds to cubam receptors on enterocytes in the terminal ileum for receptor-mediated endocytosis.",
    explanationAr: "يرتبط فيتامين B12 بالعامل الداخلي (IF) الذي تفرزه الخلايا الجدارية في المعدة، ليمر المعقد إلى اللفائفي الانتهائي (Terminal Ileum) ويتم امتصاصه.",
    pearl: "Resection of either the stomach (gastrectomy) or the terminal ileum abolishes vitamin B12 absorption."
  },
  {
    id: 27,
    question: "Target cells are a characteristic feature of:",
    questionAr: "تعتبر الخلايا الهدفية (Target cells / Codocytes) ميزة مميزة لـ:",
    options: [
      { key: "A", text: "Thalassaemia", textAr: "الثلاسيميا" },
      { key: "B", text: "Acute leukaemia", textAr: "ابيضاض الدم الحاد" },
      { key: "C", text: "Vitamin B12 deficiency", textAr: "عوز فيتامين B12" },
      { key: "D", text: "Burns", textAr: "الحروق" }
    ],
    correctAnswer: "A",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Target cells (codocytes or 'bull's eye' cells) have an excess of red cell surface membrane relative to intracellular hemoglobin content. They are characteristically seen in hemoglobinopathies (especially thalassaemia, HbC, HbS), liver disease, and post-splenectomy states.",
    explanationAr: "الخلايا الهدفية (Target cells) تنجم عن زيادة مساحة الغشاء الخلوي مقارنة بمحتوى الهيموجلوبين، وتظهر بوضوح في الثلاسيميا، واعتلالات الهيموجلوبين وأمراض الكبد وبعد استئصال الطحال.",
    pearl: "Mnemonic 'HALT' for target cells: HbC / Hemoglobinopathies, Asplenia (post-splenectomy), Liver disease, Thalassaemia."
  },
  {
    id: 28,
    question: "The most abundant white blood cell in adult blood is the:",
    questionAr: "أكثر خلايا الدم البيضاء وفرة في دم البالغين الطبيعي هي:",
    options: [
      { key: "A", text: "Basophil", textAr: "الخلية القاعدية (Basophil)" },
      { key: "B", text: "Neutrophil", textAr: "الخلية المتعادلة (Neutrophil)" },
      { key: "C", text: "Eosinophil", textAr: "الخلية الحمضية (Eosinophil)" },
      { key: "D", text: "Lymphocyte", textAr: "الخلية اللمفاوية (Lymphocyte)" }
    ],
    correctAnswer: "B",
    category: "Leukocytes & Immunology",
    explanation: "Neutrophils (polymorphonuclear leukocytes) make up roughly 50–70% of circulating white blood cells in healthy adults. Lymphocytes follow at 20–40%, monocytes 2–8%, eosinophils 1–4%, and basophils 0.5–1%.",
    explanationAr: "العدلات (Neutrophils) تشكل النسبة الكبرى من الكريات البيضاء لدى البالغين (حوالي 50% - 70%) وتعتبر خط الدفاع الأول ضد البكتيريا.",
    pearl: "WBC abundance mnemonic: 'Never Let Monkeys Eat Bananas' (Neutrophils > Lymphocytes > Monocytes > Eosinophils > Basophils)."
  },
  {
    id: 29,
    question: "A pluripotent stem cell gives rise to:",
    questionAr: "تتمايز الخلية الجذعية متعددة القدرات (Pluripotent stem cell) إلى:",
    options: [
      { key: "A", text: "All blood cell types", textAr: "جميع أنواع خلايا الدم المختلفة" },
      { key: "B", text: "Platelets only", textAr: "الصفائح الدموية فقط" },
      { key: "C", text: "Lymphocytes only", textAr: "الخلايا الليمفاوية فقط" },
      { key: "D", text: "Red cells only", textAr: "كريات الدم الحمراء فقط" }
    ],
    correctAnswer: "A",
    category: "RBC Physiology & Metabolism",
    explanation: "The hematopoietic stem cell (HSC) is pluripotent/multipotent and self-renewing. It bifurcates into the Common Myeloid Progenitor (CMP) and Common Lymphoid Progenitor (CLP), ultimately giving rise to erythrocytes, granulocytes, monocytes, megakaryocytes/platelets, and lymphocytes.",
    explanationAr: "الخلايا الجذعية المكونة للدم هي خلايا متعددة القدرات قادرة على التجدد الذاتي وتوليد كل السلالات الدموية (الحمراء والبيضاء والصفائح).",
    pearl: "CD34 is the classic surface marker identifying human hematopoietic stem and progenitor cells."
  },
  {
    id: 30,
    question: "In early fetal life, blood formation occurs in:",
    questionAr: "في المراحل المبكرة جداً من الحياة الجنينية، يحدث تكوين الدم في:",
    options: [
      { key: "A", text: "The thymus", textAr: "الغدة الصعترية" },
      { key: "B", text: "The brain only", textAr: "الدماغ فقط" },
      { key: "C", text: "The yolk sac, then liver and spleen", textAr: "كيس المح أولاً، ثم الكبد والطحال" },
      { key: "D", text: "The skin", textAr: "الجلد" }
    ],
    correctAnswer: "C",
    category: "RBC Physiology & Metabolism",
    explanation: "Hematopoiesis shifts temporally across anatomical niches: mesoblastic phase begins in the yolk sac (weeks 3–8), followed by the hepatic phase (primarily liver and spleen, from week 6 through the second trimester), transitioning finally to the medullary (bone marrow) phase from month 5–6 onwards.",
    explanationAr: "يبدأ تخليق الدم جنينياً في كيس المح (Yolk sac) خلال الأسابيع الأولى، ثم ينتقل إلى الكبد والطحال كأعضاء رئيسية، ليستقر في نخاع العظم بدءاً من الشهر الخامس تقريباً.",
    pearl: "Mnemonic for fetal hematopoiesis sites: 'Young Liver Synthesizes Blood' (Yolk sac -> Liver -> Spleen -> Bone marrow)."
  },
  {
    id: 31,
    question: "The main function of platelets is:",
    questionAr: "الوظيفة الأساسية للصفائح الدموية هي:",
    options: [
      { key: "A", text: "Secreting insulin", textAr: "إفراز الأنسولين" },
      { key: "B", text: "Carrying oxygen", textAr: "حمل ونقل الأكسجين" },
      { key: "C", text: "Fighting bacterial infection", textAr: "محاربة العدوى البكتيرية" },
      { key: "D", text: "Forming clots and stopping bleeding", textAr: "تكوين الخثرات وإيقاف النزف (الإرقاء الأولي)" }
    ],
    correctAnswer: "D",
    category: "Haemostasis, Platelets & Coagulation",
    explanation: "Platelets (thrombocytes) are essential for primary hemostasis. Upon vascular endothelial injury, platelets adhere to exposed subendothelial von Willebrand factor and collagen, undergo activation and granule release (ADP, thromboxane A2), and aggregate to form the initial platelet plug.",
    explanationAr: "الصفائح مسؤولة عن الإرقاء الأولي (Primary Hemostasis)؛ تلتصق بجدار الوعاء المصاب وتتجمع مشكلة السدادة الصفيحية لمنع استمرار النزيف.",
    pearl: "GPIb receptor binds vWF (adhesion); GPIIb/IIIa binds fibrinogen to cross-link platelets (aggregation)."
  },
  {
    id: 32,
    question: "The chromosome abnormality associated with chronic myeloid leukaemia (CML) is:",
    questionAr: "الشذوذ الصبغي المرتبط بابيضاض الدم النقوي المزمن (CML) هو:",
    options: [
      { key: "A", text: "The Philadelphia chromosome", textAr: "صبغي فيلادلفيا (Philadelphia chromosome)" },
      { key: "B", text: "Trisomy 21", textAr: "تثلث الصبغي 21" },
      { key: "C", text: "Loss of the Y chromosome", textAr: "فقدان الصبغي Y" },
      { key: "D", text: "An extra X chromosome", textAr: "صبغي X إضافي" }
    ],
    correctAnswer: "A",
    category: "Leukaemia & Myeloproliferative Disorders",
    explanation: "The Philadelphia chromosome is a reciprocal translocation between the long arms of chromosomes 9 and 22: t(9;22)(q34;q11). This fuses the BCR gene on chr 22 with the ABL1 tyrosine kinase gene on chr 9, forming the BCR-ABL1 oncoprotein with constitutively active tyrosine kinase activity.",
    explanationAr: "صبغي فيلادلفيا هو انتقال صبغي متبادل t(9;22) يؤدي لاندماج جيني BCR-ABL1 وتوليد إنزيم تيروسين كايناز نشط دوماً يسبب تكاثراً نقوياً غير منضبط.",
    pearl: "Targeted therapy breakthrough: Imatinib and other TKIs directly inhibit the BCR-ABL1 kinase domain in CML."
  },
  {
    id: 33,
    question: "The enzyme G6PD protects red cells against oxidative damage through:",
    questionAr: "يحمي إنزيم G6PD خلايا الدم الحمراء من الأضرار المؤكسدة من خلال:",
    options: [
      { key: "A", text: "Protein synthesis", textAr: "تخليق البروتينات" },
      { key: "B", text: "Lipid breakdown", textAr: "تكسير الدهون" },
      { key: "C", text: "The pentose phosphate pathway", textAr: "مسار فوسفات البنتوز (Pentose Phosphate Pathway)" },
      { key: "D", text: "The Krebs cycle", textAr: "دورة كريبس" }
    ],
    correctAnswer: "C",
    category: "RBC Physiology & Metabolism",
    explanation: "G6PD is the rate-limiting enzyme of the Hexose Monophosphate (HMP) / Pentose Phosphate Pathway (PPP). It oxidizes glucose-6-phosphate to produce NADPH. NADPH is indispensable for glutathione reductase to maintain reduced glutathione (GSH), which neutralizes reactive oxygen species and peroxides.",
    explanationAr: "إنزيم G6PD هو الإنزيم المحدد لسرعة مسار فوسفات البنتوز، ومصدر إنتاج مركب NADPH الوحيد في كريات الدم الحمراء لإعادة تدوير الجلوتاثيون وحماية الهيموجلوبين من الأكسدة.",
    pearl: "Because RBCs lack nuclei and mitochondria, the HMP shunt is their ONLY source of NADPH for antioxidant defense."
  },
  {
    id: 34,
    question: "Eosinophils typically increase in:",
    questionAr: "يرتفع تعداد الخلايا الحمضية (Eosinophils) نمطياً في:",
    options: [
      { key: "A", text: "Severe dehydration", textAr: "الجفاف الشديد" },
      { key: "B", text: "Iron deficiency", textAr: "عوز الحديد" },
      { key: "C", text: "Allergy and parasitic infections", textAr: "الأمراض التحسسية والعدوى الطفيلية" },
      { key: "D", text: "Early pregnancy", textAr: "بداية الحمل" }
    ],
    correctAnswer: "C",
    category: "Leukocytes & Immunology",
    explanation: "Eosinophilia is classically stimulated by interleukin-5 (IL-5) produced by Th2 cells. The two most common clinical causes worldwide are allergic conditions (asthma, allergic rhinitis, eczema, drug reactions) and helminthic parasitic infections (e.g., Schistosoma, Ascaris, Strongyloides).",
    explanationAr: "تزداد الخلايا الحمضية (Eosinophilia) في الاستجابات المناعية للديدان والطفليات وكذلك أمراض الحساسية كالربو والأكزيما بتأثير السيتوكين IL-5.",
    pearl: "Mnemonic for causes of eosinophilia: 'NAACP' (Neoplasms, Allergies/Asthma, Addison disease, Collagen vascular diseases, Parasites)."
  },
  {
    id: 35,
    question: "Hereditary spherocytosis is caused by:",
    questionAr: "ينجم داء الكريات الحمر الكروية الوراثي عن:",
    options: [
      { key: "A", text: "A defect in membrane skeletal proteins", textAr: "خلل في بروتينات الهيكل الغشائي (مثل الأنكيرين والسبكترين)" },
      { key: "B", text: "A haemoglobin mutation", textAr: "طفرة في الهيموجلوبين" },
      { key: "C", text: "Iron deficiency", textAr: "نقص الحديد" },
      { key: "D", text: "G6PD deficiency", textAr: "عوز G6PD" }
    ],
    correctAnswer: "A",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Hereditary spherocytosis (HS) is an inherited hemolytic disorder usually due to autosomal dominant mutations in genes encoding red cell membrane skeletal components (ankyrin, alpha/beta spectrin, band 3, or protein 4.2). Loss of membrane cohesion leads to microvesicle shedding, decreased surface area-to-volume ratio, sphere-shaped cells, and splenic entrapment.",
    explanationAr: "داء الكريات الحمر الكروية ينتج عن طفرات وراثية في بروتينات هيكل الغشاء (الأنكيرين والسبكترين)، فتفقد الخلية تقعرها وتصبح كروية هشة تحتجز وتتدمر في الطحال.",
    pearl: "Confirmatory diagnostic test: Eosin-5-maleimide (EMA) binding test via flow cytometry or osmotic fragility test."
  },
  {
    id: 36,
    question: "Fetal haemoglobin (HbF) consists of:",
    questionAr: "يتكون الهيموجلوبين الجنيني (HbF) من سلاسل:",
    options: [
      { key: "A", text: "α₂γ₂", textAr: "α₂γ₂ (سلسلتين ألفا وسلسلتين غاما)" },
      { key: "B", text: "α₂δ₂", textAr: "α₂δ₂" },
      { key: "C", text: "γ₄ only", textAr: "γ₄ فقط" },
      { key: "D", text: "α₂β₂", textAr: "α₂β₂" }
    ],
    correctAnswer: "A",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Fetal hemoglobin (HbF) is composed of two alpha (alpha) and two gamma (gamma) globin chains (alpha2-gamma2). Its gamma chains have lower affinity for 2,3-BPG than adult beta chains, allowing HbF to bind oxygen with higher affinity and extract oxygen across the placenta.",
    explanationAr: "يتكون الهيموجلوبين الجنيني (HbF) من سلسلتي ألفا وسلسلتي غاما (α₂γ₂)، وتمنحه هذه التركيبة انجذاباً أعلى للأكسجين مقارنة بهيموجلوبين الأم لتسهيل نقله للجنين.",
    pearl: "Normal globin compositions: HbA = α2β2; HbA2 = α2δ2; HbF = α2γ2; Hb Barts = γ4; HbH = β4."
  },
  {
    id: 37,
    question: "Anaemia of chronic disease is usually:",
    questionAr: "فقر الدم المصاحب للأمراض المزمنة (ACD) يكون عادة:",
    options: [
      { key: "A", text: "Always macrocytic", textAr: "كبير الكريات دائماً" },
      { key: "B", text: "Normocytic with normal or high ferritin", textAr: "سوي الكريات مع فيريتين طبيعي أو مرتفع" },
      { key: "C", text: "Spherocytic only", textAr: "كروي الكريات فقط" },
      { key: "D", text: "Microcytic with zero ferritin", textAr: "صغير الكريات مع فيريتين منعدم" }
    ],
    correctAnswer: "B",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Anaemia of Chronic Disease (ACD) / Anaemia of Inflammation is typically normocytic, normochromic (becoming mildly microcytic in prolonged cases). Chronic inflammatory cytokines (principally IL-6) stimulate hepatic production of hepcidin, which degrades ferroportin, sequestering iron within macrophages. Hence, serum ferritin is normal or elevated.",
    explanationAr: "أنيميا الأمراض المزمنة تكون غالباً سوية الكريات (Normocytic) مع بقاء الفيريتين طبيعياً أو مرتفعاً نتيجة حبس الحديد داخل البلاعم بفعل هرمون الهيبسيدين الالتهابي.",
    pearl: "Differentiating IDA vs ACD: Serum ferritin is low in IDA (<30 ug/L) and elevated/normal in ACD (>100 ug/L)."
  },
  {
    id: 38,
    question: "The mature red blood cell lacks:",
    questionAr: "تفتقر كرية الدم الحمراء الناضجة إلى وجود:",
    options: [
      { key: "A", text: "Enzymes", textAr: "الإنزيمات" },
      { key: "B", text: "Haemoglobin", textAr: "الهيموجلوبين" },
      { key: "C", text: "Plasma membrane", textAr: "الغشاء البلازمي" },
      { key: "D", text: "Mitochondria and a nucleus", textAr: "الميتوكوندريا والنواة" }
    ],
    correctAnswer: "D",
    category: "RBC Physiology & Metabolism",
    explanation: "During erythroblast terminal maturation, red blood cells extrude their nucleus and degrade internal organelles including mitochondria, ribosomes, and the endoplasmic reticulum. This maximizes cytosolic space for hemoglobin and prevents the cell from consuming the oxygen it carries.",
    explanationAr: "تطرد كرية الدم الحمراء نواتها وتتخلص من الميتوكوندريا أثناء نضجها لإفساح المجال الأقصى لحزم الهيموجلوبين ولتجنب استهلاك الأكسجين الذي تنقله.",
    pearl: "Erythrocytes cannot perform transcription, translation, or oxidative phosphorylation."
  },
  {
    id: 39,
    question: "A raised 2,3-BPG level in red cells leads to:",
    questionAr: "يؤدي ارتفاع مستوى 2,3-BPG في كريات الدم الحمراء إلى:",
    options: [
      { key: "A", text: "Increased haemoglobin affinity for oxygen", textAr: "زيادة انجذاب الهيموجلوبين للأكسجين" },
      { key: "B", text: "Reduced haemoglobin affinity for oxygen", textAr: "انخفاض انجذاب الهيموجلوبين للأكسجين (انزياح المنحنى لليمين)" },
      { key: "C", text: "Longer red cell survival", textAr: "بقاء الخلية فترة أطول" },
      { key: "D", text: "Increased erythropoietin production", textAr: "زيادة إنتاج هرمون الإريثروبويتين" }
    ],
    correctAnswer: "B",
    category: "RBC Physiology & Metabolism",
    explanation: "2,3-BPG binds to the central cavity of the deoxyhemoglobin tetramer (T-state), stabilizing it and shifting the oxygen dissociation curve to the right. This reduces hemoglobin's affinity for oxygen, promoting O2 release into hypoxic peripheral tissues (e.g., at high altitude, in chronic hypoxemia, or in anaemia).",
    explanationAr: "يثبت مركب 2,3-BPG الشكل المفرغ من الأكسجين للهيموجلوبين (T-state)، مما يقلل ألفة الهيموجلوبين للأكسجين ويزيح المنحنى إلى اليمين لتفريغ الأكسجين في الأنسجة.",
    pearl: "Factors shifting the O2 dissociation curve RIGHT (releasing O2): Increased 2,3-BPG, increased H+ (low pH), increased pCO2, and increased temperature."
  },
  {
    id: 40,
    question: "Iron overload from repeated transfusions in thalassaemia is treated with:",
    questionAr: "يتم علاج فرط تراكم الحديد الناتج عن نقل الدم المتكرر في الثلاسيميا بواسطة:",
    options: [
      { key: "A", text: "Iron chelators such as deferoxamine", textAr: "خالبات الحديد مثل ديفيروكسامين (Deferoxamine)" },
      { key: "B", text: "Oral iron supplements", textAr: "مكملات الحديد الفموية" },
      { key: "C", text: "High-dose vitamin C", textAr: "جرعات عالية من فيتامين C" },
      { key: "D", text: "Corticosteroids", textAr: "الكورتيكوستيرويدات" }
    ],
    correctAnswer: "A",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Chronic transfusion therapy causes secondary hemochromatosis because humans lack a physiological mechanism to excrete excess iron. Iron accumulates in heart, liver, and endocrine glands. Treatment requires iron chelating agents such as deferoxamine (subcutaneous/IV), deferasirox (oral), or deferiprone (oral).",
    explanationAr: "يتراكم الحديد في أعضاء الجسم الحيوية بعد نقل الدم المتكرر؛ ويُعالج باستخدام خالبات الحديد (Iron Chelators) مثل الديفيروكسامين وديفيراسيروكس لطرحه عبر البول والبراز.",
    pearl: "Cardiac siderosis (iron cardiomyopathy) was historically the leading cause of death in under-chelated thalassaemia major patients."
  },
  {
    id: 41,
    question: "Folate is absorbed mainly in the:",
    questionAr: "يتم امتصاص حمض الفوليك بشكل رئيسي في:",
    options: [
      { key: "A", text: "Oesophagus", textAr: "المريء" },
      { key: "B", text: "Jejunum", textAr: "الصائم (Jejunum)" },
      { key: "C", text: "Rectum", textAr: "المستقيم" },
      { key: "D", text: "Stomach", textAr: "المعدة" }
    ],
    correctAnswer: "B",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Dietary polyglutamate folate is cleaved to monoglutamate by conjugase enzymes at the brush border and primarily absorbed in the proximal small intestine (jejunum and duodenum). In contrast, vitamin B12 is absorbed in the terminal ileum.",
    explanationAr: "يُمتص حمض الفوليك بشكل أساسي في الجزء العلوي من الأمعاء الدقيقة وتحديداً في الصائم (Jejunum)، بخلاف فيتامين B12 الذي يُمتص في اللفائفي.",
    pearl: "Mnemonic: 'Iron in Duodenum, Folate in Jejunum, B12 in Ileum' (Dude, Is Just Feeling Ill)."
  },
  {
    id: 42,
    question: "Beta-thalassaemia major typically requires:",
    questionAr: "تتطلب الثلاسيميا بيتا الكبرى (Cooley's Anemia) عادة:",
    options: [
      { key: "A", text: "Dietary supplements alone", textAr: "مكملات غذائية فقط" },
      { key: "B", text: "Regular blood transfusions from early childhood", textAr: "نقل دم منتظم مدى الحياة بدءاً من الطفولة المبكرة" },
      { key: "C", text: "Antibiotics only", textAr: "مضادات حيوية فقط" },
      { key: "D", text: "Kidney removal", textAr: "استئصال الكلية" }
    ],
    correctAnswer: "B",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Beta-thalassaemia major (homozygous beta0/beta0 or severe beta+/beta+) presents within the first 6–12 months of life (as HbF switches to HbA) with profound microcytic anemia, failure to thrive, and hepato-splenomegaly. Survival depends on regular lifelong erythrocyte transfusions coupled with iron chelation therapy.",
    explanationAr: "تظهر الثلاسيميا الكبرى في الأشهر الأولى من عمر الطفل بفقر دم شديد مهدد للحياة، وتستلزم نقل دم دوري كل 2-4 أسابيع بالإضافة لخالبات الحديد.",
    pearl: "Untreated beta-thalassaemia major leads to massive extramedullary hematopoiesis, 'chipmunk facies', and cortical bone expansion with 'crew-cut' appearance on skull X-ray."
  },
  {
    id: 43,
    question: "Monocytes differentiate in tissues into:",
    questionAr: "تتمايز الخلايا الوحيدة (Monocytes) عند دخولها الأنسجة إلى:",
    options: [
      { key: "A", text: "Platelets", textAr: "صفائح دموية" },
      { key: "B", text: "Sickle cells", textAr: "خلايا منجلية" },
      { key: "C", text: "Macrophages", textAr: "بلاعم كبرى (Macrophages) وخلايا متغصنة" },
      { key: "D", text: "Red blood cells", textAr: "خلايا دم حمراء" }
    ],
    correctAnswer: "C",
    category: "Leukocytes & Immunology",
    explanation: "Monocytes circulate in peripheral blood for 1–3 days before extravasating through capillary endothelium into various body tissues, where they differentiate into resident macrophages (e.g., Kupffer cells in liver, microglia in CNS, alveolar macrophages in lungs, osteoclasts in bone) and dendritic cells.",
    explanationAr: "تهاجر الخلايا الوحيدة من الدم إلى الأنسجة المختلفة وتتحول إلى بلاعم كبرى (Macrophages) متخصصة في البلعمة وتقديم المستضدات للمناعة التكيفية.",
    pearl: "Tissue macrophages have organ-specific names: Kupffer cells (liver), alveolar macrophages (lung), microglia (brain), osteoclasts (bone)."
  },
  {
    id: 44,
    question: "Anaemia in chronic kidney disease is mainly due to a deficiency of:",
    questionAr: "يعود فقر الدم في مرض الكلى المزمن (CKD) بشكل رئيسي إلى نقص:",
    options: [
      { key: "A", text: "Erythropoietin (EPO)", textAr: "هرمون الإريثروبويتين (EPO)" },
      { key: "B", text: "Calcium", textAr: "الكالسيوم" },
      { key: "C", text: "Vitamin D only", textAr: "فيتامين D فقط" },
      { key: "D", text: "Platelets", textAr: "الصفائح الدموية" }
    ],
    correctAnswer: "A",
    category: "RBC Physiology & Metabolism",
    explanation: "As renal parenchymal functional mass declines in chronic kidney disease (CKD), the peritubular interstitial fibroblasts fail to produce adequate erythropoietin (EPO). This produces a hypoproliferative, normocytic normochromic anemia successfully treated with recombinant erythropoiesis-stimulating agents (ESAs).",
    explanationAr: "تلف النسيج الكلوي في القصور الكلوي المزمن يفقد الجسم قدرته على إفراز الإريثروبويتين، مما يسبب فقر دم سوي الحجم والصباغ قليل الشبكيات.",
    pearl: "Target hemoglobin in CKD on ESAs is usually maintained around 10–11.5 g/dL to avoid thromboembolic and cardiovascular adverse effects."
  },
  {
    id: 45,
    question: "In methaemoglobin, iron is in the state:",
    questionAr: "في الميتهيموجلوبين (Methemoglobin)، تكون ذرة الحديد بالحالة:",
    options: [
      { key: "A", text: "Fe²⁺", textAr: "Fe²⁺ (حديدوز)" },
      { key: "B", text: "Fe⁰", textAr: "Fe⁰ (عنصري)" },
      { key: "C", text: "Fe⁴⁺", textAr: "Fe⁴⁺" },
      { key: "D", text: "Fe³⁺", textAr: "Fe³⁺ (حديديك - Ferric)" }
    ],
    correctAnswer: "D",
    category: "RBC Physiology & Metabolism",
    explanation: "In methemoglobin, heme iron is oxidized from its functional ferrous (Fe2+) state to the ferric (Fe3+) state. Ferric iron cannot bind oxygen, and it shifts the oxygen-hemoglobin dissociation curve of remaining normal heme groups to the left, causing tissue hypoxia and chocolate-brown colored blood.",
    explanationAr: "يحتوي الميتهيموجلوبين على حديد في حالة التأكسد الثلاثية (Fe³⁺ الحديديك)، وهي حالة تعجز عن نقل الأكسجين وتصبغ الدم بلون بني شيكولاتي.",
    pearl: "Antidote for acute symptomatic methemoglobinemia: Intravenous Methylene Blue (acts as an artificial electron acceptor for NADPH-methemoglobin reductase)."
  },
  {
    id: 46,
    question: "The growth factor that stimulates neutrophil production is:",
    questionAr: "عامل النمو الخلوي الذي يحفز إنتاج الخلايا المتعادلة (Neutrophils) هو:",
    options: [
      { key: "A", text: "G-CSF", textAr: "G-CSF (عامل تحفيز مستعمرات الخلايا المحببة)" },
      { key: "B", text: "Insulin", textAr: "الأنسولين" },
      { key: "C", text: "TPO", textAr: "ترومبوبويتين" },
      { key: "D", text: "EPO", textAr: "إريثروبويتين" }
    ],
    correctAnswer: "A",
    category: "Leukocytes & Immunology",
    explanation: "Granulocyte colony-stimulating factor (G-CSF, filgrastim) is the principal cytokine regulating neutrophil proliferation, differentiation, and survival in the bone marrow, as well as mobilizing hematopoietic progenitor cells into peripheral blood.",
    explanationAr: "عامل تحفيز مستعمرات الخلايا الحبيبية (G-CSF) هو السيتوكين الأساسي لتحفيز نضج العدلات وإطلاقها من النخاع، ويستخدم دوائياً لعلاج قلة العدلات.",
    pearl: "Recombinant G-CSF (Filgrastim/Pegfilgrastim) is standard prophylaxis and therapy for chemotherapy-induced febrile neutropenia."
  },
  {
    id: 47,
    question: "The main site of haemopoiesis in adults is:",
    questionAr: "الموقع الرئيسي لتكوين خلايا الدم (Haemopoiesis) لدى البالغين هو:",
    options: [
      { key: "A", text: "Bone marrow", textAr: "نخاع العظم (النقي الأحمر)" },
      { key: "B", text: "Spleen", textAr: "الطحال" },
      { key: "C", text: "Liver", textAr: "الكبد" },
      { key: "D", text: "Thyroid gland", textAr: "الغدة الدرقية" }
    ],
    correctAnswer: "A",
    category: "RBC Physiology & Metabolism",
    explanation: "In normal adults, hematopoiesis is restricted almost entirely to the red bone marrow of the axial skeleton (pelvis, vertebrae, sternum, ribs, cranium, and proximal ends of femurs and humeri). In disease (e.g., myelofibrosis), the spleen and liver can resume extramedullary hematopoiesis.",
    explanationAr: "يحدث توليد الدم في البالغين الطبيعيين حصراً داخل النخاع العظمي الأحمر، وتحديداً في عظام الهيكل المحوري مثل الحوض والفقرات والقص.",
    pearl: "The posterior superior iliac crest (pelvis) is the safest and most standard site for adult bone marrow aspiration and biopsy."
  },
  {
    id: 48,
    question: "Each haemoglobin molecule can carry how many oxygen molecules?",
    questionAr: "كم جزيء أكسجين يستطيع جزيء الهيموجلوبين الواحد حمله كحد أقصى؟",
    options: [
      { key: "A", text: "Three", textAr: "ثلاثة جزيئات" },
      { key: "B", text: "Four", textAr: "أربعة جزيئات (Four molecules)" },
      { key: "C", text: "Six", textAr: "ستة جزيئات" },
      { key: "D", text: "Two", textAr: "جزيئان" }
    ],
    correctAnswer: "B",
    category: "RBC Physiology & Metabolism",
    explanation: "A hemoglobin molecule is a globular tetramer consisting of 4 globin polypeptide chains. Each subunit contains one heme prosthetic group with one central Fe2+ atom that binds one molecule of O2. Therefore, fully saturated hemoglobin carries 4 molecules of O2 (8 oxygen atoms).",
    explanationAr: "يتألف جزيء الهيموجلوبين من أربع سلاسل ببتيدية، تحتوي كل واحدة منها على حلقة هيم مع ذرة حديد، مما يمكن الجزيء الكامل من حمل 4 جزيئات أكسجين.",
    pearl: "Oxygen binding exhibits positive cooperativity: binding of the first O2 molecule facilitates binding of subsequent O2 molecules (sigmoidal binding curve)."
  },
  {
    id: 49,
    question: "Vitamin B12 is mainly stored in the:",
    questionAr: "يتم تخزين معظم احتياطي فيتامين B12 في جسم الإنسان داخل:",
    options: [
      { key: "A", text: "Spleen", textAr: "الطحال" },
      { key: "B", text: "Thyroid gland", textAr: "الغدة الدرقية" },
      { key: "C", text: "Kidney", textAr: "الكليتين" },
      { key: "D", text: "Liver", textAr: "الكبد (Liver)" }
    ],
    correctAnswer: "D",
    category: "Anaemia & Nutritional Disorders",
    explanation: "The human liver maintains massive reserves of vitamin B12 (approx. 2 to 5 mg), which is sufficient to satisfy the body's metabolic requirements for 3 to 5 years even in the total absence of dietary intake. In contrast, body folate stores last only 3 to 4 months.",
    explanationAr: "يخزن الكبد كميات هائلة من فيتامين B12 تكفي احتياجات الجسم لمدة 3 إلى 5 سنوات، مقارنة بمخزون حمض الفوليك الذي ينفد خلال أشهر قليلة.",
    pearl: "Clinical onset of B12 deficiency is very slow (years) after dietary cessation or malabsorption, whereas folate deficiency develops in weeks to months."
  },
  {
    id: 50,
    question: "Hypersegmented neutrophils are a sign of:",
    questionAr: "تعتبر العدلات مفرطة التفصص (Hypersegmented neutrophils) علامة مميزة لـ:",
    options: [
      { key: "A", text: "Sickle cell anaemia", textAr: "فقر الدم المنجلي" },
      { key: "B", text: "Vitamin B12 or folate deficiency", textAr: "عوز فيتامين B12 أو عوز حمض الفوليك (أنيميا الأرومات الكبيرة)" },
      { key: "C", text: "Iron deficiency", textAr: "عوز الحديد" },
      { key: "D", text: "Beta-thalassaemia trait", textAr: "سمة الثلاسيميا بيتا" }
    ],
    correctAnswer: "B",
    category: "Anaemia & Nutritional Disorders",
    explanation: "A neutrophil is hypersegmented when it possesses 6 or more nuclear lobes (or >5% of neutrophils with 5 lobes). This nuclear maturation defect is an early, highly specific hallmark of megaloblastic anaemia caused by impaired DNA synthesis due to vitamin B12 or folate deficiency.",
    explanationAr: "تعتبر العدلات التي تحتوي على 5 أو 6 فصوص نووية فأكثر علامة باكرة وشديدة النوعية لفقر الدم ضخم الأرومات (Megaloblastic anemia) الناجم عن نقص B12 أو الفولات.",
    pearl: "Rule of thumb: Even a single neutrophil with 6 lobes on a blood film is suspicious for megaloblastic anemia."
  },
  {
    id: 51,
    question: "In macrocytic anaemia, the MCV is:",
    questionAr: "في فقر الدم كبير الكريات (Macrocytic anaemia)، يكون حجم الكرية الوسطي (MCV):",
    options: [
      { key: "A", text: "Less than 50 fL", textAr: "أقل من 50 فيمتولتر" },
      { key: "B", text: "Between 85 and 95 fL", textAr: "بين 85 و 95 فيمتولتر" },
      { key: "C", text: "Less than 80 fL", textAr: "أقل من 80 فيمتولتر" },
      { key: "D", text: "Greater than 100 fL", textAr: "أكبر من 100 فيمتولتر (MCV > 100 fL)" }
    ],
    correctAnswer: "D",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Mean Corpuscular Volume (MCV) quantifies average erythrocyte size. Microcytic anemia has MCV < 80 fL, normocytic anemia has MCV 80–100 fL, and macrocytic anemia has MCV > 100 fL.",
    explanationAr: "يُعرّف فقر الدم كبير الكريات بارتفاع متوسط حجم الكرية الحمراء (MCV) ليتجاوز 100 فيمتولتر (fL).",
    pearl: "Common causes of macrocytosis: Megaloblastic (B12/folate deficiency) vs Non-megaloblastic (alcohol, liver disease, reticulocytosis, hypothyroidism, myelodysplasia)."
  },
  {
    id: 52,
    question: "The most abundant protein in plasma is:",
    questionAr: "البروتين الأكثر وفرة في بلازما الدم هو:",
    options: [
      { key: "A", text: "Albumin", textAr: "الألبومين (Albumin)" },
      { key: "B", text: "Interferon", textAr: "إنترفيرون" },
      { key: "C", text: "Haemoglobin", textAr: "هيموجلوبين" },
      { key: "D", text: "Fibrinogen", textAr: "فايبرينوجين" }
    ],
    correctAnswer: "A",
    category: "RBC Physiology & Metabolism",
    explanation: "Albumin comprises about 55–60% of total plasma protein (normal concentration 3.5–5.0 g/dL). Synthesized solely by hepatocytes, it generates ~80% of plasma colloid oncotic pressure and serves as a major carrier for hormones, drugs, bilirubin, and fatty acids.",
    explanationAr: "الألبومين يمثل أكثر من نصف بروتينات البلازما (حوالي 60%)، ويلعب الدور الأساسي في توليد الضغط الأسموزي الغروي لمنع خروج السوائل إلى الأنسجة.",
    pearl: "Normal plasma protein distribution: Albumin (~60%), Globulins (~35%), Fibrinogen (~4%)."
  },
  {
    id: 53,
    question: "Adult haemoglobin (HbA) consists of:",
    questionAr: "يتكون الهيموجلوبين البالغ الطبيعي الرئيسي (HbA) من سلاسل:",
    options: [
      { key: "A", text: "α₂β₂", textAr: "α₂β₂ (سلسلتين ألفا وسلسلتين بيتا)" },
      { key: "B", text: "β₄", textAr: "β₄" },
      { key: "C", text: "α₂δ₂", textAr: "α₂δ₂" },
      { key: "D", text: "α₂γ₂", textAr: "α₂γ₂" }
    ],
    correctAnswer: "A",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Normal adult blood contains primarily HbA (alpha2-beta2), which accounts for 95–98% of total hemoglobin. HbA2 (alpha2-delta2) constitutes 1.5–3.5%, and HbF (alpha2-gamma2) constitutes <1%.",
    explanationAr: "الهيموجلوبين الطبيعي في البالغين (HbA) يتكون من زوج سلاسل ألفا وزوج سلاسل بيتا (α₂β₂)، ويمثل ما يزيد عن 95% من الهيموجلوبين الكلي.",
    pearl: "Alpha genes are located on chromosome 16 (4 alleles total); Beta, Gamma, and Delta genes are on chromosome 11 (2 alleles each)."
  },
  {
    id: 54,
    question: "Plasma makes up approximately what percentage of total blood volume?",
    questionAr: "تشكل بلازما الدم تقريباً ما نسبته من إجمالي حجم الدم:",
    options: [
      { key: "A", text: "10%", textAr: "10%" },
      { key: "B", text: "90%", textAr: "90%" },
      { key: "C", text: "55%", textAr: "55% (حوالي 55%)" },
      { key: "D", text: "25%", textAr: "25%" }
    ],
    correctAnswer: "C",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Whole blood comprises cellular elements (~45%, mostly erythrocytes with <1% leukocytes and platelets in the buffy coat) and liquid extracellular matrix called plasma (~55%). Plasma is roughly 90–92% water, 7% proteins, and 1% electrolytes/solutes.",
    explanationAr: "تشكل البلازما السائلة نحو 55% من حجم الدم الكلي، بينما تشغل العناصر الخلوية (الكريات الحمراء والبيضاء والصفائح) النسبة المتبقية البالغة 45%.",
    pearl: "Centrifuged anticoagulated blood separates into: Plasma (top 55%), Buffy coat (WBCs/platelets <1%), Packed Red Cells (bottom 45%)."
  },
  {
    id: 55,
    question: "Heme is composed of protoporphyrin combined with:",
    questionAr: "يتكون الهيم (Heme) من حلقة بروتوبورفيرين متحدة مع ذرة:",
    options: [
      { key: "A", text: "Iron", textAr: "الحديد (Iron / Fe)" },
      { key: "B", text: "Zinc", textAr: "الزنك" },
      { key: "C", text: "Cobalt", textAr: "الكوبالت" },
      { key: "D", text: "Copper", textAr: "النحاس" }
    ],
    correctAnswer: "A",
    category: "RBC Physiology & Metabolism",
    explanation: "Heme (ferroprotoporphyrin IX) is synthesized by the insertion of a ferrous iron (Fe2+) ion into the center of the planar organic ring protoporphyrin IX. This final step is catalyzed by the mitochondrial enzyme ferrochelatase.",
    explanationAr: "الهيم هو معقد مكون من حلقة بروتوبورفيرين IX متحدة مع ذرة حديد مركزية في الحالة الثنائية بواسطة إنزيم الفيروكلاتيز.",
    pearl: "In lead poisoning, ferrochelatase and ALAD are inhibited; zinc replaces iron, generating zinc protoporphyrin (ZPP)."
  },
  {
    id: 56,
    question: "The test that measures the body's iron stores is:",
    questionAr: "الفحص المخبري الأفضل الذي يعكس مخزون الحديد في الجسم هو:",
    options: [
      { key: "A", text: "White cell count", textAr: "تعداد الكريات البيضاء" },
      { key: "B", text: "Serum sodium", textAr: "صوديوم المصل" },
      { key: "C", text: "Prothrombin time", textAr: "زمن البروثرومبين" },
      { key: "D", text: "Serum ferritin", textAr: "فيريتين المصل (Serum ferritin)" }
    ],
    correctAnswer: "D",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Serum ferritin is the primary intracellular iron storage protein. Minute quantities circulate in serum in direct equilibrium with total reticuloendothelial body iron stores. A serum ferritin < 30 ug/L is the single most specific lab indicator of total body iron depletion.",
    explanationAr: "فيريتين المصل (Ferritin) هو البروتين الحامل للحديد التخزيني في الخلايا ويعكس بدقة إجمالي مخزون الحديد في الجسم.",
    pearl: "Ferritin is also an acute phase reactant; in active systemic inflammation, a ferritin of <100 ug/L may still indicate underlying iron deficiency."
  },
  {
    id: 57,
    question: "The most common cause of anaemia worldwide is:",
    questionAr: "السبب الأكثر شيوعاً لفقر الدم على مستوى العالم هو:",
    options: [
      { key: "A", text: "Acute myeloid leukaemia", textAr: "ابيضاض الدم النقوي الحاد" },
      { key: "B", text: "Thalassaemia major", textAr: "الثلاسيميا الكبرى" },
      { key: "C", text: "Vitamin C deficiency", textAr: "عوز فيتامين C" },
      { key: "D", text: "Iron deficiency", textAr: "عوز الحديد (Iron deficiency)" }
    ],
    correctAnswer: "D",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Iron deficiency anaemia (IDA) affects over 1.2 to 2 billion people globally, making it the most prevalent nutritional disorder and the leading cause of anaemia worldwide. Etiologies include chronic blood loss (menorrhagia, GI bleeding, hookworm) and inadequate dietary intake/increased demand.",
    explanationAr: "يعتبر نقص الحديد (Iron deficiency) السبب الأكثر انتشاراً لفقر الدم عالمياً، ويؤثر على ما يزيد عن ربع سكان الأرض خصوصاً النساء والأطفال.",
    pearl: "In adult men and postmenopausal women, new iron deficiency anaemia must be presumed secondary to gastrointestinal malignancy until proven otherwise."
  },
  {
    id: 58,
    question: "A fall in pH reduces haemoglobin's affinity for oxygen; this is known as:",
    questionAr: "انخفاض درجة الحموضة (pH) يقلل من انجذاب الهيموجلوبين للأكسجين؛ وتعرف هذه الظاهرة بـ:",
    options: [
      { key: "A", text: "The Bohr effect", textAr: "تأثير بوهر (The Bohr effect)" },
      { key: "B", text: "The Wilson effect", textAr: "تأثير ويلسون" },
      { key: "C", text: "The Cushing effect", textAr: "تأثير كوشينغ" },
      { key: "D", text: "The Hample effect", textAr: "تأثير هامبل" }
    ],
    correctAnswer: "A",
    category: "RBC Physiology & Metabolism",
    explanation: "The Bohr effect, described by Christian Bohr in 1904, states that an increase in proton concentration (lower pH/acidosis) or increased pCO2 binds to specific amino acid residues on deoxyhemoglobin, stabilizing salt bridges of the T-state and decreasing oxygen affinity, thus facilitating O2 release in metabolically active acidic tissues.",
    explanationAr: "تأثير بوهر (Bohr effect) يصف انخفاض ألفة الهيموجلوبين للأكسجين عند زيادة الحموضة (انخفاض pH) أو زيادة CO2، مما يسرع وصول الأكسجين للأنسجة العضلية النشطة.",
    pearl: "Bohr effect = pH and CO2 affect hemoglobin's O2 affinity. Haldane effect = Oxygenation of Hb affects its CO2 binding capacity."
  },
  {
    id: 59,
    question: "Normal HbA2 in adults is approximately:",
    questionAr: "النسبة الطبيعية لهيموجلوبين HbA2 في البالغين هي حوالي:",
    options: [
      { key: "A", text: "2 to 3.5%", textAr: "2% إلى 3.5% (أقل من 3.5%)" },
      { key: "B", text: "50%", textAr: "50%" },
      { key: "C", text: "10 to 15%", textAr: "10% إلى 15%" },
      { key: "D", text: "25%", textAr: "25%" }
    ],
    correctAnswer: "A",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "In normal healthy adults, minor hemoglobin fraction HbA2 (alpha2-delta2) constitutes approximately 1.5% to 3.5% of total circulating hemoglobin. Levels exceeding 3.5% (commonly 4–6%) strongly point toward beta-thalassaemia trait.",
    explanationAr: "يتواجد هيموجلوبين HbA2 بنسبة ضئيلة طبيعية تتراوح بين 1.5% إلى 3.5% في دم البالغين الأصحاء.",
    pearl: "HbA2 > 3.5% indicates beta-thalassaemia trait. In alpha-thalassaemia trait, HbA2 is normal or slightly decreased."
  },
  {
    id: 60,
    question: "Hb Bart's (γ₄) is seen in:",
    questionAr: "يظهر هيموجلوبين بارت (Hb Bart's - γ₄) في حالات:",
    options: [
      { key: "A", text: "Beta-thalassaemia trait", textAr: "سمة الثلاسيميا بيتا" },
      { key: "B", text: "Severe alpha-thalassaemia (deletion of all four alpha genes)", textAr: "الثلاسيميا ألفا الشديدة (حذف جينات ألفا الأربعة / استسقاء الجنين)" },
      { key: "C", text: "Sickle cell anaemia", textAr: "فقر الدم المنجلي" },
      { key: "D", text: "Leukaemia", textAr: "ابيضاض الدم" }
    ],
    correctAnswer: "B",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Hemoglobin Bart's is a tetramer of four gamma chains (gamma4). It forms during fetal development when alpha-globin chains are completely absent due to deletion of all four alpha-globin genes (--/--), causing Hemoglobin Bart's Hydrops Fetalis syndrome. Because gamma4 has an extremely high oxygen affinity and does not release O2 to tissues, it causes lethal fetal hypoxia, severe hydrops, and intrauterine death or stillbirth.",
    explanationAr: "هيموجلوبين بارت (γ₄) ينتج عن غياب كامل لسلاسل ألفا في متلازمة استسقاء الجنين (Hydrops fetalis) بسبب حذف أليلات ألفا الأربعة، وهو عاجز عن تحرير الأكسجين للأنسجة.",
    pearl: "Alpha-thalassaemia deletion spectrum: 1 gene = silent carrier, 2 genes = trait (microcytosis), 3 genes = HbH disease (beta4), 4 genes = Hb Bart's hydrops fetalis (gamma4)."
  },
  {
    id: 61,
    question: "Erythropoietin mainly stimulates:",
    questionAr: "يحفز هرمون الإريثروبويتين (EPO) بشكل رئيسي:",
    options: [
      { key: "A", text: "Lymphocyte production", textAr: "إنتاج الخلايا الليمفاوية" },
      { key: "B", text: "Red blood cell production", textAr: "إنتاج كريات الدم الحمراء (Erythropoiesis)" },
      { key: "C", text: "Iron absorption", textAr: "امتصاص الحديد" },
      { key: "D", text: "Platelet production", textAr: "إنتاج الصفائح الدموية" }
    ],
    correctAnswer: "B",
    category: "RBC Physiology & Metabolism",
    explanation: "Erythropoietin (EPO) binds to EPO receptors on CFU-E (Colony-Forming Unit-Erythroid) and proerythroblasts in the bone marrow, inhibiting apoptosis, promoting proliferation, and accelerating their maturation into reticulocytes and mature erythrocytes.",
    explanationAr: "يرتبط هرمون الإريثروبويتين بمستقبلاته على أرومات الحمر في نخاع العظم، مانعاً موتها الخلوي ومحفزاً تكاثرها لإنتاج كريات دم حمراء جديدة.",
    pearl: "The main stimulus for EPO secretion is tissue hypoxia in the renal cortex."
  },
  {
    id: 62,
    question: "Anaemia is defined as a reduction in:",
    questionAr: "يُعرّف فقر الدم (Anaemia) بأنه انخفاض في:",
    options: [
      { key: "A", text: "Plasma volume", textAr: "حجم بلازما الدم" },
      { key: "B", text: "Haemoglobin below the normal range for age and sex", textAr: "تركيز الهيموجلوبين تحت المعدل الطبيعي بالنسبة للعمر والجنس" },
      { key: "C", text: "Platelet count", textAr: "تعداد الصفائح الدموية" },
      { key: "D", text: "White cell count", textAr: "تعداد كريات الدم البيضاء" }
    ],
    correctAnswer: "B",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Anaemia is clinically defined by the World Health Organization (WHO) as a reduction in circulating hemoglobin concentration (or red cell mass) below normal reference intervals for the patient's age, biological sex, and physiological state (e.g., adult males <13.0 g/dL, non-pregnant females <12.0 g/dL).",
    explanationAr: "يُعرّف فقر الدم سريرياً بانخفاض تركيز الهيموجلوبين أو كتلة الكريات الحمراء عن المعدلات الطبيعية المحددة لنفس العمر والجنس والحالة الفسيولوجية.",
    pearl: "WHO thresholds: Men < 13.0 g/dL, Women < 12.0 g/dL, Pregnant women < 11.0 g/dL."
  },
  {
    id: 63,
    question: "HbH consists of:",
    questionAr: "يتكون هيموجلوبين H (HbH) من رباعي لسلاسل:",
    options: [
      { key: "A", text: "δ₂γ₂", textAr: "δ₂γ₂" },
      { key: "B", text: "γ₄ only", textAr: "γ₄ فقط" },
      { key: "C", text: "α₂β₂", textAr: "α₂β₂" },
      { key: "D", text: "β₄", textAr: "β₄ (أربع سلاسل بيتا)" }
    ],
    correctAnswer: "D",
    category: "Haemoglobinopathies & Thalassaemia",
    explanation: "Hemoglobin H (HbH) is a homotetramer formed exclusively of four beta-globin chains (beta4). It occurs in alpha-thalassaemia when 3 of the 4 alpha-globin genes are deleted (--/-alpha), creating a severe relative deficit of alpha chains so that excess beta chains polymerize into beta4.",
    explanationAr: "يتكون هيموجلوبين H من تجمّع 4 سلاسل بيتا معاً (β₄) نتيجة غياب 3 جينات من سلاسل ألفا الأربعة، وهو هيموجلوبين غير مستقر يترسب كأجسام إنكلوجن (Golf-ball appearance).",
    pearl: "Brilliant cresyl blue staining shows characteristic 'golf ball' inclusions in RBCs of HbH disease."
  },
  {
    id: 64,
    question: "The most common childhood leukaemia is:",
    questionAr: "أكثر أنواع ابيضاض الدم شيوعاً عند الأطفال هو:",
    options: [
      { key: "A", text: "Chronic lymphocytic leukaemia", textAr: "ابيضاض الدم الليمفاوي المزمن" },
      { key: "B", text: "Acute myeloid leukaemia M3", textAr: "ابيضاض الدم النقوي الحاد M3" },
      { key: "C", text: "Acute lymphoblastic leukaemia (ALL)", textAr: "ابيضاض الدم الليمفاوي الحاد (ALL)" },
      { key: "D", text: "Chronic myeloid leukaemia", textAr: "ابيضاض الدم النقوي المزمن" }
    ],
    correctAnswer: "C",
    category: "Leukaemia & Myeloproliferative Disorders",
    explanation: "Acute Lymphoblastic Leukaemia (ALL) accounts for roughly 75–80% of all pediatric leukaemias and is the single most common malignant neoplasm in children, with a peak incidence between ages 2 and 5 years. With modern chemotherapy protocols, the cure rate in children now exceeds 90%.",
    explanationAr: "ابيضاض الدم الليمفاوي الحاد (ALL) هو أكثر سرطانات الأطفال شيوعاً على الإطلاق (يمثل نحو 80% من لوكيميا الأطفال)، وتصل نسبة الشفاء منه حالياً لأكثر من 90%.",
    pearl: "ALL is predominantly of B-cell precursor origin (B-ALL, CD10/CD19/TdT positive); peak age 2-5 years."
  },
  {
    id: 65,
    question: "Platelets are produced from:",
    questionAr: "تنشأ الصفائح الدموية من تفتت سيتوبلازم خلايا:",
    options: [
      { key: "A", text: "Adipocytes", textAr: "الخلايا الدهنية" },
      { key: "B", text: "Mature red blood cells", textAr: "كريات الدم الحمراء الناضجة" },
      { key: "C", text: "Megakaryocytes in the bone marrow", textAr: "الخلايا النواء (Megakaryocytes) في نخاع العظم" },
      { key: "D", text: "Lymphocytes", textAr: "الخلايا الليمفاوية" }
    ],
    correctAnswer: "C",
    category: "Haemostasis, Platelets & Coagulation",
    explanation: "Platelets are anucleate discoid cell fragments shed from polyploid megakaryocytes in the bone marrow. Megakaryocytes extend proplatelet cytoplasmic processes into marrow sinusoids, and shear stress from the bloodstream shears them into functional circulating platelets (each megakaryocyte yields 1,000–3,000 platelets).",
    explanationAr: "الصفائح ليست خلايا كاملة بل شظايا سيتوبلازمية عديمة النواة تتبرعم وتنفصل من خلايا النواء الضخمة (Megakaryocytes) في نخاع العظم.",
    pearl: "Megakaryocytes are the largest cells in the bone marrow and undergo endomitosis, becoming polyploid (up to 64N)."
  },
  {
    id: 66,
    question: "Chronic lymphocytic leukaemia (CLL) most commonly affects:",
    questionAr: "يصيب ابيضاض الدم الليمفاوي المزمن (CLL) بشكل أكثر شيوعاً فئة:",
    options: [
      { key: "A", text: "Infants", textAr: "الرضع" },
      { key: "B", text: "Adolescents", textAr: "المراهقين" },
      { key: "C", text: "Older adults", textAr: "كبار السن (فوق 65 عاماً)" },
      { key: "D", text: "Pregnant women", textAr: "النساء الحوامل" }
    ],
    correctAnswer: "C",
    category: "Leukaemia & Myeloproliferative Disorders",
    explanation: "Chronic Lymphocytic Leukaemia (CLL) is the most common leukaemia in Western adults, with a median age at diagnosis of 70–72 years. It is extremely rare in individuals under age 40 and virtually never observed in children.",
    explanationAr: "لوكيميا الدم اللمفاوية المزمنة (CLL) هي أكثر أنواع اللوكيميا شيوعاً عند البالغين وكبار السن، حيث يبلغ متوسط عمر التشخيص نحو 70 عاماً.",
    pearl: "Blood film hallmark of CLL: Abundant mature-looking small lymphocytes accompanied by fragile, disrupted 'smudge cells' (Gumprecht shadows)."
  },
  {
    id: 67,
    question: "The key test for immune haemolytic anaemia is:",
    questionAr: "الفحص المخبري الأساسي لتشخيص فقر الدم الانحلالي المناعي الذاتي هو:",
    options: [
      { key: "A", text: "Erythrocyte sedimentation rate", textAr: "معدل سرعة ترسب الدم (ESR)" },
      { key: "B", text: "Direct Coombs test", textAr: "اختبار كومبس المباشر (Direct Antiglobulin Test / DAT)" },
      { key: "C", text: "Serum iron", textAr: "حديد المصل" },
      { key: "D", text: "Serum ferritin", textAr: "فيريتين المصل" }
    ],
    correctAnswer: "B",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "The Direct Antiglobulin Test (DAT), also known as the Direct Coombs test, detects antibodies (IgG) or complement components (C3d) bound in vivo directly onto the surface of circulating patient red blood cells. A positive DAT confirms an immune etiology for hemolysis (Autoimmune Hemolytic Anemia, AIHA).",
    explanationAr: "اختبار كومبس المباشر (Direct Coombs / DAT) يكشف عن وجود الأجسام المضادة (IgG) أو المتممة المرتبطة مباشرة بسطح كريات الدم الحمراء، مؤكداً السبب المناعي للانحلال.",
    pearl: "Direct Coombs detects antibodies already bound to patient's RBCs; Indirect Coombs detects unbound antibodies in patient's serum."
  },
  {
    id: 68,
    question: "Leukaemia is:",
    questionAr: "يُعرّف ابيضاض الدم (Leukaemia) بأنه:",
    options: [
      { key: "A", text: "Inflammation of the liver", textAr: "التهاب في أنسجة الكبد" },
      { key: "B", text: "A benign tumour of lymph nodes", textAr: "ورم حميد في العقد الليمفاوية" },
      { key: "C", text: "A malignancy of blood-forming cells in the bone marrow", textAr: "مرض خبيث (سرطاني) يصيب الخلايا المكونة للدم في نخاع العظم" },
      { key: "D", text: "Iron deficiency", textAr: "عوز في عنصر الحديد" }
    ],
    correctAnswer: "C",
    category: "Leukaemia & Myeloproliferative Disorders",
    explanation: "Leukaemia is a broad term for malignant hematopoietic neoplasms arising from the neoplastic transformation of pluripotent stem cells or progenitor cells in the bone marrow. Clonal neoplastic cells proliferate and accumulate, crowding out normal erythroid, myeloid, and megakaryocytic lineages.",
    explanationAr: "ابيضاض الدم هو تكاثر سرطاني خبيث غير منضبط للخلايا المكونة للدم في النخاع العظمي، يؤدي إلى استبدال النسيج المولد الطبيعي بالخلايا الورمية.",
    pearl: "Broadly classified into Acute (rapid proliferation of immature blasts) vs Chronic (accumulation of mature/differentiated cells), and Myeloid vs Lymphoid."
  },
  {
    id: 69,
    question: "Hydroxyurea is a drug that can cause:",
    questionAr: "عقار هيدروكسي يوريا (Hydroxyurea) هو دواء يمكن أن يسبب:",
    options: [
      { key: "A", text: "Red cell lysis", textAr: "انحلال وتكسر الكريات الحمراء" },
      { key: "B", text: "Iron overload", textAr: "فرط تراكم الحديد" },
      { key: "C", text: "Macrocytosis (large red cells)", textAr: "كبر حجم الكريات الحمراء (Macrocytosis / ارتفاع MCV)" },
      { key: "D", text: "Microcytosis", textAr: "صغر حجم الكريات الحمراء" }
    ],
    correctAnswer: "C",
    category: "Anaemia & Nutritional Disorders",
    explanation: "Hydroxyurea (hydroxycarbamide) is a ribonucleotide reductase inhibitor used in sickle cell disease (to augment protective fetal hemoglobin HbF) and myeloproliferative disorders. By impairing DNA synthesis without affecting protein/RNA synthesis, it regularly causes benign, marked macrocytosis (MCV often > 105–115 fL).",
    explanationAr: "عقار هيدروكسي يوريا يثبط تخليق الحمض النووي DNA، مما يؤدي كعرض جانبي مألوف إلى كبر حجم كريات الدم الحمراء (Macrocytosis)، ويُستخدم لزيادة نسبة HbF في فقر الدم المنجلي.",
    pearl: "In sickle cell patients, an increasing MCV on hydroxyurea is a reliable surrogate biomarker of patient medication adherence."
  },
  {
    id: 70,
    question: "Blood consists of two main components:",
    questionAr: "يتكون الدم بشكل رئيسي من مكونين أساسيين هما:",
    options: [
      { key: "A", text: "Plasma and cells", textAr: "البلازما السائلة والخلايا المعلقة (Plasma and cells)" },
      { key: "B", text: "Fats and proteins only", textAr: "الدهون والبروتينات فقط" },
      { key: "C", text: "Water and salts only", textAr: "الماء والأملاح فقط" },
      { key: "D", text: "Haemoglobin and iron", textAr: "الهيموجلوبين والحديد" }
    ],
    correctAnswer: "A",
    category: "Laboratory Medicine & Diagnostics",
    explanation: "Blood is a specialized liquid connective tissue consisting of two primary components: a fluid extracellular matrix called plasma (approx. 55% by volume) and formed cellular elements (approx. 45% by volume), which include erythrocytes (RBCs), leukocytes (WBCs), and thrombocytes (platelets).",
    explanationAr: "الدم نسيج ضام سائل يتألف رئيسياً من وسط سائل وهو البلازما (نحو 55%)، وخلايا معلقة (نحو 45%) تشمل الكريات الحمراء والبيضاء والصفائح الدموية.",
    pearl: "Plasma minus clotting factors (fibrinogen, prothrombin, factors V and VIII) equals Serum."
  }
];
