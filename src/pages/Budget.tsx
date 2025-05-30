import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card, { CardHeader, CardContent } from '../components/shared/Card';
import ProgressBar from '../components/shared/ProgressBar';
import AddExpenseModal from '../components/budget/AddExpenseModal';
import BudgetRecommendations from '../components/budget/BudgetRecommendations';
import weddingData from '../utils/weddingData';
import { DollarSign, PieChart as PieChartIcon, Plus, Calendar } from 'lucide-react';

const Budget: React.FC = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const { total, spent, remaining, categories } = weddingData.budget;
  const budgetUsedPercentage = Math.round((spent / total) * 100);

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-accent-600';
    return 'text-secondary-600';
  };

  const pieData = [
    { name: 'Spent', value: spent },
    { name: 'Remaining', value: remaining }
  ];

  const COLORS = ['#F277AE', '#B7E4C7'];

  const handleAddExpense = (expense: any) => {
    console.log('New expense:', expense);
    // In a real app, this would update the state and backend
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-gray-800">Budget Planner</h1>
        <p className="text-gray-600 mt-1">Track and manage your wedding expenses</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Budget Overview</h2>
            <button
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-md transition-colors flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Expense
            </button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <DollarSign size={16} className="text-primary-600" />
                  </div>
                  <span className="text-sm text-gray-600">Total Budget</span>
                </div>
                <p className="text-2xl font-semibold text-gray-800">${total.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                    <DollarSign size={16} className="text-secondary-600" />
                  </div>
                  <span className="text-sm text-gray-600">Amount Spent</span>
                </div>
                <p className="text-2xl font-semibold text-gray-800">${spent.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                    <DollarSign size={16} className="text-accent-600" />
                  </div>
                  <span className="text-sm text-gray-600">Remaining</span>
                </div>
                <p className="text-2xl font-semibold text-gray-800">${remaining.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Recent Expenses</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {weddingData.budget.expenses.map((expense) => (
              <div key={expense.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{expense.vendorName}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                  <p className="text-xs text-gray-400">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  ${expense.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Category Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center">
            <PieChartIcon size={18} className="text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Category Breakdown</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((category, index) => {
              const percentage = Math.round((category.spent / category.allocated) * 100);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className={`font-medium ${getStatusColor(percentage)}`}>
                      ${category.spent.toLocaleString()} / ${category.allocated.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar
                    percentage={percentage}
                    color={percentage >= 90 ? 'danger' : percentage >= 75 ? 'warning' : 'primary'}
                    className="h-2"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <BudgetRecommendations
          totalBudget={total}
          spent={spent}
          categories={categories}
        />
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        onAddExpense={handleAddExpense}
        categories={categories}
      />
    </div>
  );
};

export default Budget;