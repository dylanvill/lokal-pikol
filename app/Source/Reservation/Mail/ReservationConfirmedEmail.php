<?php

namespace App\Source\Reservation\Mail;

use App\Source\Reservation\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationConfirmedEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected Reservation $reservation)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Your reservation at {$this->reservation->facility->name} on {$this->reservation->reservation_date->format('l, F j, Y')} has been confirmed!",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.reservation.reservation-confirmed',
            with: [
                'customerName' => $this->reservation->reservable->reservationNameDisplay(),
                'facilityName' => $this->reservation->facility->name,
                'courtName' => $this->reservation->court->name,
                'date' => $this->reservation->reservation_date->format('l, F j, Y'),
                'startTime' => date('g:i A', strtotime($this->reservation->start_time)),
                'endTime' => date('g:i A', strtotime($this->reservation->end_time)),
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
