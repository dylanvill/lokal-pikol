<x-mail::message>
# Welcome to Lokal Pikol!

Hi Dylan, we are so excited to have you onboard.

Please click the button below to complete your onboarding process and set up your facility.

<x-mail::button :url="''">
Register Facility
</x-mail::button>

We look forward to having you on board!

Thanks,<br>
{{ config('app.name') }}

@slot('subcopy')
If you're having trouble clicking the "Register Facility" button, copy and paste the URL below into your web browser:
https://google.com
@endslot
</x-mail::message>
