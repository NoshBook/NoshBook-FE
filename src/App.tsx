import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList/RecipeList';
import TestHeader from './components/TestHeader';
import { AuthProvider } from './context/AuthContext';
import Auth from './views/Auth';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        {/* <TestHeader /> */}
        <h1>NoshBook</h1>
        <Router>
          <Routes>
            <Route path='/' element={<RecipeList />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
