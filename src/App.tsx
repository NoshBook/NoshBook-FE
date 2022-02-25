import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList/RecipeList';

function App() {
  return (
    <div className="App">
      <h1>NoshBook</h1>
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
