import { NumberInput, Select } from "@mantine/core";

//@ts-ignore
export function ManualTimeInput({ value, onChange }) {
    
    const values = [
        {label: '30 min', value: '30'},
        {label: '45 min', value: '45'},
        {label: '60 min', value: '60'},
        {label: '90 min', value: '90'},
    ]
    
    return (
        <>
          <NumberInput value={value} onChange={onChange} />
        </>
    )
}