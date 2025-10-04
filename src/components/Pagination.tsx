import { useI18n } from '../i18n';

type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPrev, onNext, onJump }: Props) {
  const { t } = useI18n();

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 pb-16">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-6 py-3 text-sm font-light text-neutral-600 bg-white border border-neutral-300 hover:border-amber-500 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
      >
        {t('pagination.previous')}
      </button>

      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onJump(page)}
            className={`px-4 py-3 text-sm font-light tracking-wide transition-colors ${
              currentPage === page
                ? 'bg-amber-500 text-white border border-amber-500'
                : 'text-neutral-600 bg-white border border-neutral-300 hover:border-amber-500 hover:text-amber-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-6 py-3 text-sm font-light text-neutral-600 bg-white border border-neutral-300 hover:border-amber-500 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
      >
        {t('pagination.next')}
      </button>
    </div>
  );
}
