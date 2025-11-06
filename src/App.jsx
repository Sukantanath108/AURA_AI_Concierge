import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPortal from './components/UserPortal'
import ProviderDashboard from './components/ProviderDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPortal />} />
        <Route path="/provider" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

