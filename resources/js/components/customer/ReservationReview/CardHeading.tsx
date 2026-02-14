import { Heading } from '@chakra-ui/react';
import typographyTokens from '../../../lib/tokens/typography';

export interface CardHeadingProps {
    text: string;
}

function CardHeading({ text }: CardHeadingProps) {
    return (
        <Heading fontSize={typographyTokens.title.fontSize.lg} mb={4}>
            {text}
        </Heading>
    );
}

export default CardHeading;
