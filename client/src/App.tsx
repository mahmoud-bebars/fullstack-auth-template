import { useState, useEffect, createElement } from "react";
import { Router } from "@/types/common.types";
import { Route, Routes } from "react-router-dom";
import { routes } from "@/routes";

import { TITLE } from "@/constants/env";

import { Home, Login, NotFound, Register } from "./pages/index";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

import Layout from "@/layout";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [title, setTitle] = useState(TITLE);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Toaster position="top-center" closeButton />
        <Routes>
          <Route path="/" element={<Layout setTitle={setTitle} />}>
            <Route index element={<Home />} />
            {routes.map(({ element, path }: Router, index: number) => (
              <Route key={index} path={path} element={createElement(element)} />
            ))}
          </Route>
          <Route path="/register" element={<Register setTitle={setTitle} />} />
          <Route path="/login" element={<Login setTitle={setTitle} />} />
          <Route path="*" element={<NotFound setTitle={setTitle} />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
