<?php 

namespace App\Repositories;

use App\Models\UrlAnalysis;
use App\Repositories\BaseRepository;

class UrlAnalysisRepository extends BaseRepository {

    public function __construct(UrlAnalysis $urlAnalysis){
        Parent::__construct($urlAnalysis);
    }

}