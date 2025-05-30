import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../components/shared/Card';
import weddingData, { calculateTimeRemaining } from '../utils/weddingData';
import { Calendar, Check, Clock, AlertCircle, Calendar as CalendarIcon, CheckCircle2, Circle, Timer } from 'lucide-react';

const Timeline: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<number[]>(
    weddingData.timeline.flatMap(period => 
      period.tasks.filter(task => task.completed).map(task => task.id)
    )
  );

  const timeRemaining = calculateTimeRemaining();
  
  // Calculate total tasks and completed tasks
  const allTasks = weddingData.timeline.flatMap(period => period.tasks);
  const totalTasks = allTasks.length;
  const completedTasksCount = completedTasks.length;
  const progressPercentage = Math.round((completedTasksCount / totalTasks) * 100);

  const handleTaskToggle = (taskId: number) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getTaskIcon = (task: any) => {
    if (completedTasks.includes(task.id)) {
      return <CheckCircle2 size={20} className="text-secondary-600" />;
    }
    if (task.inProgress) {
      return <Timer size={20} className="text-accent-600" />;
    }
    return <Circle size={20} className="text-primary-600" />;
  };

  const getTaskStatusClass = (task: any) => {
    if (completedTasks.includes(task.id)) {
      return 'bg-secondary-100 text-secondary-800';
    }
    if (task.inProgress) {
      return 'bg-accent-100 text-accent-800';
    }
    return 'bg-primary-100 text-primary-800';
  };

  return (
    <div className="animate-slide-in">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-gray-800">Wedding Timeline</h1>
        <p className="text-gray-600 mt-1">Track your wedding planning progress</p>
      </div>

      {/* Countdown Card */}
      <Card className="mb-6 bg-gradient-to-r from-primary-50 to-accent-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Calendar size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-primary-800">Wedding Date</p>
                <p className="text-lg font-semibold text-primary-900">{weddingData.wedding.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Clock size={24} className="text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-accent-800">Time Remaining</p>
                <p className="text-lg font-semibold text-accent-900">
                  {timeRemaining.totalDays} Days
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Check size={24} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-800">Planning Progress</p>
                <p className="text-lg font-semibold text-secondary-900">{progressPercentage}% Complete</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CalendarIcon size={20} className="text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-800">Planning Timeline</h2>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="absolute top-0 bottom-0 left-8 w-px bg-gray-200" />
          
          {weddingData.timeline.map((period, periodIndex) => (
            <div key={periodIndex} className="mb-8 last:mb-0">
              <div className="flex items-center mb-4">
                <div className={`
                  w-4 h-4 rounded-full border-2 z-10
                  ${period.status === 'completed' ? 'bg-secondary-500 border-secondary-500' :
                    period.status === 'current' ? 'bg-white border-accent-500' :
                    'bg-white border-gray-300'}
                `} />
                <h3 className="text-lg font-semibold ml-6 text-gray-800">{period.title}</h3>
              </div>
              
              <div className="ml-8 space-y-4">
                {period.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`
                      p-4 rounded-lg border transition-all duration-200
                      ${completedTasks.includes(task.id) ? 'bg-secondary-50 border-secondary-200' :
                        task.inProgress ? 'bg-accent-50 border-accent-200' :
                        'bg-white border-gray-200 hover:border-primary-200'}
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => handleTaskToggle(task.id)}
                          className="mt-1 focus:outline-none"
                        >
                          {getTaskIcon(task)}
                        </button>
                        <div>
                          <p className={`font-medium ${completedTasks.includes(task.id) ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                            {task.name}
                          </p>
                          {task.vendor && (
                            <p className="text-sm text-gray-600 mt-1">
                              Vendor: {task.vendor} {task.cost && `($${task.cost.toLocaleString()})`}
                            </p>
                          )}
                          {task.dueInDays && (
                            <div className="flex items-center mt-2">
                              <AlertCircle size={14} className="text-accent-600 mr-1" />
                              <span className="text-sm text-accent-800">Due in {task.dueInDays} days</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusClass(task)}`}>
                        {completedTasks.includes(task.id) ? 'Completed' : task.inProgress ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;