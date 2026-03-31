<?php

namespace App\Source\Directory\Commands\Enums;

enum DirectoryCommandNamespaceEnum: string
{
    case LISTING = 'listing';
    case DIRECTORY = 'directory';

    public static function createCommandWithNamespace(self $namespace, string $command): string
    {
        return "{$namespace->value}:{$command}";
    }
}
