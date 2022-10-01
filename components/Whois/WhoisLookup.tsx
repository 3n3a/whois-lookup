import { Stack, Title } from '@mantine/core';
import { useState } from 'react';
import isValidDomain from 'is-valid-domain';
import { useDebouncedValue } from '@mantine/hooks';
import { WhoisDisplay } from '../WhoisDisplay/WhoisDisplay';
import { WhoisInput } from '../WhoisInput/WhoisInput';

export function WhoisLookup() {
    const [domain, setDomain] = useState('');
    const [validDomain, setValidDomain] = useState(false);

    const [debouncedValidity] = useDebouncedValue(validDomain, 600);
    const [debouncedDomain] = useDebouncedValue(domain, 400);

    const setDomainAndValidity = (domainName: string) => {
        setDomain(domainName);
        setValidDomain(
            isValidDomain(domainName)
        );
    };

    return (
        <Stack>
            <Title order={1}>Lookup Domain Owner</Title>
            <WhoisInput value={domain} setValue={setDomainAndValidity} validity={validDomain} />
            <WhoisDisplay domainName={debouncedDomain} domainValid={debouncedValidity} />
        </Stack>
    );
}
