import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Actions from '../src/pages/Actions';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Org from '../src/pages/Org';
import ReadMe from '../src/pages/ReadMe';
import Container from './components/Container';
import { AuthProvider } from './context/AuthContext';
import { OrgProvider } from './context/OrgContext';
import ScrollToTop from './utils/scrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <OrgProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/:org" element={<AuthedRoute />}>
              <Route index element={<Org />} />
              <Route path=":repo/readme" element={<ReadMe />} />
              <Route path=":repo/actions" element={<Actions />} />
            </Route>
          </Routes>
        </OrgProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

const AuthedRoute = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
