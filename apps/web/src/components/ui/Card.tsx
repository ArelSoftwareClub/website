import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'outline';

const variantClasses: Record<CardVariant, string> = {
  default:
    'border border-slate-200/80 bg-white shadow-sm',
  elevated:
    'border border-slate-200/60 bg-white shadow-md',
  outline: 'border border-slate-200 bg-transparent shadow-none',
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Subtle lift on hover (lists, project/event grids) */
  interactive?: boolean;
}

export function Card({
  variant = 'default',
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all duration-200',
        variantClasses[variant],
        interactive &&
          'hover:-translate-y-0.5 hover:border-orange-DEFAULT/30 hover:shadow-lg',
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-lg font-bold tracking-tight text-slate-900',
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('mt-2 text-sm leading-relaxed text-slate-600', className)}
      {...props}
    />
  );
}
