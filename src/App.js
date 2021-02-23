import React, { useState, useEffect } from "react"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import BerryHarvest from "./components/BerryHarvest"


function App() {
  const [berryBushels, setBerryBushels] = useState([{title: "Rawst", number: 10, plant_date: new Date()}]);
  const harvests = berryBushels.map((bushel, idx) => <BerryHarvest {...bushel} key={idx}  />)
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box mt="2vh" ml="2vh">
            {harvests}
        </Box>
    </Box>
  );
}

export default App;
