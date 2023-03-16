import '../styles/globals.css'

//INTERNAL IMPORT
import { AuthProvider } from '../Context/AuthContext';
import { NavBar } from '../Components/index';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  </div>
);

export default MyApp; 
