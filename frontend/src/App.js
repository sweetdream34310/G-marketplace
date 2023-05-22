import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster toastOptions={{
        className: '',
        duration: 5000,
        style: {
          borderRadius: '10px',
          background: '#1c81bb',
          color: '#fff',
          // animationTimeline: '3000'
        },
      }} />
    </BrowserRouter>
  );
}

export default App;
