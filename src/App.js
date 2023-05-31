import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar.tsx';
import HomePage from './components/Homepage/HomePage.tsx';
import Login from './components/Authentication/Login.tsx';
import Register from './components/Authentication/Register.tsx';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
]);

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
