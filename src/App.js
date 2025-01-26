import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Faq from './faq/FAQ';
import Schedule from './schedule/Schedule';
import Sponsors from './sponsors/Sponsors';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/sponsors" element={<Sponsors />} />

    </Routes>
    </Router>
  );
}

export default App;
