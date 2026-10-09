import {useState,useEffect} from 'react';
import {MessageCircle, ArrowUpRight, X} from 'lucide-react';
const wa='923209408283';
export default function ProductCard({product})

    {
    const [zoom,setZoom]=useState(false);
    const big=(product.image_url||'').replace('w=900','w=1600');useEffect(()=>{if(!zoom)return;
    const onKey=e=>{if(e.key==='Escape')setZoom(false)};
    document.addEventListener('keydown',onKey);
    document.body.style.overflow='hidden';
    return()=>{
        document.removeEventListener('keydown',onKey);
        document.body.style.overflow=''}},[zoom]);
            const text=encodeURIComponent(`Assalam-o-Alaikum AH Woodcraft, mujhe is product ke baray mein information chahiye:\n\n
        Product: ${product.name}\nCategory: ${product.category}\n\n
        Please price aur details share kar dein.`);
         return <>
         <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div onClick={()=>setZoom(true)} className="relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-stone-100">
            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
            onError={e=>{e.currentTarget.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80'}}/>
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-700">
            {product.category}
            </span>
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-stone-900">
                            {product.name}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-stone-500">
                                {product.description}
                                </p>
                                </div>
                                <ArrowUpRight className="mt-1 text-stone-300 transition group-hover:text-amber-800"/>
                                </div>
                                <div className="mt-5 flex items-center justify-between gap-3">
                                    <div>
                                        {product.price ? 
                                        <>
                                        <span className="text-xs text-stone-400">
                                            Starting price
                                            </span>
                                            <div className="text-lg font-black text-stone-900">
                                                Rs. {Number(product.price).toLocaleString()}
                                                </div>
                                                </>
                                                :
                                                <span className="text-sm font-semibold text-stone-500">
                                                    Price on WhatsApp
                                                    </span>}
                                                    </div>
                                                    <a target="_blank" href={`https://wa.me/${wa}?text=${text}`} className="flex shrink-0 items-center gap-2 rounded-full bg-green-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-700">
                                                    <MessageCircle size={17}/>
                                                    Ask on WhatsApp</a></div></div></article>
                                                    {zoom&&<div onClick={()=>setZoom(false)} className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/85 p-4">
                                                        <button onClick={()=>setZoom(false)} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-stone-900 hover:bg-white">
                                                            <X size={22}/>
                                                            </button>
                                                            <img src={big} alt={product.name} onClick={e=>e.stopPropagation()} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85'}} className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"/></div>}
                                                            </>
                                                    }
