import React, { createContext, useCallback, useEffect, useState } from 'react';
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();


export const UserStorage = ({children}) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(null);

    const navigate = useNavigate();

    const userLogout = useCallback(async () => {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);

        localStorage.removeItem('token');
        navigate('/login');
    },[navigate])

    useEffect(() => {
        const autoLogin = async() =>{
            const token = localStorage.getItem('token')
            if(token) {
                try{
                    setError(null);
                    setLoading(true);
                    const {url,options} = TOKEN_VALIDATE_POST(token);
                
                    const response = await fetch(url,options);
                    if(!response.ok) throw new Error('Token inválido');
                    
                    await getUser(token) 
                }catch(err){
                    userLogout();
                    setError(err);
                }finally{
                 setLoading(false);
                }

            }else {
                setLogin(false);
            }
        }
        autoLogin();
    },[userLogout])

    const getUser = async(token) => {
        const {url,options} = USER_GET(token);
        const response = await fetch(url,options);
        const json = await response.json();

        setData(json);
        setLogin(true)
    }

    const userLogin = async (username,password) => {
        try{
            setError(null);
            setLoading(true);
            const {url, options} = TOKEN_POST({username, password});
            const tokenRes = await fetch(url,options);
            if(!tokenRes.ok) throw new Error(`Error: Usuário inválido`);
            const {token} = await tokenRes.json();
            localStorage.setItem('token', token);
            await getUser(token);
            navigate('/conta');
        }catch(err) {
            setError(err.message);
            setLogin(false);
        }finally {
            setLoading(false);
        }
    }

    

    return (
        <UserContext.Provider value={{userLogin, userLogout, data, error, login, loading}}>
            {children}
        </UserContext.Provider>
    )
}