<?php 

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface {


    public function getAll(array $relations, array $conditions) : Collection | null;
    public function getById(string $modelId) : Model | null;

    public function getByIdOrFail(string $modelId) : Model;

    public function getFirstByFilters(array $filters = []) : Model | null;

    public function create(array $data) : Model;


}