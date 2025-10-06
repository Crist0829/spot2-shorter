<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Facades\Rabbit;
use App\Models\Url;
use App\Models\UrlAnalysis;
use App\Models\UrlAnalysisStatus;
use Illuminate\Support\Facades\Log;
use Exception;

class ProcessUrlAnalysisResults extends Command
{
    protected $signature = 'urls:process-analysis-results';
    protected $description = 'Consume messages from RabbitMQ with URL analysis results and updates database records.';

    public function handle(){
        $this->info('Waiting for messages from RabbitMQ...');

        while (true) {
            try {
                Rabbit::consume(function ($data) {
                    $this->processMessage($data);
                });
            } catch (Exception $e) {
                Log::error("RabbitMQ connection error: {$e->getMessage()}");
                $this->error("Connection lost, retrying in 5 seconds...");
                sleep(5);
            }
        }
    }

    protected function processMessage(array $data){
        try {
            $this->info("Received message: " . json_encode($data));

            if (!isset($data['id'])) 
                throw new Exception("Message missing URL ID");
            
            $url = Url::find($data['id']);
            if (!$url) 
                throw new Exception("URL with ID {$data['id']} not found");

            $statusName = $data['status'] ?? ($data['safe'] ?? false ? 'safe' : 'unsafe');
            $status = UrlAnalysisStatus::firstOrCreate(['name' => $statusName]);

            $analysis = UrlAnalysis::where('url_id', $url->id)->first();

            $analysis->status_id = $status->id;
            $analysis->analysis_details = isset($data['details']) ? json_encode($data['details']) : null;
            $analysis->error_message = $data['error'] ?? null;
            $analysis->save();

            $this->info("✅ URL ID {$url->id} stored with status: {$status->name}");
        } catch (Exception $e) {
            Log::error("Error processing analysis result: {$e->getMessage()}");
            $this->error("Error: " . $e->getMessage());
        }
    }

}
