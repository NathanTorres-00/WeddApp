import React from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  className = '',
  color = 'primary'
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-500';
      case 'secondary':
        return 'bg-secondary-500';
      case 'accent':
        return 'bg-accent-500';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div 
        className={`h-full ${getColorClass()} transition-all duration-500 ease-in-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;