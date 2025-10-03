<?php

namespace App\Http\Controllers;

use App\Services\UrlService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UrlController extends Controller
{


    public function __construct(protected UrlService $urlService){}


    //--- Guest  ---//

    public function home(Request $request){

        if(auth()->check()) return to_route('dashboard');
        $urls = $this->urlService->getUrlsByIp($request->ip());
        return Inertia::render('Home', [
                "urls" => $urls
        ]);
    }
    

    public function createFromGuest(Request $request){
        $request->validate([
            "url" => "required|url"
        ]);
        $data = ["url" => $request->url];
        $data["ip"] = $request->ip();
        $response = $this->urlService->createFromGuest($data);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

   

    public function deleteFromGuest(string $url_id, Request $request){
        $response = $this->urlService->deleteFromGuest($url_id, $request->ip());
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

    //--- End Guest  ---//



    //--- Authenticated ---//
    public function index(){
        $urls = $this->urlService->getUrlsByUserId(auth()->user()->id);
        return Inertia::render('Urls/Index', ["urls" => $urls]);
    }

    public function create(Request $request){

        $request->validate([
            "url" => "required",
            "actived" => "required|boolean", 
        ]);

        $data = $request->all();
        $data["ip"] = $request->ip();
        $data['user_id'] = auth()->user()->id;

        $response = $this->urlService->create($data);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);

    }


    public function update(string $url_id, Request $request){
        $response = $this->urlService->update($request->all(), $url_id, auth()->user()->id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

    public function regenerate(string $url_id){
        $response = $this->urlService->regenerate($url_id, auth()->user()->id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }


    public function delete(string $url_id){
        $response = $this->urlService->delete($url_id, auth()->user()->id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

}
