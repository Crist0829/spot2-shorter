<?php 

namespace App\Services;

use App\Repositories\UrlAnalysisRepository;
use App\Repositories\UrlRepository;
use App\Repositories\UrlVisitRepository;
use App\Facades\Rabbit;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UrlAdminService {

    public function __construct(protected UrlRepository $urlRepository, 
                                protected UrlVisitRepository $urlVisitRepsitory, 
                                protected UrlAnalysisRepository $urlAnalysisRepository)
                                {}


    public function getAllUrls(){
        $urls = $this->urlRepository->getAll(['analysis.status', 'user', 'visits']);
        return $urls;
    }

    public function update(array $data, string $urlId,){

        try{            
            $url = $this->urlRepository->getByIdOrFail($urlId);
            $url->url = $data['url'];
            $url->expiration_time = $data["expiration_time"] ? Carbon::createFromDate($data["expiration_time"])->toDateTimeString() : null;
            $url->expiration_clicks = $data['expiration_clicks'];
            $url->actived = $data['actived'] ? (!$url->actived ? now() : $url->actived ) : ($url->actived ? null : $url->actived) ;
            $url->save();
            return [
                "error" => false,
                "status" =>  200,
                "message" =>  "El link se modificó correctamente"
            ];
        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema modificando el link, intentelo de nuevo"
            ];
        }


    }


    public function regenerate(string $urlId){
        try{            
            $url = $this->urlRepository->getByIdOrFail($urlId);
            $url->code = Str::random(4);
            $url->save();
            return [
                "error" => false,
                "status" =>  200,
                "message" =>  "El link se regeneró correctamente"
            ];

        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema regenerando el link, intentelo de nuevo"
            ];
        }
    }


    public function delete(string $urlId){
        try{
            $url = $this->urlRepository->getById($urlId);
            $url->delete();
            return [
                "error" => false,
                "status" =>  200,
                "message" =>  "El link se eliminó correctamente"
            ];
        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema eliminando el link, intentelo de nuevo más tarde"
            ];
        }
    }


}