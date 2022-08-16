import { Paper, Text } from "@mantine/core"

export default function TimeOutput({ unit, output }) {
    return (
        <>
            <Paper shadow="xs" p="md">
                <Text
                    align="center"
                    size="xl"
                    weight="700"
                    >
                    {output} {unit}
                </Text>
            </Paper>
        </>
    )
}