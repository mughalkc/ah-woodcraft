<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;use Illuminate\Support\Facades\Hash;use App\Models\{Admin,Product};
class DatabaseSeeder extends Seeder {public function run(){Admin::updateOrCreate(['email'=>env('ADMIN_EMAIL','admin@ahwoodcraft.com')],
['name'=>'AH Woodcraft Admin','password'=>Hash::make(env('ADMIN_PASSWORD') ?: throw new \RuntimeException('Set ADMIN_PASSWORD in .env'))]);
if(Product::count()===0)
    {$items=[['Classic Dining Table','Tables','Solid wood dining table with a clean, timeless finish.',null,'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?auto=format&fit=crop&w=900&q=80'],
['Handcrafted Chair','Chairs','Comfortable handcrafted wooden chair for dining or lounge.',null,'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80'],
    ['Wooden Bed Frame','Beds','Sturdy custom bed frame made to your preferred size.',null,'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'],
    ['Kitchen Organizer','Kitchen Accessories','Practical wooden organizer for a warm kitchen look.',null,'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=80'],
        ['Modern Sideboard','Furniture','Minimal wooden sideboard for living and dining spaces.',null,'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80'],
            ['Decorative Wood Piece','Decoration','A handcrafted statement piece for your home.',null,'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80']];
                foreach($items as $i)Product::create(['name'=>$i[0],'category'=>$i[1],'description'=>$i[2],'price'=>$i[3],'image_url'=>$i[4]]);}}}
