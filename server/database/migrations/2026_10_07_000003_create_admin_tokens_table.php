<?php
use Illuminate\Database\Migrations\Migration;use Illuminate\Database\Schema\Blueprint;use Illuminate\Support\Facades\Schema;
return new class extends Migration {public function up(){Schema::create('admin_tokens',function(Blueprint $t){$t->id();$t->foreignId('admin_id')->constrained('admins')->cascadeOnDelete();$t->string('token_hash',64)->unique();$t->timestamp('expires_at');$t->timestamps();});}public function down(){Schema::dropIfExists('admin_tokens');}};
