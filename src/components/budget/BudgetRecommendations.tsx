import React from 'react';
import { Lightbulb } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../shared/Card';

interface BudgetRecommendationsProps {
  totalBudget: number;
  spent: number;
  categories: Array<{ name: string; allocated: number; spent: number }>;
}

const BudgetRecommendations: React.FC<BudgetRecommendationsProps> = ({ totalBudget, spent, categories }) => {
  const getRecommendations = () => {
    const recommendations = [];
    const spentPercentage = (spent / totalBudget) * 100;

    // Overall budget status
    if (spentPercentage <= 50) {
      recommendations.push({
        type: 'success',
        message: `Based on your $${totalBudget.toLocaleString()} budget, you're on track!`
      });
    }

    // Category-specific recommendations
    categories.forEach(category => {
      const categoryPercentage = (category.allocated / totalBudget) * 100;
      const spentPercentage = (category.spent / category.allocated) * 100;

      if (category.name === 'Photography' && categoryPercentage < 12) {
        recommendations.push({
          type: 'warning',
          message: 'Consider allocating more to photography - average couples spend 12-15%'
        });
      }

      if (spentPercentage > 90) {
        recommendations.push({
          type: 'danger',
          message: `${category.name} expenses are nearing the allocated budget`
        });
      }
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Lightbulb className="text-primary-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Smart Suggestions</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`p-3 rounded-md ${
              rec.type === 'success' ? 'bg-secondary-50 text-secondary-800' :
              rec.type === 'warning' ? 'bg-accent-50 text-accent-800' :
              'bg-red-50 text-red-800'
            }`}
          >
            {rec.message}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BudgetRecommendations;