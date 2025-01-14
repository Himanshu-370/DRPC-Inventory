import { useState, useEffect } from "react";
import { getPriceHistory } from "../api/services"; // API function to fetch price history
import Header from "../components/Header";
import Footer from "../components/Footer";

const PriceHistory = () => {
  const [priceHistories, setPriceHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPriceHistory();
  }, []);

  const fetchPriceHistory = async () => {
    setLoading(true);
    try {
      const data = await getPriceHistory(); // Fetch from API
      setPriceHistories(data || []);
    } catch (err) {
      console.error("Error fetching price history:", err);
      setError("Failed to load price history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Raw Material Price History</h1>
        {loading ? (
          <div className="text-center mt-6">Loading...</div>
        ) : error ? (
          <div className="text-center mt-6 text-red-500">{error}</div>
        ) : priceHistories.length === 0 ? (
          <div className="text-center mt-6 text-gray-500">
            No price history available.
          </div>
        ) : (
          <table className="table-auto w-full mt-6 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Material</th>
                <th className="border border-gray-300 px-4 py-2">
                  Current Price
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Price History
                </th>
              </tr>
            </thead>
            <tbody>
              {priceHistories.map((history) => (
                <tr key={history.rawMaterialId}>
                  <td className="border border-gray-300 px-4 py-2">
                    {history.rawMaterialProductName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {history.currentPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <ul>
                      {history.priceHistory.map((record, index) => (
                        <li key={index}>
                          {record.price} (on{" "}
                          {new Date(record.timestamp).toLocaleString()})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PriceHistory;
