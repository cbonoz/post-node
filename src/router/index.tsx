import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import SignInPage from "../pages/auth/SignInPage.tsx";
import SignUpPage from "../pages/auth/SignUpPage.tsx";
import ProtectedPage from "../pages/ProtectedPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import AppsPage from '../pages/apps/AppsPage.tsx';
import AppDetailPage from '../pages/apps/AppDetailPage.tsx';
import CardCreatePage from '../pages/cards/CardCreatePage.tsx';
import CardSendPage from '../pages/cards/CardSendPage.tsx';

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUpPage />,
      },
      // Auth Protected routes
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/protected",
            element: <ProtectedPage />,
          },
          {
            path: "/cards",
            element: <AppsPage/>
          },
          {
            path: "/apps/:id",
            element: <AppDetailPage/>
          },
          {
            path: "/cards/create",
            element: <CardCreatePage />
          },
          {
            path: "/cards/send",
            element: <CardSendPage />
          }
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
