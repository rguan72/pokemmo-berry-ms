import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

export default function Action({ selectedDate, setSelectedDate, handleDateChange, name, timeRange, hidden }) {
    const timeset = (
        <Box display="flex" flexDirection="row">
            <KeyboardDatePicker
                margin="normal"
                label="Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
            />
            <KeyboardTimePicker
                margin="normal"
                label="Time"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
            />
            <Button
                onClick={() => {
                setSelectedDate(new Date())
                }}
            >
                Now
            </Button>
        </Box>
    )
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box display="flex" flexDirection="column">
                <Box mt="3vh" display="flex" flexDirection="column">
                    <Typography variant="h6"> {name} </Typography>
                    {timeRange && (<Typography> {timeRange}</Typography>)}
                </Box>
                {!hidden && timeset}
            </Box>
        </MuiPickersUtilsProvider>
    )
}