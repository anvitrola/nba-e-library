import { Suspense } from "react";
import "./styles/global.css";
import { AppBg, AppBody } from "./styles/App.styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter([{ ...routes }]);

function App() {
  return (
    <AppBody>
      <AppBg />
      <Suspense fallback={<div>Loading</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AppBody>
  );
}

export default App;
