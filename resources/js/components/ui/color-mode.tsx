import { 
    IconButton
} from '@chakra-ui/react'
import { forwardRef, type ReactNode, useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export interface ColorModeProviderProps {
    children: ReactNode
}

export function ColorModeProvider(props: ColorModeProviderProps) {
    return props.children
}

export const ColorModeButton = forwardRef<
    HTMLButtonElement,
    Omit<React.ComponentProps<typeof IconButton>, 'aria-label'>
>(function ColorModeButton(props, ref) {
    const [isDark, setIsDark] = useState(false)
    
    const handleToggle = () => {
        setIsDark(!isDark)
        // Basic theme toggle - you can enhance this later
        document.documentElement.style.colorScheme = isDark ? 'light' : 'dark'
    }

    return (
        <IconButton
            onClick={handleToggle}
            variant="ghost"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            size="sm"
            ref={ref}
            color="white"
            {...props}
        >
            {isDark ? <LuSun /> : <LuMoon />}
        </IconButton>
    )
})