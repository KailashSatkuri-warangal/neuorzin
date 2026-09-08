import React, { useState } from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export function ImageLoader({
  src,
  alt = '',
  className = '',
  skeletonHeight = 'h-52',
  rounded = 'rounded-2xl',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {!isLoaded && !hasError && (
        <SkeletonLoader
          type="image"
          className={`absolute inset-0 !w-full !h-full ${rounded} !rounded-none`}
        />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${rounded}`}
        {...props}
      />
    </div>
  );
}

export default ImageLoader;
