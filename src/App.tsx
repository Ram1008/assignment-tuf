import './app.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/home/Home';
import Admin from './containers/admin/Admin';
import { HomeProvider } from './context/homeContext/HomeState'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <HomeProvider><Home /></HomeProvider>
        } />
        <Route path="/admin" element={
          <HomeProvider><Admin /></HomeProvider>  
        } />
        
      </Routes>
    </Router>
  );
}

export default App;
