import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ImageLoader = ({
  src, className, ...rest 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted rounded-lg cursor-pointer",
        className
      )}
      {...rest}
    >
      <img
        src={src}
        alt=""
        className={cn(
          "w-full h-full object-cover transition-all duration-200",
          isLoading ? "blur-lg" : "blur-0"
        )}
      />
    </div>
  );
};

export default ImageLoader;
