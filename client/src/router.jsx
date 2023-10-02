import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./MainLayout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SingupPage from "./pages/SignupPage"
import CreatePost from "./pages/CreatePost"
import PostPage from "./pages/PostPage"
import EditPost from "./pages/EditPost"

const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout />, children: [
            { index: true, element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SingupPage/> },
            { path: "/create", element: <CreatePost /> },
            { path: "/post/:id", element: <PostPage /> },
            { path: "/edit/:id", element: <EditPost /> }
        ]
    }
])

export default router