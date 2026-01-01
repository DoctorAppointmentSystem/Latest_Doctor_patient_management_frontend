/**
 * Comprehensive Urdu Medical Dictionary for Eye Care Prescriptions
 * This utility translates English medical prescription text to Urdu
 * Designed specifically for ophthalmology/eye care prescriptions
 */

// ==================== URDU NUMBER DICTIONARY ====================
const urduNumbers = {
    "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴",
    "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹",
    // Word form
    "one": "ایک", "two": "دو", "three": "تین", "four": "چار", "five": "پانچ",
    "six": "چھ", "seven": "سات", "eight": "آٹھ", "nine": "نو", "ten": "دس",
    "eleven": "گیارہ", "twelve": "بارہ", "fifteen": "پندرہ", "twenty": "بیس",
    "thirty": "تیس", "forty": "چالیس", "fifty": "پچاس", "hundred": "سو",
};

// Convert Arabic numerals to Urdu numerals
export const toUrduNumbers = (str) => {
    if (!str) return str;
    return str.toString().replace(/[0-9]/g, (match) => urduNumbers[match] || match);
};

// ==================== DOSAGE FORMS ====================
const dosageForms = {
    // Drops
    "drop": "قطرہ",
    "drops": "قطرے",
    "eye drop": "آنکھ کا قطرہ",
    "eye drops": "آنکھ کے قطرے",
    "ear drop": "کان کا قطرہ",
    "ear drops": "کان کے قطرے",

    // Tablets & Pills
    "tablet": "گولی",
    "tablets": "گولیاں",
    "tab": "گولی",
    "pill": "گولی",
    "pills": "گولیاں",

    // Capsules
    "capsule": "کیپسول",
    "capsules": "کیپسولز",
    "cap": "کیپسول",

    // Liquids
    "syrup": "شربت",
    "suspension": "معلق دوا",
    "solution": "محلول",
    "liquid": "مائع دوا",

    // Ointments & Creams
    "ointment": "مرہم",
    "eye ointment": "آنکھ کا مرہم",
    "cream": "کریم",
    "gel": "جیل",
    "lotion": "لوشن",

    // Injections
    "injection": "انجکشن",
    "inj": "انجکشن",

    // Others
    "spray": "سپرے",
    "inhaler": "سانس کی دوا",
    "powder": "پاؤڈر",
};

// ==================== QUANTITY/DOSAGE ====================
const quantities = {
    // Drop quantities
    "1 drop": "ایک قطرہ",
    "2 drops": "دو قطرے",
    "3 drops": "تین قطرے",
    "4 drops": "چار قطرے",
    "5 drops": "پانچ قطرے",
    "one drop": "ایک قطرہ",
    "two drops": "دو قطرے",

    // Tablet quantities
    "1 tablet": "ایک گولی",
    "2 tablets": "دو گولیاں",
    "half tablet": "آدھی گولی",
    "1/2 tablet": "آدھی گولی",

    // General
    "once": "ایک بار",
    "twice": "دو بار",
    "thrice": "تین بار",
};

