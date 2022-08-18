import { NumberInput, Select, Text } from "@mantine/core";

//@ts-ignore
export function ManualTimeInput({ value, onChange }) {
    
    return (
        <>
          <NumberInput label='Break Time' value={value} onChange={onChange} />
        </>
    )
}