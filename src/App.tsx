import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import Auth from './views/Auth/Auth';
import Browse from './views/Browse/Browse';
import Planner from './views/Planner/Planner';
import ShoppingListView from './views/ShoppingListView/ShoppingListView';
import RecipeDetail from './views/Recipe/RecipeDetail';
import RecipeCreateEdit from './views/Recipe/RecipeCreateEdit';
import CookBook from './views/CookBook/CookBook';
import About from './views/About/About';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/planner"
            element={
              <PrivateRoute>
                <Planner />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopping"
            element={
              <PrivateRoute>
                <ShoppingListView />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes/new"
            element={
              <PrivateRoute>
                <RecipeCreateEdit isCreating={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes/edit/:id"
            element={
              <PrivateRoute>
                <RecipeCreateEdit />
              </PrivateRoute>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetail isCookbookView={false} />} />
          <Route
            path="/cookbook/:id"
            element={
              <PrivateRoute>
                <RecipeDetail isCookbookView={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cookbook"
            element={
              <PrivateRoute>
                <CookBook />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Browse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
