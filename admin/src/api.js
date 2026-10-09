import axios from 'axios';
export const API_URL=import.meta.env.VITE_API_URL||'http://localhost:8000/api';
export const api=axios.create({baseURL:API_URL});
api.interceptors.request.use(c=>{const t=localStorage.getItem('ah_admin_token');
    if(t)c.headers.Authorization=`Bearer ${t}`;return c});
    api.interceptors.response.use(r=>r,e=>
        {
            if
            (e.response?.status===401&&localStorage.getItem('ah_admin_token'))
                {
                    localStorage.removeItem('ah_admin_token');
                    localStorage.removeItem('ah_admin_user');
                    window.location.reload()}return Promise.reject(e)
                });
