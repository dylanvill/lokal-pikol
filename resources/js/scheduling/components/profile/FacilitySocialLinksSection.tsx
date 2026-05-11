import { Box, Button, Field, Flex, HStack, Heading, IconButton, Input, Stack } from '@chakra-ui/react';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';
import DeleteFacilitySocialLinkController from '@/actions/App/Http/Scheduling/Profile/Controllers/DeleteFacilitySocialLinkController';
import UpdateFacilitySocialLinksController from '@/actions/App/Http/Scheduling/Profile/Controllers/UpdateFacilitySocialLinksController';
import { toaster } from '../../../shared/components/ui/toaster';
import { PROFILE_SUCCESS_MESSAGE_KEY } from './constants';

interface FacilitySocialLinksSectionProps {
    initial: {
        facebookUrl: string | null;
        instagramUrl: string | null;
    };
}

const PLATFORMS = [
    { key: 'facebookUrl' as const, platform: 'Facebook', label: 'Facebook URL', icon: <FaFacebookF />, placeholder: 'https://www.facebook.com/yourpage' },
    { key: 'instagramUrl' as const, platform: 'Instagram', label: 'Instagram URL', icon: <FaInstagram />, placeholder: 'https://www.instagram.com/yourpage' },
];

function FacilitySocialLinksSection({ initial }: FacilitySocialLinksSectionProps) {
    const [removingPlatform, setRemovingPlatform] = useState<string | null>(null);

    const form = useForm({
        facebookUrl: initial.facebookUrl ?? '',
        instagramUrl: initial.instagramUrl ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            socialLinks: PLATFORMS
                .map((p) => ({ platform: p.platform, url: form.data[p.key].trim() }))
                .filter((entry) => entry.url !== ''),
        };

        form.transform(() => payload);
        form.patch(UpdateFacilitySocialLinksController.update.url(), {
            preserveScroll: true,
            onSuccess: (response) => {
                const message = response.flash?.[PROFILE_SUCCESS_MESSAGE_KEY];
                if (typeof message === 'string') {
                    toaster.create({ title: message, type: 'success', duration: 4000 });
                }
            },
        });
    };

    const handleRemove = (platform: string, key: 'facebookUrl' | 'instagramUrl') => {
        setRemovingPlatform(platform);
        router.delete(DeleteFacilitySocialLinkController.destroy(platform).url, {
            preserveScroll: true,
            onSuccess: (response) => {
                const message = response.flash?.[PROFILE_SUCCESS_MESSAGE_KEY];
                if (typeof message === 'string') {
                    toaster.create({ title: message, type: 'success', duration: 4000 });
                }
                form.setData(key, '');
                form.setDefaults(key, '');
            },
            onFinish: () => setRemovingPlatform(null),
        });
    };

    return (
        <Box as="section" borderWidth={1} borderRadius={8} bg="white" padding={6}>
            <Heading size="md" marginBottom={4}>Social links</Heading>
            <form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    {PLATFORMS.map((platform) => {
                        const hasSavedLink = (initial[platform.key] ?? '') !== '';
                        const errorKey = `socialLinks.${PLATFORMS.indexOf(platform)}.url` as keyof typeof form.errors;
                        const error = form.errors[errorKey];
                        return (
                            <Field.Root key={platform.platform} invalid={!!error}>
                                <Field.Label>
                                    <HStack gap={2}>
                                        {platform.icon}
                                        {platform.label}
                                    </HStack>
                                </Field.Label>
                                <HStack width="100%">
                                    <Input
                                        flex={1}
                                        value={form.data[platform.key]}
                                        onChange={(e) => form.setData(platform.key, e.target.value)}
                                        placeholder={platform.placeholder}
                                        disabled={form.processing || removingPlatform !== null}
                                    />
                                    {hasSavedLink && (
                                        <IconButton
                                            aria-label={`Remove ${platform.platform} link`}
                                            variant="ghost"
                                            colorPalette="red"
                                            onClick={() => handleRemove(platform.platform, platform.key)}
                                            disabled={form.processing || removingPlatform !== null}
                                            loading={removingPlatform === platform.platform}
                                        >
                                            <LuTrash2 />
                                        </IconButton>
                                    )}
                                </HStack>
                            </Field.Root>
                        );
                    })}
                </Stack>
                <Flex justifyContent="flex-end" marginTop={6}>
                    <Button
                        type="submit"
                        colorPalette="blue"
                        disabled={form.processing || removingPlatform !== null || !form.isDirty}
                        loading={form.processing}
                    >
                        Save
                    </Button>
                </Flex>
            </form>
        </Box>
    );
}

export default FacilitySocialLinksSection;
