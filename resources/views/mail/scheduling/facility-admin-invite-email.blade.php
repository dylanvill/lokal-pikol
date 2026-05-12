<x-mail::message>
# You've been invited to manage {{ $listingName }}

Hello!

You've been invited to manage **{{ $listingName }}** on Lokal Pikol. Use the link below to set up your account and start managing your courts, reservations, and availability.

<x-mail::button :url="$url">
Set Up Your Account
</x-mail::button>

This link is valid for 24 hours. If it expires, ask your Lokal Pikol administrator to send a new one.

Thanks,<br>
{{ config('app.name') }}

<x-mail::subcopy>
If you have trouble clicking the button, copy and paste the URL below:

{{ $url }}
</x-mail::subcopy>
</x-mail::message>
