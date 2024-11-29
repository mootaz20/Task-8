import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter basename="/Task-8/">
        <div>
          <AppRouter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
