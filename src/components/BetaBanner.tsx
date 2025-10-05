interface BetaBannerProps {
  message?: string;
}

export default function BetaBanner({ message = '[BETA: B-v7.2  F-v3.0]' }: BetaBannerProps) {
  return (
    <div className="bg-neutral-900 text-neutral-100 text-xs tracking-[0.2em] uppercase text-center py-2">
      {message}
    </div>
  );
}
