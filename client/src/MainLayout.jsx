import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { UserContextProvider } from "./context";

export default function MainLayout() {
    return(
        <UserContextProvider>
            <main>
                <NavBar />
                <Outlet />
            </main>
        </UserContextProvider>
    )
}