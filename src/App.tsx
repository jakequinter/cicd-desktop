import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Actions from '../src/pages/Actions';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Org from '../src/pages/Org';
import ReadMe from '../src/pages/ReadMe';
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
            <Route path="/:org/:repo/readme" element={<ReadMe />} />
            <Route path="/:org/:repo/actions" element={<Actions />} />
          </Routes>
        </OrgProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
