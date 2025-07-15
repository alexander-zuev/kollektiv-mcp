import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypeWriterProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  startDelay?: number;
  backDelay?: number;
  loop?: boolean;
  className?: string;
}

/**
 * TypeWriter component that provides typing animation using Typed.js
 */
export const TypeWriter: React.FC<TypeWriterProps> = ({
  strings,
  typeSpeed = 80,
  backSpeed = 50,
  startDelay = 300,
  backDelay = 1000,
  loop = true,
  className,
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        startDelay,
        backDelay,
        loop,
        smartBackspace: true,
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, [strings, typeSpeed, backSpeed, startDelay, backDelay, loop]);

  return <span className={className} ref={el} />;
};

export default TypeWriter;
