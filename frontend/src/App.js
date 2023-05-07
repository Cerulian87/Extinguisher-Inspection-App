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
import RegisterPage from './pages/RegisterPage';
import BoxInspection from './pages/BoxInspection';
import MaintExtinguisherInspection from './pages/MaintExtinguisherInspection';
import MaintBoxRepair from './pages/MaintBoxRepair';
import TechInspectionPage from './pages/TechInspectionPage';
import ExtinguisherForm from './pages/ExtinguisherForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <AuthProvider>
            <Header />
          <Routes>
            <Route element={<PrivateRoute><HomePage/></PrivateRoute>} path='/' exact/>
            <Route element={<PrivateRoute><InspectorPage/></PrivateRoute>} path='/inspectorpage' exact/>
            <Route element={<PrivateRoute><Inspection/></PrivateRoute>} path='/inspection' exact/>
            <Route element={<PrivateRoute><MaintExtinguisherInspection/></PrivateRoute>} path='/maintExtinguisher' exact/>
            <Route element={<PrivateRoute><MaintBoxRepair/></PrivateRoute>} path='/maintBox' exact/>
            <Route element={<PrivateRoute><BoxInspection/></PrivateRoute>} path='/boxInspection' exact/>
            <Route element={<PrivateRoute><MaintainerPage/></PrivateRoute>} path='/maintainerpage' exact/>
            <Route element={<PrivateRoute><SupervisorPage/></PrivateRoute>} path='/supervisorpage' exact/>
            <Route element={<PrivateRoute><TechnicianPage/></PrivateRoute>} path='/technicianpage' exact/>
            <Route element={<PrivateRoute><TechInspectionPage/></PrivateRoute>} path='/techInspectionPage' exact/>
            <Route element={<PrivateRoute><ExtinguisherForm/></PrivateRoute>} path='/extinguisherForm' exact/>
            <Route element={<LoginPage/>} path='/login' />
            <Route element={<RegisterPage/>} path='/register' />
          </Routes>
          </AuthProvider>
        </Router>
      </header>
      <footer id="footer"/>
    </div>
  );
}

export default App;
