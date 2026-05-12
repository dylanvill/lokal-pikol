<?php

namespace App\Source\Scheduling\Facility\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FacilityAdminInviteEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        protected string $url,
        protected string $listingName,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "You've been invited to manage {$this->listingName} on Lokal Pikol",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.scheduling.facility-admin-invite-email',
            with: [
                'url' => $this->url,
                'listingName' => $this->listingName,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
