import { Button, HStack } from '@chakra-ui/react';
import type { MatchWizard } from './useMatchWizard';

interface Props {
    wizard: MatchWizard;
}

function WizardFooter({ wizard }: Props) {
    return (
        <HStack justify="space-between" w="full">
            {wizard.step > 0 ? (
                <Button variant="ghost" size="sm" onClick={wizard.goBack} disabled={wizard.form.processing}>
                    Back
                </Button>
            ) : (
                <span />
            )}
            {wizard.isLastStep ? (
                <Button colorPalette="blue" size="sm" onClick={wizard.submit} loading={wizard.form.processing}>
                    Submit
                </Button>
            ) : (
                <Button colorPalette="blue" size="sm" onClick={wizard.goForward} disabled={!wizard.canContinue}>
                    Continue
                </Button>
            )}
        </HStack>
    );
}

export default WizardFooter;
