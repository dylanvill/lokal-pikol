<?php

namespace App\Source\Scheduling\Facility\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(protected string $url) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Your Lokal Pikol Password',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.scheduling.password-reset-email',
            with: ['url' => $this->url],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
