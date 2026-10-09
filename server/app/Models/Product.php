<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model { protected $fillable=['name','category','description','price','image_url']; protected $casts=['price'=>'decimal:2']; }
