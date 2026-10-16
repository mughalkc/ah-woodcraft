import {useEffect,useState} from 'react';
import {LogOut,Plus,Trash2,Edit3,Package,MessageCircle} from 'lucide-react';
import {api} from '../api';
const cats=['Tables','Chairs','Beds','Kitchen Accessories','Furniture','Decoration'];
const blank={name:'',category:'Tables',description:'',price:'',image_url:''};
export default function Dashboard({onLogout}){
    const [products,setProducts]=useState([]),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[msg,setMsg]=useState('');
    async function load(){
        try{const r=await api.get('/products');setProducts(r.data.data||r.data)}catch(e){setMsg('Could not load products. Make sure Laravel API is running.')}}
        useEffect(()=>{load()},[]);function change(e){setForm({...form,[e.target.name]:e.target.value})}
        async function save(e){e.preventDefault();
            try{
                if(editing){await api.put(`/admin/products/${editing}`,form)}
                else{await api.post('/admin/products',form)}setForm(blank);setEditing(null);setMsg('Product saved successfully.');load()}
                catch(e){setMsg(e.response?.data?.message||'Could not save product.')}}async function remove(id){if(!confirm('Delete this product?'))
                    return;
                    try{await api.delete(`/admin/products/${id}`);load()}
                    catch(e){setMsg('Could not delete product.')}}
                    function edit(p){setEditing(p.id);setForm({name:p.name,category:p.category,description:p.description||'',price:p.price||'',image_url:p.image_url||''});
                    window.scrollTo({top:0,behavior:'smooth'})}function pickImage(e){const file=e.target.files&&e.target.files[0];if(!file)return;
                    if(!file.type.startsWith('image/')){setMsg('Please choose an image file.');return}
                    const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{const max=1000;let w=img.width,h=img.height;
                    if(w>max||h>max){const s=max/Math.max(w,h);w=Math.round(w*s);h=Math.round(h*s)}const c=document.createElement('canvas');
                    c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);
                    setForm(f=>({...f,image_url:c.toDataURL('image/jpeg',0.8)}));setMsg('')};img.onerror=()=>setMsg('Could not read this image. Please try another one.');
                    img.src=reader.result};reader.readAsDataURL(file)}return <div className="min-h-screen">
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
            <div><b className="text-xl">AR <span className="text-amber-800">WOODCRAFT</span></b>
            <span className="ml-3 rounded-full bg-stone-100 px-3 py-1 text-xs font-bold">ADMIN</span></div>
            <button onClick={onLogout} className="flex items-center gap-2 text-sm font-bold text-stone-600">
     <LogOut size={17}/> Logout</button></div></header><main className="mx-auto max-w-7xl space-y-8 px-5 py-8">
          <div className="grid gap-5 md:grid-cols-3"><div className="rounded-2xl bg-stone-900 p-6 text-white">
          <Package/><div className="mt-4 text-3xl font-black">{products.length}</div>
         <div className="text-sm text-stone-300">Products</div></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm"><MessageCircle className="text-green-600"/>
         <div className="mt-4 text-xl font-black">0320-9408283</div><div className="text-sm text-stone-500">WhatsApp orders</div></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm"><div className="text-3xl font-black">∞</div>
          <div className="mt-1 text-sm text-stone-500">Custom orders</div></div></div>{msg&&<div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{msg}</div>}
         <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-black">{editing?'Edit product':'Add new product'}</h1>
          <p className="mt-1 text-sm text-stone-500">Price is optional. Leave it empty to show “Price on WhatsApp”.</p></div>
          {editing&&<button onClick={()=>{setEditing(null);setForm(blank)}} className="text-sm font-bold">Cancel</button>}</div>
             <form onSubmit={save} className="mt-6 grid gap-4 md:grid-cols-2"><input name="name" value={form.name} onChange={change} placeholder="Product name" required className="rounded-xl border border-stone-200 p-3 outline-none"/>                   
              <select name="category" value={form.category} onChange={change} className="rounded-xl border border-stone-200 p-3 outline-none">{cats.map(c=><option key={c}>{c}</option>)}</select>
          <input name="price" value={form.price} onChange={change} placeholder="Price (optional), e.g. 45000" type="number" min="0" className="rounded-xl border border-stone-200 p-3 outline-none"/>
          <div className="rounded-xl border border-dashed border-stone-300 p-4 md:col-span-2"><label className="text-sm font-bold">Product picture</label><input key={form.image_url?'has':'none'} type="file" accept="image/*" onChange={pickImage} className="mt-2 block w-full text-sm file:mr-3 file:cursor-pointer file:rounded-xl file:border-0 file:bg-stone-900 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-white hover:file:bg-stone-800"/>
          <p className="mt-1 text-xs text-stone-500">Choose a picture from your phone or computer gallery, or paste an image link below.</p>{form.image_url&&<div className="mt-3 flex items-center gap-3">
            <img src={form.image_url} className="h-24 w-24 rounded-xl object-cover" onError={e=>e.currentTarget.style.display='none'}/><button type="button" onClick={()=>setForm({...form,image_url:''})} className="text-sm font-bold text-red-600">Remove picture</button></div>}{!form.image_url.startsWith('data:')&&<input name="image_url" value={form.image_url} onChange={change} placeholder="Or paste image link (https://...)" className="mt-3 w-full rounded-xl border border-stone-200 p-3 outline-none"/>}</div>
          <textarea name="description" value={form.description} onChange={change} placeholder="Short description" rows="3" className="rounded-xl border border-stone-200 p-3 outline-none md:col-span-2"/>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 font-bold text-white md:col-span-2">
            <Plus size={18}/>{editing?'Update product':'Add product'}</button></form></section>
            <section>
                <h2 className="mb-4 text-2xl font-black">All products</h2><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map(p=><div key={p.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    <img src={p.image_url} className="h-48 w-full object-cover" onError={e=>e.currentTarget.style.display='none'}/>
                    <div className="p-5"><div className="text-xs font-bold uppercase tracking-wider text-amber-800">{p.category}</div>
                    <h3 className="mt-1 text-lg font-black">{p.name}</h3><p className="mt-2 text-sm text-stone-500">{p.description}</p>
                    <div className="mt-4 flex items-center justify-between"><b>{p.price?`Rs. ${Number(p.price).toLocaleString()}`:'WhatsApp price'}</b>
                    <div className="flex gap-2"><button onClick={()=>edit(p)} className="rounded-lg bg-stone-100 p-2"><Edit3 size={16}/>
                    </button><button onClick={()=>remove(p.id)} className="rounded-lg bg-red-50 p-2 text-red-600"><Trash2 size={16}/></button></div></div></div></div>)}</div></section></main></div>}
