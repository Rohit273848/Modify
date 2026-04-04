import { createBrowserRouter } from "react-router-dom";
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register'
import Home from "./features/home/pages/Home";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
 
export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },{
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
    }
])