// ==================== FREQUENCY ====================
const frequency = {
    // Times per day - NUMERIC VARIATIONS (must be first for matching priority)
    "1 time a day": "دن میں ایک بار",
    "1 time daily": "دن میں ایک بار",
    "2 times a day": "دن میں دو بار",
    "2 times daily": "دن میں دو بار",
    "3 times a day": "دن میں تین بار",
    "3 times daily": "دن میں تین بار",
    "4 times a day": "دن میں چار بار",
    "4 times daily": "دن میں چار بار",
    "5 times a day": "دن میں پانچ بار",
    "5 times daily": "دن میں پانچ بار",
    "6 times a day": "دن میں چھ بار",
    "6 times daily": "دن میں چھ بار",

    // Times per day - WORD VARIATIONS
    "once daily": "دن میں ایک بار",
    "once a day": "دن میں ایک بار",
    "od": "دن میں ایک بار",
    "OD": "دائیں آنکھ",

    "twice daily": "دن میں دو بار",
    "twice a day": "دن میں دو بار",
    "bd": "دن میں دو بار",
    "bid": "دن میں دو بار",

    "three times daily": "دن میں تین بار",
    "three times a day": "دن میں تین بار",
    "thrice daily": "دن میں تین بار",
    "thrice a day": "دن میں تین بار",
    "tds": "دن میں تین بار",
    "tid": "دن میں تین بار",

    "four times daily": "دن میں چار بار",
    "four times a day": "دن میں چار بار",
    "qid": "دن میں چار بار",

    "five times daily": "دن میں پانچ بار",
    "five times a day": "دن میں پانچ بار",
    "six times daily": "دن میں چھ بار",
    "six times a day": "دن میں چھ بار",

    // Generic patterns (fallback)
    "times a day": "بار روزانہ",
    "times daily": "بار روزانہ",
    "a day": "روزانہ",

    // Hourly
    "every hour": "ہر گھنٹے",
    "every 1 hour": "ہر گھنٹے",
    "every 2 hours": "ہر دو گھنٹے بعد",
    "every 3 hours": "ہر تین گھنٹے بعد",
    "every 4 hours": "ہر چار گھنٹے بعد",
    "every 6 hours": "ہر چھ گھنٹے بعد",
    "every 8 hours": "ہر آٹھ گھنٹے بعد",
    "every 12 hours": "ہر بارہ گھنٹے بعد",

    "hourly": "ہر گھنٹے",
    "2 hourly": "ہر دو گھنٹے",
    "4 hourly": "ہر چار گھنٹے",
    "6 hourly": "ہر چھ گھنٹے",
    "8 hourly": "ہر آٹھ گھنٹے",

    // Weekly
    "once weekly": "ہفتے میں ایک بار",
    "twice weekly": "ہفتے میں دو بار",
    "weekly": "ہفتہ وار",

    // Special timing
    "as needed": "ضرورت کے مطابق",
    "when required": "جب ضرورت ہو",
    "prn": "ضرورت کے مطابق",
    "sos": "ضرورت کے مطابق",
    "stat": "فوری طور پر",
};

// ==================== TIMING ====================
// ==================== TIMING ====================
const timing = {
    // Meal related
    "before meals": "کھانے سے پہلے",
    "after meals": "کھانے کے بعد",
    "with meals": "کھانے کے ساتھ",
    "before food": "کھانے سے پہلے",
    "after food": "کھانے کے بعد",
    "with food": "کھانے کے ساتھ",
    "empty stomach": "خالی پیٹ",
    "on empty stomach": "خالی پیٹ",

    // Specific Meals
    "before breakfast": "ناشتے سے پہلے",
    "after breakfast": "ناشتے کے بعد",
    "before lunch": "دوپہر کے کھانے سے پہلے",
    "after lunch": "دوپہر کے کھانے کے بعد",
    "before dinner": "رات کے کھانے سے پہلے",
    "after dinner": "رات کے کھانے کے بعد",

    // Frequency Words
    "everyday": "روزانہ",
    "every day": "روزانہ",
    "daily": "روزانہ",

    // Time of day
    "morning": "صبح",
    "in the morning": "صبح",
    "afternoon": "دوپہر",
    "in the afternoon": "دوپہر",
    "evening": "شام",
    "in the evening": "شام",
    "night": "رات",
    "at night": "رات کو",
    "at bedtime": "سونے سے پہلے",
    "before sleep": "سونے سے پہلے",
    "before bed": "سونے سے پہلے",
    "bedtime": "سونے سے پہلے",

    // Specific times
    "morning and evening": "صبح شام",
    "morning and night": "صبح اور رات",
    "day and night": "دن رات",
};

