import { Text } from '@mantine/core';

type Props = {
    value: object;
};

export function TextError({ value }: Props) {
    return (
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: 'red', to: 'orange', deg: 45 }}
          size="xl"
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
           {/* @ts-ignore */}
           {value.message}
        </Text>
    );
}
