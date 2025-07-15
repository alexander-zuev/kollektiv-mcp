import React from 'react';
import logoImage from '@/assets/brand/logo.svg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'text' | 'icon';
  color?: 'primary' | 'white' | 'black';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'text',
  color = 'primary',
  className = '',
}) => {
  // Size mapping for the container
  const sizeMap = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-16',
  };

  // Text size mapping
  const textSizeMap = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  // Color mapping
  const colorMap = {
    primary: 'text-primary',
    white: 'text-[var(--gray-12)]',
    black: 'text-[var(--gray-1)]',
  };

  // Icon component (Q logo)
  const IconComponent = (): JSX.Element => (
    <img src={logoImage} alt="Q Logo" className={`${sizeMap[size]} aspect-auto object-contain`} />
  );

  // Text component (Query text)
  const TextComponent = (): JSX.Element => (
    <span className={`font-mono leading-1 ${textSizeMap[size]} ${colorMap[color]} font-bold`}>
      Kollektiv
    </span>
  );

  // Render based on variant
  const renderVariant = (): JSX.Element => {
    switch (variant) {
      case 'icon':
        return <IconComponent />;
      case 'text':
      default:
        return (
          <div className="flex items-center">
            <TextComponent />
          </div>
        );
    }
  };

  return <div className={`inline-flex items-center ${className}`}>{renderVariant()}</div>;
};