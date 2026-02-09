import React, { useState, useCallback, useMemo } from 'react';
import { ITEMS_PER_PAGE } from './constants/appConstants';
import { useFetchTransactions } from './hooks/useFetchTransactions';
import CustomerList from './components/CustomerList';
import TransactionTable from './components/TransactionTable';
import MonthlySummary from './components/MonthlySummary';
import './styles/App.css';

// Main App component
function App() {
  const { data, loading, error} = useFetchTransactions();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = ITEMS_PER_PAGE;

  // Extract unique customers using useMemo for performance optimization
  const customers = useMemo(() => {
    const unique = [...new Set(data.map(transaction => transaction.customerName))].sort();
    const priorityName = 'mahesh';
    const prioritized = unique.filter(name => name.toLowerCase() === priorityName);
    const others = unique.filter(name => name.toLowerCase() !== priorityName);
    return [...prioritized, ...others];
  }, [data]);

  // useCallback to memoize the selection handler
  const handleCustomerSelect = useCallback((customerName) => {
    setSelectedCustomer(customerName);
    setCurrentPage(1); // Reset to first page on customer change
  }, []);

  // Filter transactions for selected customer using useMemo
  const filteredTransactions = useMemo(() => {
    if (!selectedCustomer) return [];
    return data.filter(transaction => transaction.customerName === selectedCustomer)
               .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data, selectedCustomer]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Handle pagination
  const handlePageChange = useCallback((pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  }, [totalPages]);

  return (
    <div className="app">
      {
        error && 
        <div className='error'>{error.message || "Something went wrong"}</div>
      }
      {
        loading && 
        <div className="loading">Loading transactions...</div>
      }
      {!error && !loading && (
        <>
        <header className="app-header">
          <h1>Customer Rewards Program</h1>
          <p className="subtitle">Track your rewards and transaction history</p>
        </header>
        <div className="container">
          <div className="card">
            <div className="customer-section">
              <h2>Select a Customer</h2>
              <CustomerList
                customers={customers}
                onSelect={handleCustomerSelect}
                selectedCustomer={selectedCustomer}
              />
            </div>
            {selectedCustomer && (
              <div className="details-section">
                <h2>Transactions for {selectedCustomer}</h2>

                {filteredTransactions.length === 0 ? (
                  <p className="no-data">No transactions found for this customer</p>
                ) : (
                  <>
                    <TransactionTable 
                      transactions={filteredTransactions}
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                    />

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="pagination">
                        <button 
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="pagination-btn"
                        >
                          ← Previous
                        </button>
                        <span className="page-info">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button 
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="pagination-btn"
                        >
                          Next →
                        </button>
                      </div>
                    )}

                    {/* Monthly Summary */}
                    <MonthlySummary transactions={filteredTransactions} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default App;
 