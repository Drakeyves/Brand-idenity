import { BadgeProps, Badge as BaseBadge } from 'react-daisyui';
import { cn } from '../../lib/utils';

interface DrakeBadgeProps extends Omit<BadgeProps, 'variant'> {
  drakeVariant?: 'purple' | 'teal' | 'gold' | 'metallic' | 'default';
}

const Badge = (props: DrakeBadgeProps) => {
  const { children, className, drakeVariant = 'default', ...rest } = props;

  const variantClasses = {
    purple: 'bg-accent-purple/10 text-accent-purple-light',
    teal: 'bg-accent-teal/10 text-accent-teal-light',
    gold: 'bg-accent-gold/10 text-accent-gold-light',
    metallic: 'bg-accent-metallic/10 text-accent-metallic-light',
    default: 'badge-drake',
  };

  return (
    <BaseBadge
      {...rest}
      className={cn(
        'rounded-md text-xs py-1 px-2 font-medium',
        variantClasses[drakeVariant],
        className
      )}
    >
      {children}
    </BaseBadge>
  );
};

export default Badge;
