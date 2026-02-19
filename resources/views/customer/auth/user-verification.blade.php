<x-mail::message>
# Welcome to {{ config('app.name') }}!

One more step! Please click the button below to verify your email address:

<x-mail::button :url="$url">
Verify Email Address
</x-mail::button>

We look forward to having you on board.

@slot('subcopy')
If you're having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser:
{{$url}}
@endslot
</x-mail::message>