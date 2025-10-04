<?php 

namespace App\Services;

use App\Repositories\UrlRepository;
use App\Repositories\UrlVisitRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UrlService {


    public function __construct(protected UrlRepository $urlRepository, protected UrlVisitRepository $urlVisitRepsitory){}


    public function create(array $data){

        try{
            $data["code"] = Str::random(5);
            $data["actived"] = $data["actived"] ? Carbon::now() : null;
            $data["expiration_time"] =  $data["expiration_time"] ? Carbon::createFromDate($data["expiration_time"])->toDateTimeString() : null;
            
            $url = $this->urlRepository->create($data);
            return [
                "error" => false,
                "status" =>  200,
                "message" =>  "El link se acortó correctamente"
            ];

        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema acortando el link, intentelo de nuevo"
            ];
        }

    }

    public function delete(string $urlId, $userId){
        try{
            $url = $this->urlRepository->getById($urlId);
            if($userId != $url->user_id) throw new Exception("La ip de la petición no coincide con la de la url");
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

    public function createFromGuest(array $data){
        try{
            $data["code"] = Str::random(5);
            $data["actived"] = Carbon::now();

            if($this->validateUrlIp($data['ip']))
                return [
                    "error" => true, 
                    "status" => 400,
                    "message" => "Ya superó el límite de links que puede acortar" 
                ];

            $url = $this->urlRepository->create($data);
            return [
                "error" => false,
                "status" =>  200,
                "message" =>  "El link se acortó correctamente"
            ];

        }catch(Exception $e){
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema acortando el link, intentelo de nuevo"
            ];
        }
    }


    public function update(array $data, string $urlId, string $userId){

        try{            
            $url = $this->urlRepository->getByIdOrFail($urlId);
            if($url->user_id != $userId) throw new Exception("El usuario en sesión no es el que creó este link");

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

    public function regenerate(string $urlId, string $userId){
        try{            
            $url = $this->urlRepository->getByIdOrFail($urlId);
            if($url->user_id != $userId) throw new Exception("El usuario en sesión no es el que creó este link");

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


    public function deleteFromGuest(string $urlId, string $ip){

        try{
            $url = $this->urlRepository->getById($urlId);
            if($ip != $url->ip) throw new Exception("La ip de la petición no coincide con la de la url");
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

    private function validateUrlIp(string $ip){
        $urls = $this->urlRepository->getAll([], [['ip', '=', $ip]]);
        return $urls->count() >= (int) config('features.allowed_urls_by_ip');
    }

    public function getUrlsByIp(string $ip){
        $urls = $this->urlRepository->getAll([], [['ip', '=', $ip], ['user_id', '=', null]]);
        return $urls;
    }


    public function getUrlsByUserId(string $userId){
        $urls = $this->urlRepository->getAll(['visits'], [["user_id", "=", $userId]]);
        return $urls;
    }


    public function validateUrlToRedirect(string $code, string $ip){

        $url = $this->urlRepository->getFirstByFilters(['visits'], [['code', '=', $code]]);

        if(!$url)
            return [
                "error" => true, 
                "status" => 404, 
                "message" => "El link al que está intentado acceder no existe o fue eliminado"
            ];

        if(!$url->actived)
            return [
                "error" => true, 
                "status" => 400, 
                "message" => "El link al que está intentando acceder no está habilitado"
            ];


        if(($url->expiration_clicks && $url->visits->count() >= $url->expiration_clicks) || ($url->expiration_time && $url->expiration_time < now()))
            return [
                "error" => true, 
                "status" => 400, 
                "message" => "El link al que está intentado acceder expiró"
            ];


        $this->saveVisit($url, $ip);
        

        return [
            "error" => false, 
            "status" => 200, 
            "url" => $url->url,
            "message" => "Se puede redireccionar"
        ];


    }


    private function saveVisit($url, $ip){
        $urlVisit = $this->urlVisitRepsitory->getFirstByFilters([], [['ip', '=', $ip], ['url_id', '=', $url->id], 
                                                                    [DB::raw('DATE(created_at)'), '=', now()->toDateString()]]);

        if($urlVisit){
            Log::info('Ya se había contado la visita a la url el día de hoy : ' . $url->id);
            return;
        }

        $urlVisit = $this->urlVisitRepsitory->create(['ip' => $ip, 'url_id' => $url->id]);
        //TODO:  Save more info
    }


}