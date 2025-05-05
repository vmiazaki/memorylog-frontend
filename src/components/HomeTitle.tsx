// components/HomeTitle.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TRANSITION_DURATION } from '@/lib/global';

const text = 'MEMORYLOG';

export default function HomeTitle() {
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>(Array(text.length).fill(false));
  const [titleScale, setTitleScale] = useState<number>(0.6);

  useEffect(() => {
    const shuffleArray = (array: number[]) =>
      array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    const randomOrder = shuffleArray([...Array(text.length).keys()]);
    const letterDelay = 100;

    const glitchTimer = setTimeout(() => {
      randomOrder.forEach((index, order) => {
        setTimeout(() => {
          setVisibleLetters((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, order * letterDelay);
      });
    }, TRANSITION_DURATION); // delay before glitch begins

    const glitchDuration = text.length * letterDelay;
    const scaleTimeout = setTimeout(() => {
      setTitleScale(1);
    }, TRANSITION_DURATION + glitchDuration); // wait for glitch to finish

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(scaleTimeout);
    };
  }, []);

  return (
    <motion.h1
      className="home-title"
      initial={{ scale: 0.6 }}
      animate={{ scale: titleScale }}
      transition={{
        duration: TRANSITION_DURATION / 500,
        ease: [0.755, 0.050, 0.855, 0.060],
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: visibleLetters[index] ? 1 : 0,
            transition: `opacity ${TRANSITION_DURATION}ms ease`,
            display: 'inline-block',
          }}
        >
          {char}
        </span>
      ))}
    </motion.h1>
  );
}
