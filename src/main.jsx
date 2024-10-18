import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root.jsx";
import HomePage from "./pages/HomePage.jsx";
import MovieDetail from "@pages/MovieDetail";
import Watch from "@pages/Watch";
import SingleMovie from "@pages/SingleMovie";
import TVSeries from "@pages/TVSeries";
import CartoonMovie from "@pages/CartoonMovie";
import SearchPage from "@pages/SearchPage";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import ManageMovie from "@pages/Admin/Movie/ManageMovie";
import CreateMovie from "@pages/Admin/Movie/CreateMovie";
import EditMovie from "@pages/Admin/Movie/EditMovie";
import UserProfile from "@pages/UserProfile";
import ModalProvider from "./context/ModalProvider";
import ManageComment from "@pages/Admin/ManageComment";
import ManageUser from "@pages/Admin/User/ManageUser";
import EditUser from "@pages/Admin/User/EditUser";

const router = createBrowserRouter([
    {
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/info/:slug",
                element: <MovieDetail />,
            },
            {
                path: "/watch/:slug",
                element: <Watch />,
            },
            {
                path: "/movie",
                element: <SingleMovie />,
            },
            {
                path: "/tv",
                element: <TVSeries />,
            },
            {
                path: "/cartoon",
                element: <CartoonMovie />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
        ],
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/profile",
        element: <UserProfile />,
    },
    {
        path: "/admin/movie",
        element: <ManageMovie />,
    },
    {
        path: "/admin/movie/create",
        element: <CreateMovie />,
    },
    {
        path: "/admin/movie/edit",
        element: <EditMovie />,
    },
    {
        path: "/comment/:id",
        element: <ManageComment />,
    },
    {
        path: "/admin/user",
        element: <ManageUser />,
    },
    {
        path: "admin/user/edit",
        element: <EditUser />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ModalProvider>
            <RouterProvider router={router} />
        </ModalProvider>
    </StrictMode>,
);
