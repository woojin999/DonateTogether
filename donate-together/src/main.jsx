import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Donate from "./pages/Donate.jsx";
import Campaign from "./pages/Campaign.jsx";
import MyDonate from "./pages/MyDonate.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DonateDetail from "./pages/DonateDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyPage from "./pages/MyPage.jsx";
import LoginCallback from "./components/LoginCallback.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "join",
        element: <Register/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "kakaologin",
        element: <LoginCallback/>
      },
      {
        path: "mypage",
        element: <MyPage/>
      },
      {
        path: "campaign",
        element: <Campaign />,
      },
      {
        path: "mydonate",
        element: <MyDonate />,
      },
      {
        path: "donate",
        element: <Donate />,
      },
      {
        path: "donates/:id",
        element: <DonateDetail />,
      },
      {
        path: "search",
        element: <SearchPage/>
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  // </StrictMode>
);
