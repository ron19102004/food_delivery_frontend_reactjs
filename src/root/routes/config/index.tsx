import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import React from 'react'
import PersonalLayout from "../../pages/personal/index.layout";
import {HomePersonalPage} from "../../pages/personal/index.page";
import AuthenticationLayout from "../../authentication/index.layout";
import { LoginFormPage } from "../../authentication/index.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet/>,
    children: [
      //Personal page configuration routes
      {
        path: "",
        element: <PersonalLayout/>,
        children:[
          {
            path: "",
            element: <HomePersonalPage/>,
          }
        ]
      },
      //Authentication page configuration routes
      {
        path: "auth",
        element: <AuthenticationLayout/>,
        children:[
          {
            path:"login",
            element: <LoginFormPage/>
          }
        ]
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  }
]);
const RouterPagesProvider:React.FC = () => {
  return <RouterProvider router={router}/>;
}

export default RouterPagesProvider