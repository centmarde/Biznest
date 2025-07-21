import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/hero'
import MoreInfo from './pages/moreInfo'
import Home from './pages/home'
import Map from './pages/map'
import MapPage from './pages/map_ai'
import MaintenanceCards from './pages/maintenance'
import ModelsPage from './pages/models'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/more-info" element={<MoreInfo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/maps/view" element={<Map />} />
          <Route path="/maps/ai" element={<MapPage />} />
          <Route path="/maintenance" element={<MaintenanceCards />} />
          <Route path="/models" element={<ModelsPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  )
}

export default App