// ==================== DURATION ====================
const duration = {
    // Days - Complete 1-30
    "1 day": "ایک دن",
    "2 days": "دو دن",
    "3 days": "تین دن",
    "4 days": "چار دن",
    "5 days": "پانچ دن",
    "6 days": "چھ دن",
    "7 days": "سات دن",
    "8 days": "آٹھ دن",
    "9 days": "نو دن",
    "10 days": "دس دن",
    "11 days": "گیارہ دن",
    "12 days": "بارہ دن",
    "13 days": "تیرہ دن",
    "14 days": "چودہ دن",
    "15 days": "پندرہ دن",
    "16 days": "سولہ دن",
    "17 days": "سترہ دن",
    "18 days": "اٹھارہ دن",
    "19 days": "انیس دن",
    "20 days": "بیس دن",
    "21 days": "اکیس دن",
    "25 days": "پچیس دن",
    "28 days": "اٹھائیس دن",
    "30 days": "تیس دن",

    // Fallback for generic 'days'
    "days": "دن",
    "day": "دن",

    // Weeks
    "1 week": "ایک ہفتہ",
    "2 weeks": "دو ہفتے",
    "3 weeks": "تین ہفتے",
    "4 weeks": "چار ہفتے",
    "one week": "ایک ہفتہ",
    "two weeks": "دو ہفتے",

    // Months
    "1 month": "ایک ماہ",
    "2 months": "دو ماہ",
    "3 months": "تین ماہ",
    "6 months": "چھ ماہ",
    "one month": "ایک ماہ",
    "two months": "دو ماہ",
    "three months": "تین ماہ",

    // Other durations
    "for life": "ہمیشہ کے لیے",
    "lifelong": "زندگی بھر",
    "continuously": "مسلسل",
    "till next visit": "اگلی ملاقات تک",
    "until next visit": "اگلی ملاقات تک",
    "as directed": "ہدایت کے مطابق",
};

// ==================== EYE DESIGNATIONS ====================
const eyeDesignations = {
    // Parenthetical
    "(R)": "دائیں آنکھ میں",
    "(L)": "بائیں آنکھ میں",
    "(B)": "دونوں آنکھوں میں",
    "(BE)": "دونوں آنکھوں میں",
    "(OU)": "دونوں آنکھوں میں",
    "(OD)": "دائیں آنکھ میں",
    "(OS)": "بائیں آنکھ میں",

    // Without parentheses
    "R": "دائیں آنکھ",
    "L": "بائیں آنکھ",
    "B": "دونوں آنکھیں",
    "BE": "دونوں آنکھیں",
    "OU": "دونوں آنکھیں",
    "OS": "بائیں آنکھ",

    // Full words
    "right eye": "دائیں آنکھ میں",
    "left eye": "بائیں آنکھ میں",
    "both eyes": "دونوں آنکھوں میں",
    "right": "دائیں",
    "left": "بائیں",
    "both": "دونوں",

    // Affected eye
    "affected eye": "متاثرہ آنکھ میں",
    "affected eyes": "متاثرہ آنکھوں میں",
};

// ==================== COMMON OPHTHALMOLOGY MEDICINES ====================
const commonMedicines = {
    // Antibiotics
    "moxifloxacin": "موکسی فلوکساسین",
    "ciprofloxacin": "سپرو فلوکساسین",
    "ofloxacin": "اوفلوکساسین",
    "tobramycin": "ٹوبرامائسین",
    "gentamicin": "جینٹامائسین",
    "chloramphenicol": "کلورامفینیکول",

    // Anti-inflammatory
    "prednisolone": "پریڈنیسولون",
    "dexamethasone": "ڈیکسامیتھاسون",
    "fluorometholone": "فلوروميتھولون",
    "ketorolac": "کیٹورولیک",
    "nepafenac": "نیپافیناک",
    "flurbiprofen": "فلربیپروفین",

    // Lubricants / Artificial Tears
    "carboxymethylcellulose": "کاربوکسی میتھائل سیلولوز",
    "hydroxypropyl methylcellulose": "ہائیڈروکسی پروپائل میتھائل سیلولوز",
    "polyvinyl alcohol": "پولی وینائل الکحل",
    "artificial tears": "مصنوعی آنسو",
    "lubricant": "نمی بخش دوا",

    // Glaucoma medications
    "timolol": "ٹائمولول",
    "latanoprost": "لیٹانوپروسٹ",
    "brimonidine": "برائمونیڈین",
    "dorzolamide": "ڈورزولامائڈ",
    "travoprost": "ٹراوپروسٹ",
    "bimatoprost": "بائماٹوپروسٹ",
    "pilocarpine": "پائلوکارپین",

    // Mydriatics / Cycloplegics
    "tropicamide": "ٹروپیکامائڈ",
    "cyclopentolate": "سائیکلوپینٹولیٹ",
    "atropine": "ایٹروپین",
    "phenylephrine": "فینائل ایفرین",
    "homatropine": "ہوماٹروپین",

    // Antiallergic
    "olopatadine": "اولوپیٹاڈین",
    "ketotifen": "کیٹوٹیفین",
    "cromolyn": "کرومولین",
    "emedastine": "ایمیڈاسٹین",
    "azelastine": "ازیلاسٹین",

    // Antiviral
    "acyclovir": "ایسائیکلوویر",
    "ganciclovir": "گینسائیکلوویر",

    // Others
    "sodium hyaluronate": "سوڈیم ہائیلورونیٹ",
    "polyethylene glycol": "پولی ایتھیلین گلائکول",
};

