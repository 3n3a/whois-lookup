import { Text, TextInput } from "@mantine/core";

//@ts-ignore
export function ManualTimeInput({ value, onChange }) {
    
    return (
        <>
          <TextInput
      type="number"
      placeholder="30 min"
      label="Enter break time"
      value={value}
      onChange={onChange}
    />
        </>
    )
}