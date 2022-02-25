import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Browse from './views/Browse/Browse';

function App() {
  return (
    <div className="App">
      <h1>NoshBook</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Browse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
