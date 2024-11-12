
import React, { useState } from 'react';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState('Vizag'); // Default station
  const [parameter, setParameter] = useState('temperature'); // Default parameter

  const API_KEY = '446d183e64e64e8eb4bca1407ab02a89';  // Your provided API Key
  const baseUrl = 'https://gemini.incois.gov.in/OceanDataAPI/api/wqns/';

  const fetchAPIData = async () => {
    setLoading(true);
    const url = `${baseUrl}${station}/${parameter}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': API_KEY,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setResponseData(data);
      } else {
        console.log('Failed to fetch: ' + response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>INCOIS Ocean Data API Test</h1>

      <div>
        <label>Station: </label>
        <select value={station} onChange={(e) => setStation(e.target.value)}>
          <option value="Kochi">Kochi</option>
          <option value="Vizag">Vizag</option>
        </select>
      </div>

      <div>
        <label>Parameter: </label>
        <select value={parameter} onChange={(e) => setParameter(e.target.value)}>
          <option value="currentspeed">Current Speed</option>
          <option value="currentdirection">Current Direction</option>
          <option value="ph">pH Level</option>
          <option value="salinity">Salinity</option>
          <option value="temperature">Temperature</option>
          <option value="dissolvedoxygen">Dissolved Oxygen</option>
          <option value="dissolvedmethane">Dissolved Methane</option>
          <option value="pco2air">PCO2 Air</option>
          <option value="pco2water">PCO2 Water</option>
          <option value="chlorophyll">Chlorophyll</option>
          <option value="phycocyanin">Phycocyanin</option>
          <option value="phycoerythrin">Phycoerythrin</option>
          <option value="turbidity">Turbidity</option>
          <option value="scattering">Scattering Coefficient</option>
          <option value="cdom">CDOM</option>
        </select>
      </div>

      <button onClick={fetchAPIData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      <div style={{ marginTop: '20px' }}>
        {responseData ? (
          <pre style={{ textAlign: 'left', padding: '20px', background: '#f0f0f0' }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        ) : (
          <p>No data fetched yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
