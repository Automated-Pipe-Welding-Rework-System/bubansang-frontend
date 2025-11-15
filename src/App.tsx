import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LiveMonitor from './pages/LiveMonitor';
import QCPortal from './pages/QCPortal';
import Management from './pages/Management';
import ScheduleCockpit from './pages/ScheduleCockpit';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LiveMonitor />} />
          <Route path="/qc-portal" element={<QCPortal />} />
          <Route path="/management" element={<Management />} />
          <Route path="/schedule" element={<ScheduleCockpit />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
