import React from 'react';
import Card, { CardHeader, CardContent } from '../components/shared/Card';
import TimeCounter from '../components/shared/TimeCounter';
import ProgressBar from '../components/shared/ProgressBar';
import weddingData from '../utils/weddingData';
import { CalendarCheck, DollarSign, Users, MapPin, Clock, Check } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Calculate total completed tasks
  const allTasks = weddingData.timeline.flatMap(month => month.tasks);
  const completedTasks = allTasks.filter(task => task.completed).length;
  const totalTasks = allTasks.length;
  const taskCompletionPercentage = Math.round((completedTasks / totalTasks) * 100);

  // Calculate budget percentage used
  const budgetUsedPercentage = Math.round((weddingData.budget.spent / weddingData.budget.total) * 100);

  return (
    <div className="animate-slide-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-gray-800">Welcome to WedPlan AI</h1>
        <p className="text-gray-600 mt-1">Your personal wedding planning assistant</p>
      </div>

      {/* Banner with couple photo */}
      <Card className="mb-6 overflow-hidden">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={weddingData.couple.photoUrl} 
            alt={weddingData.couple.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl md:text-3xl font-display font-semibold mb-1">
              {weddingData.couple.name}
            </h2>
            <p className="text-white/90 flex items-center">
              <CalendarCheck size={16} className="mr-1" />
              <span>{weddingData.wedding.date}</span>
              <span className="mx-2">•</span>
              <MapPin size={16} className="mr-1" />
              <span>{weddingData.wedding.location}</span>
            </p>
          </div>
        </div>
        <div className="bg-primary-50">
          <TimeCounter />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Wedding Overview */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Wedding Overview</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <Users size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Guest Count</p>
                <p className="font-medium">{weddingData.wedding.guestCount} guests</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
                <MapPin size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Venue</p>
                <p className="font-medium">{weddingData.wedding.venue}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <Clock size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Style</p>
                <p className="font-medium">{weddingData.wedding.style}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planning Progress */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Planning Progress</h2>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Task Completion</p>
                <p className="text-sm font-medium">{completedTasks}/{totalTasks} tasks</p>
              </div>
              <ProgressBar percentage={taskCompletionPercentage} color="secondary" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Budget Used</p>
                <p className="text-sm font-medium">${weddingData.budget.spent.toLocaleString()} of ${weddingData.budget.total.toLocaleString()}</p>
              </div>
              <ProgressBar percentage={budgetUsedPercentage} color="primary" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Vendors Booked</p>
                <p className="text-sm font-medium">2/6 vendors</p>
              </div>
              <ProgressBar percentage={33} color="accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Tasks */}
        <Card className="md:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h2>
            <a href="/timeline" className="text-sm text-primary-600 hover:text-primary-800 transition-colors">View All</a>
          </CardHeader>
          <CardContent className="divide-y divide-gray-100">
            {weddingData.timeline
              .flatMap(month => month.tasks)
              .filter(task => !task.completed)
              .slice(0, 5)
              .map((task, index) => (
                <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <Check size={16} className="text-gray-400" />
                    </div>
                    <span>{task.name}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-100 text-accent-800">To Do</span>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Budget Summary */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Budget</h2>
            <a href="/budget" className="text-sm text-primary-600 hover:text-primary-800 transition-colors">Details</a>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center mb-1">
                <DollarSign size={18} className="text-primary-600 mr-1" />
                <span className="text-gray-800 font-medium">Total Budget</span>
              </div>
              <p className="text-2xl font-semibold">${weddingData.budget.total.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-md p-3 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Spent</span>
                <span className="text-sm font-medium text-gray-800">${weddingData.budget.spent.toLocaleString()}</span>
              </div>
              <ProgressBar percentage={budgetUsedPercentage} color="primary" className="h-1.5" />
            </div>
            <div className="bg-gray-50 rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Remaining</span>
                <span className="text-sm font-medium text-gray-800">${weddingData.budget.remaining.toLocaleString()}</span>
              </div>
              <ProgressBar percentage={100 - budgetUsedPercentage} color="secondary" className="h-1.5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;