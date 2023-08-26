import { createContext, useContext } from "react";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import { LoginContext } from "./LoginContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

function App() {
  const [userInfo, setUserInfo] = useState(null)

  const handleLogin = async (res) => {
    if(res.status == 200) {
      const data = await res.json()
      setUserInfo(data)
    }
  }

  useEffect(()=>{
    fetch('/api/getUserInfo').then(handleLogin)
  }, [])
  
  return (
    <BrowserRouter>
      <LoginContext.Provider value={[userInfo, setUserInfo]}>
        <Toaster />
        <_App />
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

function _App() {
  let [user, setUser] = useContext(LoginContext);
  if (user == null) return <Login />;
  return <Dashboard />;
}

export default App;

// const user1 = {
//   name: "Aman Kumar",
//   stage_user: 0,
//   isApplicant: true,
// };

// const user2 = {
//   name: "Aman_",
//   stage_user: 0,
//   isApplicant: false,
// };
