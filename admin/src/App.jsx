import {useState} from 'react';
import {api} from './api';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';
export default function App()
{
    const [auth,setAuth]=useState(!!localStorage.getItem('ah_admin_token'));
    async function logout()
    {
        try
        {
            await api.post('/admin/logout')
        }   catch(e){}localStorage.removeItem('ah_admin_token');
           localStorage.removeItem('ah_admin_user');
           setAuth(false)}
        
        return auth ? <Dashboard onLogout={logout}/> : <Login onLogin={()=>setAuth(true)}/>
    }
