<?php
namespace App\Http\Middleware;
use Closure;use Illuminate\Http\Request;use App\Models\AdminToken;
class AdminAuth { public function handle(Request $request, Closure $next){$header=$request->header('Authorization','');$token=str_starts_with($header,'Bearer ')?substr($header,7):null;if(!$token)return response()->json(['message'=>'Unauthorized'],401);$record=AdminToken::where('token_hash',hash('sha256',$token))->where('expires_at','>',now())->first();if(!$record)return response()->json(['message'=>'Session expired. Please login again.'],401);$request->attributes->set('admin_id',$record->admin_id);return $next($request);} }
