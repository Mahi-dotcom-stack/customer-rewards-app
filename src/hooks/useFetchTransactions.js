import { useEffect, useState } from "react";

// Custom hook to fetch transaction data
export const useFetchTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate asynchronous API call
  useEffect(() => {
    const fetchTransactions = async () => {
      setError(null);
      try {
        setLoading(true);

        const response = await fetch("/data/mockdata.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch transactions: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { data, loading, error };
};
