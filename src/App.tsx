import { Route, Routes } from "react-router-dom";
import "./globals.css";
import { SigninForm } from "./_auth/forms/SIgninForm";
import { Home } from "./_root/pages";
import { SignupForm } from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import Rootlayout from "./_root/Rootlayout";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private routes */}
        <Route element={<Rootlayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
