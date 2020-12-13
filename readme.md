Для Laravel
<pre> 
 cd laravel
 mkdir node
 git clone https://github.com/mikhalkevich/NodeSocket.git
</pre>
Базовый шаблон app.blade.php:
<pre>
<code>
 <!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
@section('meta')
@show
    <title>{{ config('app.name', 'Map of Worlds') }}</title>
    <!-- Styles -->
    <link href="{{ asset('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">
    @section('styles')
    @show
</head>
<body>
@yield('content')
<div class="footer">
    &copy; <a href="http://erud.by" target="_blank">mikhalkevich</a>
</div>
<!-- Scripts -->
<script src="{{ asset('js/app.js') }}"></script>
@section('scripts')
@show
</body>
</html>
</code>
</pre>
Маршрут в routes/web.php
<pre>
Route::get('chat/{id?}', 'ChatController@getIndex');
</pre>

