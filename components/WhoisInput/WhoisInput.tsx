import { TextInput } from '@mantine/core';

type Props = {
    value: string;
    setValue: Function;
    validity: boolean;
  };

export function WhoisInput({ value, setValue, validity }: Props) {
  if (validity || value.length === 0) {
    return <TextInput placeholder="Enter Domain Name" value={value} onChange={(event) => setValue(event.currentTarget.value)} />;
  }
  return <TextInput placeholder="Enter Domain Name" value={value} onChange={(event) => setValue(event.currentTarget.value)} error="Please enter a valid domain name." />;
}
