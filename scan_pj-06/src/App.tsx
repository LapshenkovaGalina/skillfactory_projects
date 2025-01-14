import { createContext, Dispatch, useState } from 'react';
import './App.css';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AuthInit from './AuthInit';
import { Router } from './Router';

export type AccessTokenType = string | null;
export type AuthContextType = {accessToken: AccessTokenType, setAccessToken: Dispatch<React.SetStateAction<AccessTokenType>>} | null;
export const AuthContext = createContext<AuthContextType>(null)

function App() {
  const [accessToken, setAccessToken] = useState<AccessTokenType>(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <div className="App">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Prosto+One&family=Rubik+Mono+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Prosto+One&family=Rubik+Mono+One&display=swap" rel="stylesheet"></link>
        <AuthInit/>
        <AppHeader />
        <Router />
        <AppFooter />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
