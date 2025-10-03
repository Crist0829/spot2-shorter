<?php 


namespace   App\Repositories;

use App\Models\Role;
use App\Models\User;

class RoleRepository extends BaseRepository {


    public function __construct(Role $role){
        Parent::__construct($role);
    }

}