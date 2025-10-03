import { Search, Filter } from 'lucide-react';
import { useI18n } from '../i18n';

type Props = {
  searchTerm: string;
  onSearch: (v: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (v: string) => void;
};

export default function FiltersBar({
  searchTerm, onSearch,
  categories, selectedCategory, onSelectCategory,
}: Props) {
  const { t } = useI18n();

  return (
    <div className="flex w-full flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Search */}
      <div className="relative w-full sm:w-[13.5rem]">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          type="text"
          placeholder={t('filters.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light tracking-wide"
        />
      </div>

      {/* Category */}
      <div className="relative w-full sm:w-[13.5rem]">
        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full pl-12 pr-8 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none font-light tracking-wide"
        >
          {categories.map(category => (
            <option key={category} value={category} className="bg-neutral-800">
              {category === 'All' ? t('filters.allCategory') : category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
