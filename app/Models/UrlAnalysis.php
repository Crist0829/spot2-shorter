<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UrlAnalysis extends Model
{
    use HasFactory;

    protected $fillable = ['status_id', 'url_id'];



    public function status() : HasOne
    {
        return $this->hasOne(UrlAnalysisStatus::class, 'id', 'status_id');
    }


}
