// components/TransitionImage.tsx

'use client';

import { useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { ImgHTMLAttributes } from 'react';

// Merge HTML <img> props with Framer Motion's MotionProps
type TransitionImageProps = ImgHTMLAttributes<HTMLImageElement> & MotionProps;

export default function TransitionImage({
  src,
  alt,
  ...rest
}: TransitionImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...rest}
    />
  );
}