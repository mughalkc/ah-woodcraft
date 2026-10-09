<?php
namespace App\Http\Controllers;
use App\Models\Product;use Illuminate\Http\Request;
class ProductController extends Controller { public function index(Request $request){$q=Product::query();if($request->filled('category'))$q->where('category',$request->category);return response()->json(['data'=>$q->latest()->get()]);} }
