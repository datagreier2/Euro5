import { Search, Filter } from 'lucide-react';

type Props = {
  searchTerm: string;
  onSearch: (v: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (v: string) => void;
  sources: string[];
  selectedSource: string;
  onSelectSource: (v: string) => void;
};

export default function FiltersBar({
  searchTerm, onSearch,
  categories, selectedCategory, onSelectCategory,
  sources, selectedSource, onSelectSource
}: Props) {
  return (
    <section className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search intelligence..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light tracking-wide"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="pl-12 pr-8 py-3 bg-slate-700 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none min-w-40 font-light tracking-wide"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-slate-700">{category}</option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div className="relative">
            <select
              value={selectedSource}
              onChange={(e) => onSelectSource(e.target.value)}
              className="pl-4 pr-8 py-3 bg-slate-700 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none min-w-40 font-light tracking-wide"
            >
              {sources.map(source => (
                <option key={source} value={source} className="bg-slate-700">{source}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
