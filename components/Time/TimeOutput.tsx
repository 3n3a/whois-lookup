import { Paper, Text } from "@mantine/core"


//@ts-ignore
export default function TimeOutput({ unit, output }) {
    return (
        <>
            <Paper shadow="xs" p="md">
                <Text
                    align="center"
                    size="xl"
                    weight="bolder"
                    >
                    {output} {unit}
                </Text>
            </Paper>
        </>
    )
}