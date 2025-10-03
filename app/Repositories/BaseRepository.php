<?php 


namespace App\Repositories;

use App\Interfaces\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements BaseRepositoryInterface {

    protected Model $model; 

    public function __construct(Model $model){
        $this->model = $model;
    }


    public function getAll(array $relations = [], array $conditions = []): Collection | null 
    {
        $data = $this->model->with($relations)->where($conditions)->get();
        return $data;
    }


    public function getById(string $modelId) : Model | null {
        $model = $this->model->find($modelId);
        return $model;
    }


    public function getByIdOrFail(string $modelId): Model
    {
        $model = $this->model->findOrFail($modelId);
        return $model;
    }


    public function create(array $data): Model
    {
        $created = $this->model->create($data);
        return $created;
    }


    public function getFirstByFilters(array $relations = [], array $filters = []) : Model | null
    {
        $model = $this->model->with($relations)->where($filters)->first();
        return $model;
    }



}