// ==================== COMMON PHRASES ====================
const commonPhrases = {
    "instill": "ڈالیں",
    "apply": "لگائیں",
    "take": "لیں",
    "use": "استعمال کریں",
    "put": "ڈالیں",
    "continue": "جاری رکھیں",
    "stop": "بند کریں",
    "shake well before use": "استعمال سے پہلے اچھی طرح ہلائیں",
    "do not touch dropper": "ڈراپر کو ہاتھ نہ لگائیں",
    "keep refrigerated": "فریج میں رکھیں",
    "store in cool place": "ٹھنڈی جگہ رکھیں",
    "wash hands before use": "استعمال سے پہلے ہاتھ دھوئیں",
    "wait 5 minutes between drops": "دو قطروں کے درمیان پانچ منٹ کا وقفہ",
    "avoid sunlight": "دھوپ سے بچیں",
    "wear sunglasses": "دھوپ کا چشمہ پہنیں",
    "do not drive": "گاڑی نہ چلائیں",
    "may cause blurring": "دھندلا پن ہو سکتا ہے",
};

// ==================== UNITS ====================
const units = {
    "ml": "ایم ایل",
    "mg": "ملی گرام",
    "gm": "گرام",
    "g": "گرام",
    "%": "فیصد",
    "mcg": "مائیکروگرام",
    "iu": "آئی یو",
};

// ==================== MAIN TRANSLATION FUNCTION ====================

/**
 * Translates English prescription text to Urdu
 * @param {string} text - English prescription text
 * @returns {string} - Urdu translated text
 */
export const translateToUrdu = (text) => {
    if (!text || typeof text !== 'string') return text;

    let result = text.toLowerCase().trim();

    // Combine all dictionaries in order of priority (longer phrases first)
    const allTranslations = {
        ...commonPhrases,
        ...quantities,
        ...frequency,
        ...timing,
        ...duration,
        ...eyeDesignations,
        ...dosageForms,
        ...commonMedicines,
        ...units,
    };

    // Sort by length (longest first) to handle phrases before individual words
    const sortedKeys = Object.keys(allTranslations).sort((a, b) => b.length - a.length);

    // Replace each term
    for (const key of sortedKeys) {
        const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        result = result.replace(regex, allTranslations[key]);
    }

    // ❌ DISABLED: Keep numbers in English style (1, 2, 3) instead of Urdu (۱, ۲, ۳)
    // result = toUrduNumbers(result);

    return result;
};

/**
 * Creates a complete Urdu instruction from medicine object
 * @param {object} medicine - Medicine object with {medicine, dosage, duration, eye}
 * @returns {string} - Complete Urdu instruction
 */
export const createUrduInstruction = (medicine) => {
    if (!medicine) return '';

    const parts = [];

    // Dosage
    if (medicine.dosage) {
        parts.push(translateToUrdu(medicine.dosage));
    }

    // Duration
    if (medicine.duration) {
        parts.push(translateToUrdu(medicine.duration));
    }

    // Eye
    if (medicine.eye) {
        parts.push(translateToUrdu(medicine.eye));
    }

    return parts.join(' ۔ ');
};

/**
 * Generate common prescription patterns
 */
export const generateUrduPrescription = (dosage, frequency, duration, eye) => {
    const patterns = {
        drop: `${translateToUrdu(dosage)} ${translateToUrdu(frequency)} ${translateToUrdu(eye)} ${translateToUrdu(duration)}`,
    };
    return patterns.drop;
};

// Export all dictionaries for reference
export const dictionaries = {
    urduNumbers,
    dosageForms,
    quantities,
    frequency,
    timing,
    duration,
    eyeDesignations,
    commonMedicines,
    commonPhrases,
    units,
};

export default {
    translateToUrdu,
    createUrduInstruction,
    generateUrduPrescription,
    toUrduNumbers,
    dictionaries,
};
