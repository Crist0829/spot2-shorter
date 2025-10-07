<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixRoleUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fix-role-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::with('roles')->get();
        $role = Role::find(Role::ROLE_USER);

        foreach ($users as $user) {
            $pivot = DB::table('role_user')
                ->where('user_id', $user->id)
                ->select('role_id', DB::raw('COUNT(*) as count'))
                ->groupBy('role_id')
                ->having('count', '>', 1)
                ->get();

            foreach ($pivot as $duplicate) {
                DB::table('role_user')
                    ->where('user_id', $user->id)
                    ->where('role_id', $duplicate->role_id)
                    ->limit($duplicate->count - 1)
                    ->delete();
            }
           
            if ($user->roles->isEmpty()) 
                $user->roles()->save($role);
            
        }
        $this->info('Roles duplicados eliminados y roles por defecto asignados correctamente.');
    }
}
