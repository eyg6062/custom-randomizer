import Header from './components/Header'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import './App.css'
import RandomizerPage from './pages/RandomizerPage'
import RandomizerEditPage from './pages/RandomizerEditPage'
import { TraitEditPage } from './pages/TraitEditPage'
import ErrorFallbackPage from './pages/ErrorFallbackPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home />, errorElement: <ErrorFallbackPage /> },
            { path: "dashboard", element: <Dashboard />, errorElement: <ErrorFallbackPage /> },
            { path: "about", element: <About />, errorElement: <ErrorFallbackPage />},
            { path: "randomizer/:id", element: <RandomizerPage />, errorElement: <ErrorFallbackPage />},
            { path: "randomizer/:id/edit", element: <RandomizerEditPage />, errorElement: <ErrorFallbackPage />},
            { path: "trait/:id/edit", element: <TraitEditPage />, errorElement: <ErrorFallbackPage />},
        ]
    },
])

function Layout() {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    )
}

function TestApp() {
    return(
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default TestApp