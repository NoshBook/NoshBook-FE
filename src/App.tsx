import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import { useAuth } from './context/AuthContext';
import Auth from './views/Auth';
import Browse from './views/Browse/Browse';
import Planner from './views/Planner/Planner';
import ShoppingListView from './views/ShoppingListView/ShoppingListView';

function App() {
  /* including user console log below for dev purposes - remove later */
  const { user } = useAuth();
  console.log(user);

  return (
    <div className='App'>
      <Header />
      <h1>NoshBook</h1>
      <Router>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/shoppinglist' element={
            <PrivateRoute>
              <ShoppingListView />
            </PrivateRoute>
          } />
          <Route path='/' element={<Browse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
