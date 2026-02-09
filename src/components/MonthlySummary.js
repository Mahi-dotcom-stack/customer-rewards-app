import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { calculateRewards } from '../utils/rewardCalculator';
import '../styles/Summary.css';

// MonthlySummary component displays reward points summary by month and total
const MonthlySummary = ({ transactions }) => {
  // Calculate monthly rewards using useMemo for performance optimization
  const monthlySummary = useMemo(() => {
    const summary = {};
    let totalPoints = 0;

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      const points = calculateRewards(transaction.amount);
      
      if (!summary[monthKey]) {
        summary[monthKey] = {
          monthName,
          points: 0,
          transactions: 0,
          amount: 0
        };
      }
      
      summary[monthKey].points += points;
      summary[monthKey].transactions += 1;
      summary[monthKey].amount += transaction.amount;
      totalPoints += points;
    });

    return { summary, totalPoints };
  }, [transactions]);

  return (
    <div className="summary-container">
      <h3>Rewards Summary</h3>
      
      {Object.entries(monthlySummary.summary).length === 0 ? (
        <p className="no-data">No transactions available</p>
      ) : (
        <>
          <div className="summary-cards">
            {Object.values(monthlySummary.summary).map((month) => (
              <div key={month.monthName} className="summary-card">
                <h4>{month.monthName}</h4>
                <p><strong>Total Amount:</strong> ${month.amount.toFixed(2)}</p>
                <p><strong>Transactions:</strong> {month.transactions}</p>
                <p className="points-highlight"><strong>Reward Points:</strong> {month.points}</p>
              </div>
            ))}
          </div>
          
          <div className="total-summary">
            <h3>Total Reward Points: <span className="total-points">{monthlySummary.totalPoints}</span></h3>
          </div>
        </>
      )}
    </div>
  );
};

// PropTypes validation
MonthlySummary.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(MonthlySummary);
