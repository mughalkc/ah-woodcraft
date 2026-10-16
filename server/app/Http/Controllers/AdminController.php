<?php
namespace App\Http\Controllers;
use App\Models\{Admin,AdminToken,Product};use Illuminate\Http\Request;use Illuminate\Support\Facades\Hash;use Illuminate\Support\Str;
class AdminController extends Controller {
 public function login(Request $r){$data=$r->validate(['email'=>'required|email','password'=>'required|string']);$admin=Admin::where('email',$data['email'])->first();if(!$admin||!Hash::check($data['password'],$admin->password))return response()->json(['message'=>'Invalid email or password.'],422);$plain=Str::random(80);AdminToken::create(['admin_id'=>$admin->id,'token_hash'=>hash('sha256',$plain),'expires_at'=>now()->addDays(7)]);return response()->json(['token'=>$plain,'admin'=>['id'=>$admin->id,'name'=>$admin->name,'email'=>$admin->email]]);}
 public function logout(Request $r){$header=$r->header('Authorization','');$token=str_starts_with($header,'Bearer ')?substr($header,7):null;if($token)AdminToken::where('token_hash',hash('sha256',$token))->delete();return response()->json(['message'=>'Logged out']);}
 public function store(Request $r){$p=$r->validate(['name'=>'required|string|max:120','category'=>'required|string|max:80','description'=>'nullable|string|max:1000','price'=>'nullable|numeric|min:0','image_url'=>['nullable','string','max:1500000','regex:/^(https?:\/\/|data:image\/(jpeg|png|webp);base64,)/i']]);return response()->json(['data'=>Product::create($p)],201);}
 public function update(Request $r,Product $product){$p=$r->validate(['name'=>'required|string|max:120','category'=>'required|string|max:80','description'=>'nullable|string|max:1000','price'=>'nullable|numeric|min:0','image_url'=>'nullable|url|max:1000']);$product->update($p);return response()->json(['data'=>$product->fresh()]);}
 public function destroy(Product $product){$product->delete();return response()->json(['message'=>'Product deleted']);}
}
