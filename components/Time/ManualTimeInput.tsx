import { Text, TextInput } from "@mantine/core";

export function ManualTimeInput({ unit, value, onChange }) {
    
    function unitPart(): JSX.Element {
        return (
            <Text>{unit}</Text>
        );
    }
    
    return (
        <>
          <TextInput
      type="number"
      placeholder="30"
      label="Enter break tome"
      rightSection={unitPart}
      rightSectionWidth={92}
      value={value}
      onChange={onChange}
    />
        </>
    )
}