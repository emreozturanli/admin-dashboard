import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './context/AuthContext';
import DbContextProvider from './context/DbContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthContextProvider>
      <DbContextProvider>
        <Toaster/>
        <AppRouter />
      </DbContextProvider>
    </AuthContextProvider>
  );
}

export default App;
