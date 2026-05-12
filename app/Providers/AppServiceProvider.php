<?php

namespace App\Providers;

use App\Source\Scheduling\Facility\Mail\PasswordResetEmail;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('local') && class_exists(\Laravel\Telescope\TelescopeServiceProvider::class)) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production') || env('FORCE_HTTPS', false)) {
            URL::forceScheme('https');
        }

        $this->configureDefaults();
        $this->configurePasswordReset();

        // Remove the "data" wrapper from JSON resources for a cleaner API response
        JsonResource::withoutWrapping();
    }

    protected function configurePasswordReset(): void
    {
        ResetPassword::toMailUsing(function ($notifiable, string $token) {
            $url = route('scheduling.reset-password', ['token' => $token]).'?email='.urlencode($notifiable->email);

            return (new PasswordResetEmail($url))->to($notifiable->email);
        });
    }

    protected function configureDefaults(): void
    {
        // included in Laravel initial setup
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        // Password defaults
        Password::defaults(
            fn (): ?Password => app()->isProduction()
                ? Password::min(12)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
                : null
        );
    }
}
