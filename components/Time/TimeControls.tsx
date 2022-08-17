import { useState } from "react";
import { Stack } from "@mantine/core";

import { TimeInput } from "@mantine/dates";

import {IconClock} from "@tabler/icons"
import { ManualTimeInput } from "./ManualTimeInput";

//@ts-ignore
export default function TimeControls({ value, onChange }) {

  const [time, setTime] = useState<[Date, Date, Number]>(value)

  //@ts-ignore
  const updateStart = start => {
    setTime((c) => ([start, c[1], c[2]]))
    onChange([start, time[1], time[2]])
  }

  //@ts-ignore
  const updateEnd = end => {
    setTime((c) => ([c[0], end, c[2]]))
    onChange([time[0], end, time[2]])
  }

  //@ts-ignore
  const updateBreak = breakTime => {
    if (!breakTime || breakTime <= 0) breakTime = 0
      
    setTime((c) => ([c[0], c[1], breakTime]))
    onChange([time[0], time[1], breakTime])
    
  }

  return (
    <>
      <Stack>
        <TimeInput label="Start Time" value={time[0]} format='24' icon={<IconClock size={16} />} onChange={updateStart}></TimeInput>
        <ManualTimeInput value={time[2]} onChange={updateBreak}></ManualTimeInput>
        <TimeInput label="End Time" value={time[1]} format='24' icon={<IconClock size={16} />} onChange={updateEnd}></TimeInput>
      </Stack>
    </>
  );
}
