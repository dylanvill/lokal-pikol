<x-mail::message>
# Reservation Pending Approval

Hello {{$facilityName}},

<strong>{{ $customer }}</strong> has requested a reservation for <strong>{{ $courtName }}</strong> with the following details:

Date: <strong>{{ $date }}</strong>
<br/>
Time: <strong>{{ $startTime }} to {{ $endTime }}</strong>

Please approve or reject the reservation request at your earliest convenience.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
