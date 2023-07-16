import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Org from '../src/pages/Org';
import { AuthProvider } from './context/AuthContext';
import { OrgProvider } from './context/OrgContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrgProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:org" element={<Org />} />
          </Routes>
        </OrgProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
