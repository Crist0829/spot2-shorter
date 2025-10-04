<?php

namespace App\Repositories;

use App\Models\UrlVisit;
use App\Repositories\BaseRepository;

class UrlVisitRepository extends BaseRepository {

    public function __construct(UrlVisit $urlVisit){
        Parent::__construct($urlVisit);
    }


}