import { MantineProvider } from '@mantine/core';
import { TimeApp } from '../models/TimeApp';

import MainAppShell from './MainAppShell';
import TimeBetween from './TimeBetween';
import TimeGrid from './TimeGrid';

const apps: TimeApp[] = [
	{ title: 'Time Between', link: '/between' }
]

const pages = {
    '/': <TimeGrid apps={apps} />,
    '/between': <TimeBetween />
}

export default function App({path}) {
    return (
        <MantineProvider 
        withGlobalStyles withNormalizeCSS>
            <MainAppShell>
                {pages[path]}
            </MainAppShell>
        </MantineProvider>
    )
}