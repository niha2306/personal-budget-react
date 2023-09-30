import './App.css';

import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';

import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    <Router >
      <Menu />
      <Hero />
      <div className='mainContainer'>
        <Routes >
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />  
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
