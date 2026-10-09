<?php
return ['defaults'=>['guard'=>'web','passwords'=>'users'],'guards'=>['web'=>['driver'=>'session','provider'=>'admins']],'providers'=>['admins'=>['driver'=>'eloquent','model'=>App\Models\Admin::class]],'passwords'=>['users'=>['provider'=>'admins','table'=>'password_reset_tokens','expire'=>60,'throttle'=>60]],'password_timeout'=>10800];
