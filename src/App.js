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
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                    {/* <Route exact path="/posts/:postId" component={SinglePost} /> */}
                </Container>
            </Router>
        </AuthProvider>
    )
}

export default App
