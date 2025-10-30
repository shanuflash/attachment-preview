import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }) => {
  return <ShadcnSkeleton className={cn('bg-muted', className)} {...props} />;
};

export default Skeleton;
