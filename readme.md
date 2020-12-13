Для Laravel
<pre> 
 cd laravel
 mkdir node
 git clone https://github.com/mikhalkevich/NodeSocket.git
</pre>
Базовый шаблон app.blade.php:
<pre>
<code>
 &lt;!DOCTYPE html&gt;
&lt;html lang="{{ app()->getLocale() }}"&gt;
&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="csrf-token" content="{{ csrf_token() }}"&gt;
@section('meta')
@show
    &lt;title>{{ config('app.name', 'Map of Worlds') }}&lt;/title&gt;
    &lt;!-- Styles --&gt;
    &lt;link href="{{ asset('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet"&gt;
    &lt;link href="{{ asset('css/main.css') }}" rel="stylesheet"&gt;
    @section('styles')
    @show
&lt;/head&gt;
&lt;body&gt;
@yield('content')
&lt;div class="footer"&gt;
    &copy; &lt;a href="http://erud.by" target="_blank"&gt;mikhalkevich&lt;/a&gt;
&lt;/div&gt;
&lt;!-- Scripts --&gt;
&lt;script src="{{ asset('js/app.js') }}"&gt;&lt;/script&gt;
@section('scripts')
@show
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>
Маршрут в routes/web.php
<pre>
Route::get('chat/{id?}', 'ChatController@getIndex');
</pre>

