import { useState } from 'react';
import UdiTable from './UdiTable';
import './App.css';
import type { Udi } from './UdiTable';

// https://open.fda.gov/apis/device/udi/
// https://api.fda.gov/device/udi.json?search=company_name:%22Fuji%22&limit=100
// https://tanstack.com/table/v8/docs/guide/installation
// https://tanstack.com/table/v8/docs/examples/react/basic

const apiKey = import.meta.env.VITE_API_KEY;
const limit = 100;

function App() {
  const [results, setResults] = useState<Udi[]>([]);
  const [companyName, setCompanyName] = useState('JEOL');

  const handleSearch = () => {
    const url = `https://api.fda.gov/device/udi.json?api_key=${apiKey}&search=company_name:"${companyName}"&limit=${limit}`;

    fetch(url)
      .then((response) => {
        if(!response.ok) {
          alert('検索できませんでした。');
        }
        return (response.json());
      })
      .then((data: any) => {
        const udiArray: Udi[] = data.results.reduce(
          (prev: Udi[], current: any) => [
            ...prev,
            {
              id: current.id,
              brandName: current.brand_name,
              productCode: current.product_codes[0].code,
              productName: current.product_codes[0].name,
              gmdnName: current.gmdn_terms[0].name,
              publishDate: current.publish_date,
            },
          ],
          []
        );
        setResults([...udiArray]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <h1>企業で検索</h1>
      <label htmlFor="company-name">企業名:</label>
      <input
        type="text"
        id="company-name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div className="card">
        <button className="button" onClick={handleSearch}>
          検索
        </button>
      </div>
      <UdiTable data={results} />
      <p className="read-the-docs">
        APIドキュメントは<a href="https://open.fda.gov/apis/">こちら</a>
      </p>
    </div>
  );
}

export default App;
