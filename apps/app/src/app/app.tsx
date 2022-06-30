// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { NewPost } from './components/NewPost';

export function App() {
  return (
    <BrowserRouter>
      <header className="mb-4 p-2 bg-blue-100 flex items-center justify-between">
        <h1 className="p-2 text-4xl ">Microblog</h1>
        <nav className="flex justify-end">
          <ul className="flex justify-end gap-8">
            <li className="text-blue-800">
              <Link to="/">Home</Link>
            </li>
            <li className="text-blue-800">
              <Link to="/newpost">Create post</Link>
            </li>
            <li className="text-blue-800">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
