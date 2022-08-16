import { useState } from "react";
import { Stack } from "@mantine/core";

import { TimeInput } from "@mantine/dates";

import {Clock} from "tabler-icons-react";

export default function TimeControls({ value, onChange }) {

  const [time, setTime] = useState<[Date, Date]>(value)

  const updateStart = start => {
    setTime((c) => ([start, c[1]]))
    onChange([start, time[1]])
  }

  const updateEnd = end => {
    setTime((c) => ([c[0], end]))
    onChange([time[0], end])
  }

  return (
    <>
      <Stack>
        <TimeInput label="Start Time" value={time[0]} format='24' locale='de-ch' icon={<Clock size={16} />} onChange={updateStart}></TimeInput>
        <TimeInput label="End Time" value={time[1]} format='24' locale='de-ch' icon={<Clock size={16} />} onChange={updateEnd}></TimeInput>
      </Stack>
    </>
  );
}
