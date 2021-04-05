import './App.css';
import { setupWorker } from 'msw';
import { useState, useEffect } from 'react';
import useFetch from 'use-http'
import Dashboard from './components/Dashboard'

if (process.env.NODE_ENV === 'development') {
  const { handlers } = require('./mocks/handlers');
  const worker = setupWorker(...handlers);
  worker.start();
}

function App() {
  const [data, setData] = useState([])
  const { get, post, response, loading, error } = useFetch('http://localhost:3000')

  useEffect(() => {
    loadInitialData();
  }, [])

  async function loadInitialData() {
    const res = await get('/config');
    if (response.ok) setData(response.json)
  }

  return (
    <Dashboard />
  );
}

export default App;


