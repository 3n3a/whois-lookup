import { Paper, Text } from "@mantine/core"

export default function TimeOutput({ output }) {
    return (
        <>
            <Paper shadow="xs" p="md">
                <Text
                    align="center"
                    size="xl"
                    weight="700"
                    >
                    {output}
                </Text>
            </Paper>
        </>
    )
}