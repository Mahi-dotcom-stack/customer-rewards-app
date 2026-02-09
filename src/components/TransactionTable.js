import React from 'react';
import PropTypes from 'prop-types';
import { ITEMS_PER_PAGE } from '../constants/appConstants';
import { calculateRewards } from '../utils/rewardCalculator';
import '../styles/Table.css';

// TransactionTable component displays transactions with calculated reward points
const TransactionTable = ({ transactions, currentPage = 1, itemsPerPage = ITEMS_PER_PAGE }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction, index) => (
            <tr key={`${transaction.customerId}-${transaction.date}-${index}`}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td className="rewards">{calculateRewards(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="transaction-count">
        Showing {paginatedTransactions.length} of {transactions.length} transactions
      </p>
    </div>
  );
};

// PropTypes validation
TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number
};

export default React.memo(TransactionTable);
