// @ts-ignore-file
/* eslint-disable no-plusplus */
import { Title, Table, Paper, LoadingOverlay } from '@mantine/core';
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

function getIps(nameservers: object) {
  // @ts-ignore
  // eslint-disable-next-line no-prototype-builtins
  if (nameservers.hasOwnProperty('ipAddresses')) return nameservers.ipAddresses.hasOwnProperty('v4') ? nameservers.ipAddresses.v4.join(', ') : '';
  return '';
}

function getRegistrar(vcard: any) {
  // @ts-ignore
  const version_arr = vcard.filter(x => x[0] === 'version');
  const version = version_arr.length > 0 ? version_arr[0][3] : '';
  // @ts-ignore
  const fn_arr = vcard.filter(x => x[0] === 'fn');
  const fn = fn_arr.length > 0 ? fn_arr[0][3] : '';
  // @ts-ignore
  const organization_arr = vcard.filter(x => x[0] === 'org');
  const organization = organization_arr.length > 0 ? organization_arr[0][3] : '';
  // @ts-ignore
  const address_arr = vcard.filter(x => x[0] === 'adr') || '';
  const address = address_arr.length > 0 ? address_arr[0][3].join(' ') : '';
  // @ts-ignore
  const url = '';

  return {
    version,
    organization,
    address,
    url,
    fn,
  };
}

// @ts-ignore
function getRegistrarTable(info: any) {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Organization
          </td>
          <td>
            {info.organization}
          </td>
        </tr>
        <tr>
          <td>
            Function
          </td>
          <td>
            {info.fn}
          </td>
        </tr>
        <tr>
          <td>
            Address
          </td>
          <td>
            {info.address}
          </td>
        </tr>
        <tr>
          <td>
            Url
          </td>
          <td>
            <a href={info.url}>{info.url}</a>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

function getRowElements(json: object) {
  // @ts-ignore
  const nameservers = json.nameservers.map((ns: object) => `${ns.ldhName} (${getIps(ns)})`);
  // @ts-ignore
  const registrar = json.entities.map(
    // @ts-ignore
    (entity: any) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      entity.info = getRegistrar(entity.vcardArray[1]);
      // @ts.ignore
      // eslint-disable-next-line no-param-reassign
      entity.info.url = entity.url;
      return entity;
    }
  );
  return (
    <>
      <tr>
        <td>Registrar</td>
        <td>{getRegistrarTable(registrar[0].info)}</td>
      </tr>
      <tr>
          <td>Nameservers</td>
          <td>{nameservers.join('; ')}</td>
      </tr>
    </>
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
      <Title size="h4">Domain: { domainName }</Title>
      { domainValid && isError
        ? <TextError value={errorMessage} />
        : data
        ? <Table horizontalSpacing="xs">
            <thead>
              <tr>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {getRowElements(data)}
            </tbody>
          </Table>
        : null}
    </Paper>
  );
}
