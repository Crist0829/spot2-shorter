<?php 

namespace App\Services;

use App\Models\Role;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService {

    public function __construct(protected UserRepository $userRepository, protected RoleRepository $roleRepository){}


    public function getAllUsers(){
        $users = $this->userRepository->getAll(['roles']);
        return $users;
    }

    public function getAllRoles(){
        $roles = $this->roleRepository->getAll();
        return $roles;
    }


    public function create(array $data){

        try{
            DB::beginTransaction();
            $data['actived'] = $data['actived'] ? now() : null;
            $data['password'] = Hash::make($data['password']);
            $user = $this->userRepository->create($data);
            $role = $this->roleRepository->getById(Role::ROLE_USER);
            $user->roles()->save($role);
            DB::commit();
            return [
                "error" => false, 
                "status" => 200, 
                "message" => "El usuario se creó correctamente"
            ];

        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line: ' . $e->getLine());
            DB::rollBack();
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un error creando al usuario, intentelo más tarde"
            ];
            
        }


    }


    public function update(array $data, $userId){

        try{
            DB::beginTransaction();
            $user = $this->userRepository->getByIdOrFail($userId);
            $user->actived = $data['actived'] ? (!$user->actived ? now() : $user->actived ) : ($user->actived ? null : $user->actived) ;
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->save();
            DB::commit();
            return [
                "error" => false, 
                "status" => 200, 
                "message" => "El usuario se actualizó correctamente"
            ];

        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line: ' . $e->getLine());
            DB::rollBack();
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un error actualizando al usuario, intentelo más tarde"
            ];
            
        }


    }


    public function updatePassword(string $newPassword, $userId){

        try{
            DB::beginTransaction();
            $user = $this->userRepository->getByIdOrFail($userId);
            $user->password = Hash::make($newPassword);
            $user->save();
            DB::commit();
            return [
                "error" => false, 
                "status" => 200, 
                "message" => "La contraseña se actulizó correctamente"
            ];

        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line: ' . $e->getLine());
            DB::rollBack();
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un error actualizando la contraseña del usuario, intentelo más tarde"
            ];
        }

    }


    public function assignOrRemoveRole(string $user_id, string $role_id){
        try{
           $user = $this->userRepository->getByIdOrFail($user_id);
           $role = $this->roleRepository->getByIdOrFail($role_id);

           if($user->hasRole($role->name)){
                $user->roles()->detach($role->id);
                return [
                    "error" => false, 
                    "status" => 200, 
                    "message" => "El rol se removió del usuario correctamente"
                ];
           }

           $user->roles()->save($role);

            return [
                "error" => false, 
                "status" => 200, 
                "message" => "El rol se asignó correctamente al usuario"
            ];

        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line: ' . $e->getLine());
            DB::rollBack();
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un asignando o removiendo el rol, intentelo más tarde"
            ];
            
        }
    }


}