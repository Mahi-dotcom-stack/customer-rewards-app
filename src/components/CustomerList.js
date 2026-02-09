import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Customer.css';

// CustomerList component now renders a dropdown
const CustomerList = ({ customers, onSelect, selectedCustomer }) => {
  return (
    <div className="customer-list-dropdown">
      <select
        value={selectedCustomer || ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Customer</option>
        {customers.map((customerName) => (
          <option key={customerName} value={customerName}>
            {customerName}
          </option>
        ))}
      </select>
    </div>
  );
};

// PropTypes validation
CustomerList.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.string
};

export default React.memo(CustomerList);
