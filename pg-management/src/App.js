import './App.css';
import { RoomsPage } from './components/RoomsPage/RoomsPage';
import { BranchesPage } from './components/BranchesPage/BranchesPage';
import { Header } from './components/Header/Header';
function App() {
  
  return (
    <div className="App">
        <Header />
        <RoomsPage />
    </div>
  );
}

export default App;
