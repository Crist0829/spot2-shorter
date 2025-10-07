<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Url extends Model
{
    use HasFactory;

    protected $fillable = ["url", "code", "user_id", "actived", "expiration_time", "expiration_clicks", "ip", "analysis_id"];

    public function visits() : HasMany
    {
        return $this->hasMany(UrlVisit::class, 'url_id');
    }


    public function analysis() : HasOne
    {
        return $this->hasOne(UrlAnalysis::class, 'id', 'analysis_id');
    }


    public function user() : HasOne 
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }


}
