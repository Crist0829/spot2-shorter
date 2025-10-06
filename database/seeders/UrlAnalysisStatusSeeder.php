<?php

namespace Database\Seeders;

use App\Models\UrlAnalysisStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UrlAnalysisStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('url_analysis_statuses')->insert(
            [
                ['name' => 'pending', 'description' => 'Esperando análisis'],
                ['name' => 'safe', 'description' => 'URL segura'],
                ['name' => 'malicious', 'description' => 'URL maliciosa o phishing detectado'],
                ['name' => 'error', 'description' => 'Error al analizar la URL'],
            ]
        );
    }
}
