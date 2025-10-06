import { useI18n } from '../i18n';

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (v: string) => void;
};

export default function FiltersBar({ categories, selectedCategory, onSelectCategory }: Props) {
  const { t } = useI18n();
  const orderedCategories = [...categories.filter(category => category !== 'All'), 'All'];

  return (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-none pr-6">
        <div className="flex gap-3 min-w-max py-1">
          {orderedCategories.map(category => {
          const isActive = category === selectedCategory;
          const label = category === 'All' ? t('filters.allCategory') : category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-sm uppercase tracking-wide border transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-600 border-neutral-300 hover:border-amber-500 hover:text-amber-600'
              }`}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-50 to-transparent" />
    </div>
  );
}
