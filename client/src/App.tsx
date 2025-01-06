import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {LoginForm} from './features/auth/LoginForm';
import {RegisterForm} from './features/auth/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
