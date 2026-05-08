<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Shared\Contracts\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ReservationsController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('reservations/index', [
            'courts' => [
                ['id' => '11111111-1111-1111-1111-111111111111', 'name' => 'Court 1'],
                ['id' => '22222222-2222-2222-2222-222222222222', 'name' => 'Court 2'],
            ],
            'selectedCourtId' => '11111111-1111-1111-1111-111111111111',
            'calendarItems' => [
                [
                    'id' => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                    'type' => 'reservation',
                    'title' => 'John Santos',
                    'start' => '2026-05-08T09:00:00',
                    'end' => '2026-05-08T11:00:00',
                    'name' => 'John Santos',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Friday, 8 May 2026',
                    'formattedTimeRange' => '9:00AM – 11:00AM',
                ],
                [
                    'id' => 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
                    'type' => 'reservation',
                    'title' => 'Maria Garcia',
                    'start' => '2026-05-09T14:00:00',
                    'end' => '2026-05-09T16:00:00',
                    'name' => 'Maria Garcia',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Saturday, 9 May 2026',
                    'formattedTimeRange' => '2:00PM – 4:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-05T19:00:00',
                    'end' => '2026-05-05T22:00:00',
                    'name' => 'Open Play',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Tuesday',
                    'formattedTimeRange' => '7:00PM – 10:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-12T19:00:00',
                    'end' => '2026-05-12T22:00:00',
                    'name' => 'Open Play',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Tuesday',
                    'formattedTimeRange' => '7:00PM – 10:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-19T19:00:00',
                    'end' => '2026-05-19T22:00:00',
                    'name' => 'Open Play',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Tuesday',
                    'formattedTimeRange' => '7:00PM – 10:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-26T19:00:00',
                    'end' => '2026-05-26T22:00:00',
                    'name' => 'Open Play',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Tuesday',
                    'formattedTimeRange' => '7:00PM – 10:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-07T18:00:00',
                    'end' => '2026-05-07T21:00:00',
                    'name' => 'Corporate League',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Thursday',
                    'formattedTimeRange' => '6:00PM – 9:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-14T18:00:00',
                    'end' => '2026-05-14T21:00:00',
                    'name' => 'Corporate League',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Thursday',
                    'formattedTimeRange' => '6:00PM – 9:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-21T18:00:00',
                    'end' => '2026-05-21T21:00:00',
                    'name' => 'Corporate League',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Thursday',
                    'formattedTimeRange' => '6:00PM – 9:00PM',
                ],
                [
                    'id' => null,
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-28T18:00:00',
                    'end' => '2026-05-28T21:00:00',
                    'name' => 'Corporate League',
                    'courtName' => 'Court 1',
                    'formattedDate' => 'Every Thursday',
                    'formattedTimeRange' => '6:00PM – 9:00PM',
                ],
            ],
        ]);
    }
}
