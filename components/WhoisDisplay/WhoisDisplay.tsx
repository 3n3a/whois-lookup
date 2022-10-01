import { Text, Paper, LoadingOverlay } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TextError } from './TextError';

type Props = {
    domainName: string;
    domainValid: boolean;
};

function useLookup(domainName: string, domainValid: boolean) {
    const url: string = `/api/lookup/${domainName}`;

    // see https://react-query.tanstack.com/guides/important-defaults
    // see https://react-query.tanstack.com/guides/paginated-queries
    return useQuery(
      ['whoisLookup', { domainName }],
      () => axios
        .get(url)
        .then((res) => res.data),
      // the following can be used to avoid refetches on already fetched data (see paginated queries docs)
      // { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
      { enabled: domainValid, retry: false }
    );
  }

export function WhoisDisplay({ domainName, domainValid }: Props) {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
  } = useLookup(domainName, domainValid);

  //@ts-ignore
  const errorMessage: object = error;

  return (
    <Paper shadow="xs" p="md" withBorder style={{ minHeight: 200, position: 'relative' }}>
      <LoadingOverlay visible={domainValid && (isLoading || isFetching)} overlayBlur={2} />
      <Text>Domain: { domainName }</Text>
      { domainValid && isError
        ? <TextError value={errorMessage} />
        : data
        ? <Text>
           {JSON.stringify(data)}
          </Text>
        : null}
    </Paper>
  );
}
