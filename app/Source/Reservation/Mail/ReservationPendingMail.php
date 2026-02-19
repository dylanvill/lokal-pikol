<?php

namespace App\Source\Reservation\Mail;

use App\Source\Reservation\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationPendingMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected string $courtName;
    protected string $date;
    protected string $startTime;
    protected string $endTime;

    public function __construct(protected Reservation $reservation)
    {
        $this->courtName = $reservation->court->name;
        $this->date = $reservation->reservation_date->format('l, F j, Y');
        $this->startTime = date('g:i A', strtotime($reservation->start_time));
        $this->endTime = date('g:i A', strtotime($reservation->end_time));
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {

        return new Envelope(
            subject: "Reservation Pending Approval | {$this->courtName} on {$this->date} from {$this->startTime} to {$this->endTime}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $facilityName = $this->reservation->facility->name;
        $customer = $this->reservation->customer->full_name;

        return new Content(
            markdown: 'mail.reservation.reservation-pending',
            with: [
                'facilityName' => $facilityName,
                'courtName' => $this->courtName,
                'customer' => $customer,
                'date' => $this->date,
                'startTime' => $this->startTime,
                'endTime' => $this->endTime,
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
