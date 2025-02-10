import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import AllPosts from "./pages/all-posts/AllPosts"
import FormAction from "./pages/form-action/FormAction"
import Preview from "./pages/preview/Preview"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Navigate to="/all-posts" replace /> },
      { path: "all-posts", element: <AllPosts /> },
      { path: "add-new", element: <FormAction /> },
      { path: "edit/:id", element: <FormAction /> },
      { path: "preview", element: <Preview /> },
    ],
  },
])


function App() {
  return (
    <div  className="mx-8 my-5 md:mx-14 md:my-8">
      <RouterProvider router={router}/>
    </div>
 )
}

export default App
