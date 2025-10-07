<?php

namespace App\Http\Controllers;

use App\Services\UrlAdminService;
use App\Services\UrlService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UrlAdminController extends Controller
{
    

    public function __construct(protected UrlAdminService $urlAdminService, 
                                protected UrlService $urlService){}

    public function index(){
        $urls = $this->urlAdminService->getAllUrls();
        return Inertia::render('Admin/Urls/Index', ['urls' => $urls]);
    }


    public function update(string $url_id, Request $request){
        $response = $this->urlAdminService->update($request->all(), $url_id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
        return back();
    }

    public function regenerate(string $url_id){
        $response = $this->urlAdminService->regenerate($url_id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

    public function delete(string $url_id){
        $response = $this->urlAdminService->delete($url_id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }


}
