<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SanctumAbilitiesCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$abilities)
    {
        
        foreach ($abilities as $ability) {
            if (!$request->user()->tokenCan($ability)) {
                $response = ['message' => 'Access denied'];
                return response($response, 400);
            }
        }
        
        return $next($request);
    }
}
