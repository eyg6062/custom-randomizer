import Header from './components/Header'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import './App.css'
import RandomizerPage from './pages/RandomizerPage'

function TestApp() {
    return(
        <main>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="about" element={<About />} />
                <Route path="randomizer/:id" element={<RandomizerPage />} />
            </Routes>
        </main>
    )
}

export default TestApp