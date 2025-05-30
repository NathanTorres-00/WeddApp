import React from 'react';
import { calculateTimeRemaining } from '../../utils/weddingData';

const TimeCounter: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 86400000); // Update once per day

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <CounterItem value={timeRemaining.years} label="Years" />
      <CounterItem value={timeRemaining.months} label="Months" />
      <CounterItem value={timeRemaining.days} label="Days" />
    </div>
  );
};

interface CounterItemProps {
  value: number;
  label: string;
}

const CounterItem: React.FC<CounterItemProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center mb-2 text-primary-800 font-bold text-2xl shadow-sm">
        {value}
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

export default TimeCounter;