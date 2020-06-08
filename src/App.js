import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/packing_status_view">Packing Data Access</Link>
        </li>
        <li>
          <Link to="/sales_by_sku_view">Sales By SKU</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
