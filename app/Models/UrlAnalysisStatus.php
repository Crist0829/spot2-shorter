<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UrlAnalysisStatus extends Model
{
    use HasFactory;

    const STATUS_PENDING = 1;
    const STATUS_SAFE = 2;
    const STATUS_MALICIOUS = 3;
    const STATUS_ERROR = 4;


}
