import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList/RecipeList';
import { useAuth } from './context/AuthContext';
import Auth from './views/Auth';

function App() {
  /* including user console log below for dev purposes - remove later */
  const { user } = useAuth();
  console.log(user);

  return (
    <div className='App'>
      <h1>NoshBook</h1>
      <Router>
        <Routes>
          <Route path='/' element={<RecipeList />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
