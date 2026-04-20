<?php

namespace App\Source\Ad\Commands;

use App\Source\Ad\Actions\CreateAd\CreateAd;
use App\Source\Ad\Actions\CreateAd\Dtos\CreateAdData;
use App\Source\Ad\Actions\UpdateAdImage\UpdateAdImage;
use App\Source\Ad\Enums\CtaLabelEnum;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\form;
use function Laravel\Prompts\info;

class CreateAdCommand extends Command
{
    public function __construct(protected CreateAd $createAd)
    {
        parent::__construct();
    }
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ad:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new ad';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            DB::beginTransaction();

            $responses = form()
                ->text(label: 'Ad Title', name: 'title', required: true, validate: ['title' => 'string|max:255'])
                ->textarea(label: 'Ad Description', name: 'description', required: true)
                ->text(label: 'CTA URL', name: 'ctaUrl', required: false, validate: ['ctaUrl' => 'nullable|url'])
                ->select(label: 'CTA Label', name: 'ctaLabel', options: CtaLabelEnum::values(), required: true)
                ->text(label: 'Ad Image', name: 'adImageUrl', required: true, validate: ['adImageUrl' => 'url'])
                ->submit();

            info('Creating ad...');

            $ad = $this->createAd->create(
                new CreateAdData(
                    title: $responses['title'],
                    description: $responses['description'],
                    ctaUrl: $responses['ctaUrl'],
                    ctaLabel: CtaLabelEnum::from($responses['ctaLabel']),
                    isActive: true,
                )
            );

            (new UpdateAdImage($ad))->updateViaUrl($responses['adImageUrl']);

            info('Ad created successfully!');

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
