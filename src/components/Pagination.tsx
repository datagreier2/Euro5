type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPrev, onNext, onJump }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-3 pb-16">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-6 py-3 text-sm font-light text-slate-300 bg-slate-800 border border-slate-600 hover:border-amber-600 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onJump(page)}
            className={`px-4 py-3 text-sm font-light tracking-wide transition-colors ${
              currentPage === page
                ? 'bg-amber-600 text-slate-900 border border-amber-600'
                : 'text-slate-300 bg-slate-800 border border-slate-600 hover:border-amber-600 hover:text-amber-400'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-6 py-3 text-sm font-light text-slate-300 bg-slate-800 border border-slate-600 hover:border-amber-600 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
      >
        Next
      </button>
    </div>
  );
}
