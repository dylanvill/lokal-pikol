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
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Friday, 8 May 2026',
                    'timeDisplay' => '9:00am – 11:00am',
                ],
                [
                    'id' => 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
                    'type' => 'reservation',
                    'title' => 'Maria Garcia',
                    'start' => '2026-05-09T14:00:00',
                    'end' => '2026-05-09T16:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Saturday, 9 May 2026',
                    'timeDisplay' => '2:00pm – 4:00pm',
                ],
                [
                    'id' => 'cc000001-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-05T19:00:00',
                    'end' => '2026-05-05T22:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Tuesday',
                    'timeDisplay' => '7:00pm – 10:00pm',
                ],
                [
                    'id' => 'cc000002-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-12T19:00:00',
                    'end' => '2026-05-12T22:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Tuesday',
                    'timeDisplay' => '7:00pm – 10:00pm',
                ],
                [
                    'id' => 'cc000003-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-19T19:00:00',
                    'end' => '2026-05-19T22:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Tuesday',
                    'timeDisplay' => '7:00pm – 10:00pm',
                ],
                [
                    'id' => 'cc000004-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Open Play',
                    'start' => '2026-05-26T19:00:00',
                    'end' => '2026-05-26T22:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Tuesday',
                    'timeDisplay' => '7:00pm – 10:00pm',
                ],
                [
                    'id' => 'dd000001-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-07T18:00:00',
                    'end' => '2026-05-07T21:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Thursday',
                    'timeDisplay' => '6:00pm – 9:00pm',
                ],
                [
                    'id' => 'dd000002-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-14T18:00:00',
                    'end' => '2026-05-14T21:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Thursday',
                    'timeDisplay' => '6:00pm – 9:00pm',
                ],
                [
                    'id' => 'dd000003-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-21T18:00:00',
                    'end' => '2026-05-21T21:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Thursday',
                    'timeDisplay' => '6:00pm – 9:00pm',
                ],
                [
                    'id' => 'dd000004-0000-0000-0000-000000000000',
                    'type' => 'block_reservation',
                    'title' => '(Blocked) Corporate League',
                    'start' => '2026-05-28T18:00:00',
                    'end' => '2026-05-28T21:00:00',
                    'courtName' => 'Court 1',
                    'dateDisplay' => 'Every Thursday',
                    'timeDisplay' => '6:00pm – 9:00pm',
                ],
            ],
        ]);
    }
}
