import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext';
import Auth from './views/Auth';
import Browse from './views/Browse/Browse';

function App() {
  /* including user console log below for dev purposes - remove later */
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="App">
      <h1>NoshBook</h1>
      <Router>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path="/" element={<Browse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
