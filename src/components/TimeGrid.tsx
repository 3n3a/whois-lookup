import { Grid } from '@mantine/core';
import { TimeApp } from '../models/TimeApp';

export default function TimeGrid({ apps }) {
    return (
        <Grid>
            {apps.map((a: TimeApp) => {
                return (
                    <Grid.Col key={a.title} md={6} lg={3}>
                        <a href={a.link}>
                            {a.title}
                        </a>
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}