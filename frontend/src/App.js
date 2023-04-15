import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import InspectorPage from './pages/InspectorPage'
import Inspection from './pages/Inspection'
import MaintainerPage from './pages/MaintainerPage'
import SupervisorPage from './pages/SupervisorPage'
import TechnicianPage from './pages/TechnicianPage'


function App() {
  return (
    <div className="App">
      {/* <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router> */}
      <header className="App-header">
       {/* <b>HOME PAGE!</b> */}
        {/* <LoginForm /> */}
        <Router>
          <AuthProvider>
            <Header />
          <Routes>
            <Route element={<PrivateRoute><HomePage/></PrivateRoute>} path='/' exact/>
            <Route element={<PrivateRoute><InspectorPage/></PrivateRoute>} path='/inspectorpage' exact/>
            <Route element={<PrivateRoute><Inspection/></PrivateRoute>} path='/inspection' exact/>
            <Route element={<PrivateRoute><MaintainerPage/></PrivateRoute>} path='/maintainerpage' exact/>
            <Route element={<PrivateRoute><SupervisorPage/></PrivateRoute>} path='/supervisorpage' exact/>
            <Route element={<PrivateRoute><TechnicianPage/></PrivateRoute>} path='/technicianpage' exact/>
            <Route element={<LoginPage/>} path='/login' />
          </Routes>
          </AuthProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
