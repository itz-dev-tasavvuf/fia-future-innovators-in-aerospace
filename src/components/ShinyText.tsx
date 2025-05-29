
import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  disabled = false, 
  speed = 3, 
  className = '' 
}) => {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-block bg-gradient-to-r from-current via-white to-current bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% auto',
        animation: `shine ${speed}s ease-in-out infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </span>
  );
};

export default ShinyText;
