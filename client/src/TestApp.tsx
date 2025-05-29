import './index.css'
import reactLogo from './assets/react.svg'
import Header from './components/Header'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

function TestApp() {
    return(
        <main>
            <img src={reactLogo} width="40px"/>
            <h1>meep</h1>
            
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </main>
    )
}

export default TestApp