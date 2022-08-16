import { MantineProvider } from '@mantine/core';

import MainAppShell from './MainAppShell';

export default function App({children}) {
    return (
        <MantineProvider 
        withGlobalStyles withNormalizeCSS>
            <MainAppShell>
                {children}
            </MainAppShell>
        </MantineProvider>
    )
}