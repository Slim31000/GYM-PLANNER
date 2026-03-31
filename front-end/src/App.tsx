import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Navbar from "./components/layout/Navbar";
import { Providers } from "./components/layout/providers";
import AuthProvider from "./context/AppContext";

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/:pathname" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/account/:pathname" element={<Account />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Toaster richColors />
            </main>
          </div>
        </Providers>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
