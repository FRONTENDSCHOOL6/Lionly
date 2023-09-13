import pb from "@/api/pocketbase";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
export  const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    setIsLoading(true);
    
    if (pb.authStore.isValid) {
      setIsLoggedIn(true);
    } else {
  
      setIsLoggedIn(false);
    }

    pb.authStore.onChange((isValid) => { //localStorage 값 변화 시
      setIsLoggedIn(isValid);
      setIsLoading(false); 
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading  }}>
      {children}
    </AuthContext.Provider>
  );
}

function useIsLogin(){ // 로그인 인증여부
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  
  useEffect(()=>{
    if (!pb.authStore.isValid) { // 로그인 토큰이 없는데 강제로 주소 접속했을때 거부하는 조건 
      navigate('/signin');
    } 
    if(!isLoading && !isLoggedIn){ // 만약 로딩이 끝났는데도 불구하고 로그인이 안 되어 있다면,
      navigate('/signin'); // 사용자를 로그인 페이지로 리다이렉트 
    }else if(isLoggedIn && !isLoading){
      // <Spinner/>
    }
  }, [isLoading, isLoggedIn]) 
}

export default useIsLogin;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
