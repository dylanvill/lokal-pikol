<x-mail::message>
# Your reservation has been confirmed!

Hi {{ $customerName }},

Your reservation at {{ $facilityName}}
 has been confirmed. See you at the court!


Court: <strong>{{ $courtName }}</strong>
<br/>
Date: <strong>{{ $date }}</strong>
<br/>
Time: <strong>{{ $startTime }} to {{ $endTime }}</strong>

See you on the court!
</x-mail::message>
