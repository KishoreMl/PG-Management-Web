import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { RoomsPage } from './components/RoomsPage/RoomsPage';
import { BranchesPage } from './pages/BranchesPage/BranchesPage';
import { Header } from './components/Header/Header';
import './App.css';
function App() {
  
  return (
    <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route path='/' exact element={<BranchesPage />}/>
            <Route path='/rooms' element={<RoomsPage />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
