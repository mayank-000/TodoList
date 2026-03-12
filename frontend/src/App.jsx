import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CheckAuth } from './service/auth.jsx';
import { ProtectedRoute } from './service/protected.jsx';
import Register from './pages/SignUp';
import Home from './pages/Home';

function App() {
    return (
        <CheckAuth>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
                </Routes>
            </Router>
        </CheckAuth>
    )
}
export default App;