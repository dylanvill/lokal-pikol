<x-mail::message>
# Reset your password

You're receiving this email because a password reset was requested for your Lokal Pikol scheduling account.

<x-mail::button :url="$url">
Reset Password
</x-mail::button>

This link will expire in 60 minutes. If you didn't request a password reset, no action is needed.

Thanks,<br>
{{ config('app.name') }}

<x-mail::subcopy>
If you have trouble clicking the button, copy and paste the URL below:

{{ $url }}
</x-mail::subcopy>
</x-mail::message>
