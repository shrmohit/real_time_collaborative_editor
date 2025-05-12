import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditorPage from "./components/EditorPage";
import Home from "./components/Home";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/editor/:roomId",
      element: <EditorPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
