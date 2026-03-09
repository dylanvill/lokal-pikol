<x-mail::message>
# Add Your Pickleball Court to the Negros Oriental Directory

Hello!

We're building a public directory of pickleball courts in Negros Oriental to help players discover local courts more easily. We'd love to include your facility.

**Why be part of the directory?**
- **Completely FREE** — no fees or charges
- **Help players discover your court**
- **Information comes directly from court owners**
- **Simple one-time setup**

Just use the link below to add your court details, photos, operating hours, and contact information. Your listing will appear in the directory once it's completed.

<x-mail::button :url="$url">
Add Your Court
</x-mail::button>

This link is valid for 7 days. If the link expires, simply contact us and we can send a new one.

Thanks,<br>
{{ config('app.name') }}

<x-mail::subcopy>
If you have trouble clicking the button, manually copy and paste the URL below:

{{$url}}
</x-mail::subcopy>
</x-mail::message>