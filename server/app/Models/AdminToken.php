<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class AdminToken extends Model { protected $fillable=['admin_id','token_hash','expires_at']; protected $casts=['expires_at'=>'datetime']; }
