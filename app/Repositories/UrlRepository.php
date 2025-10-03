<?php

namespace App\Repositories;

use App\Models\Url;
use App\Repositories\BaseRepository;

class UrlRepository extends BaseRepository {

    public function __construct(Url $url){
        Parent::__construct($url);
    }


}