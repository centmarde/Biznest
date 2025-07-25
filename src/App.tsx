import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/hero'
import MoreInfo from './pages/moreInfo'
import Home from './pages/home'
import Map from './pages/map'
import MapPage from './pages/map_ai'
import MaintenanceCards from './pages/maintenance'
import ModelsPage from './pages/models'
import BiznestForm from './pages/biznest/form'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* outside pages */}
          <Route path="/" element={<Hero />} />
          {/*  end of outside  pages*/}

          {/* inside  pages*/}
          <Route path="/more-info" element={<MoreInfo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/maps/view" element={<Map />} />
          <Route path="/maps/ai" element={<MapPage />} />
          <Route path="/maintenance" element={<MaintenanceCards />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/biznest/form" element={<BiznestForm />} />
          {/* inside */}
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  )
}

export default App
