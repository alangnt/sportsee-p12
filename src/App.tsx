import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header';
import HomeComponent from './components/Home';
import SidebarComponent from './components/Sidebar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full h-screen">
        <HeaderComponent />
        <main className="flex grow min-h-0 overflow-hidden">
          <SidebarComponent />
          <Routes>
            <Route path="/user/:userId" element={<HomeComponent />} />
            <Route path="*" element={<Navigate to="/user/12" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
