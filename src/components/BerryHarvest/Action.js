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

export default function Action({ selectedDate, setSelectedDate, handleDateChange, name, timeRange }) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box display="flex" flexDirection="row">
                <Box display="flex" flexDirection="column">
                    <Typography> {name} </Typography>
                    {timeRange && (<Typography> {timeRange}</Typography>)}
                </Box>
                <Box py="2vw" />
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
                <Box py="2vw"/>
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'change time',
                    }}
                />
                <Box py="2vw" />
                <Button
                    onClick={() => {
                    setSelectedDate(new Date())
                    }}
                >
                    Now
                </Button>
            </Box>
        </MuiPickersUtilsProvider>
    )
}