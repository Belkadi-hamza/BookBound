import { motion } from 'framer-motion';
import { X, Filter, Star, Globe } from 'lucide-react';

const languageMap = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  ar: "Arabic",
  zh: "Chinese",
  ja: "Japanese",
  ru: "Russian",
  pt: "Portuguese",
  nl: "Dutch",
  sv: "Swedish",
  fi: "Finnish",
  no: "Norwegian",
  da: "Danish",
  ko: "Korean",
  hi: "Hindi",
  tr: "Turkish",
  el: "Greek",
  he: "Hebrew",
  pl: "Polish",
  cs: "Czech",
  sk: "Slovak",
  ro: "Romanian",
  hu: "Hungarian",
  th: "Thai",
  vi: "Vietnamese",
  id: "Indonesian",
  ms: "Malay",
  bn: "Bengali",
  uk: "Ukrainian",
  sr: "Serbian",
  hr: "Croatian",
  lt: "Lithuanian",
  lv: "Latvian",
  et: "Estonian",
  sl: "Slovenian",
  bg: "Bulgarian",
  fa: "Persian",
  ur: "Urdu",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  sw: "Swahili",
  am: "Amharic",
  az: "Azerbaijani",
  hy: "Armenian",
  kk: "Kazakh",
  mn: "Mongolian",
  ps: "Pashto",
  si: "Sinhala",
  my: "Burmese",
  km: "Khmer",
  lo: "Lao",
  ne: "Nepali",
  ca: "Catalan"
};


interface FilterPanelProps {
  categories: string[];
  languages: string[];
  selectedCategory: string | null;
  selectedLanguages: string[];
  minRating: number;
  onCategoryChange: (category: string | null) => void;
  onLanguageToggle: (language: string) => void;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
  onClose?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  languages,
  selectedCategory,
  selectedLanguages,
  minRating,
  onCategoryChange,
  onLanguageToggle,
  onRatingChange,
  onReset,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center mb-6">
              <Filter className="h-5 w-5 text-[#2A3B4C] mr-2" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Category selector */}
        <div>
          <h3 className="font-medium mb-3">Genres</h3>
          <select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value || null)}
            className="w-full p-2 border rounded"
          >
            <option value="">All categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Language checkboxes */}
        <div>
  <h3 className="font-semibold mb-3 flex items-center">
    <Globe className="h-4 w-4 mr-2" />
    Language
  </h3>
  <div className="space-y-2">
    {languages.map(language => (
      <label key={language} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedLanguages.includes(language)}
          onChange={() => onLanguageToggle(language)}
          className="rounded text-blue-600"
        />
        <span className="text-sm">
          {languageMap[language] || language.toUpperCase()} 
        </span>
      </label>
    ))}
  </div>
</div>


        {/* Rating slider */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Minimum Rating
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => onRatingChange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center mt-2">{minRating} stars</div>
              </div>
            </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;