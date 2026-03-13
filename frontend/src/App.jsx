import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CheckAuth } from './service/auth.jsx';
import { ProtectedRoute } from './service/protected.jsx';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import './app.css'

function App() {
    return (
        <CheckAuth>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/register" replace />}></Route>
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
                </Routes>
            </Router>
        </CheckAuth>
    )
}
export default App;