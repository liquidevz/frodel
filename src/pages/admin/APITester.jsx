import React, { useState } from 'react';
import { productAPI, enquiryAPI, userAPI } from '../../services/api';

const APITester = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testAPI = async (apiName, apiCall) => {
    setLoading(true);
    try {
      const response = await apiCall();
      setResults(prev => ({
        ...prev,
        [apiName]: { success: true, data: response.data }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [apiName]: { success: false, error: error.message }
      }));
    }
    setLoading(false);
  };

  const tests = [
    { name: 'Get All Products', call: () => productAPI.getAll() },
    { name: 'Get All Enquiries', call: () => enquiryAPI.getAll() },
    { name: 'Get All Users', call: () => userAPI.getAll() },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">API Tester</h1>
      
      <div className="space-y-4">
        {tests.map((test) => (
          <div key={test.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{test.name}</h3>
              <button
                onClick={() => testAPI(test.name, test.call)}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Test
              </button>
            </div>
            
            {results[test.name] && (
              <div className={`p-4 rounded-lg ${
                results[test.name].success ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {results[test.name].success ? (
                  <div>
                    <p className="text-green-800 font-medium">✓ Success</p>
                    <pre className="text-sm text-green-700 mt-2 overflow-auto">
                      {JSON.stringify(results[test.name].data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-red-800">✗ Error: {results[test.name].error}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default APITester;