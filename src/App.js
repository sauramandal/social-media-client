import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import { AuthProvider } from './context/auth'
import AuthRoute from './utils/auth/AuthRoute'
import './App.css'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <AuthRoute exact path="/login" element={<Login />} />
                        <AuthRoute exact path="/register" element={<Register />} />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    )
}

export default App
