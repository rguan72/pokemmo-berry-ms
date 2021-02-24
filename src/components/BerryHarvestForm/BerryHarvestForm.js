import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Action from "../BerryHarvest/Action"
import { Data, BerryMath } from "../../utils"

export default function BerryHarvestForm({ setForm }) {
    const [berry, setBerry] = useState(null)
    const [plantDate, setPlantDate] = useState(null)
    const [number, setNumber] = useState(1)
    const bm = new BerryMath(berry)
    const ranges = bm.getRanges(plantDate)
    function handleDateChangePlant(date) {
        setPlantDate(date)
    }
    function handleChange(event) {
        setBerry(event.target.value);
    };
    function handleNumChange(event) {
        setNumber(event.target.value)
    }
    function saveBerry() {
        const data = new Data("rich")
        data.createBushel("rich", plantDate, berry, number)
    }
    return (
        <Card>
            <Box p="2vw">
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Berry</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={berry}
                        onChange={handleChange}
                        >
                        <MenuItem value={"rawst"}>Rawst</MenuItem>
                        <MenuItem value={"cheri"}>Cheri</MenuItem>
                        <MenuItem value={"pecha"}>Pecha</MenuItem>
                        <MenuItem value={"leppa"}>Leppa</MenuItem>
                    </Select>
                </FormControl>
                <Box m="2vw">
                    <TextField required id="standard-required" label="Number" value={number} onChange={handleNumChange} />
                </Box>
                <Box display="flex" flexDirection="column">
                    <Action 
                        name="Plant Time:"
                        timeRange=""
                        selectedDate={plantDate} 
                        setSelectedDate={setPlantDate} 
                        handleDateChange={handleDateChangePlant} 
                    />
                    <Action 
                        name="Water 1:"
                        timeRange={`${ranges && ranges.waterOneTimeStart} - ${ranges && ranges.waterOneTimeEnd}`}
                        hidden
                    />
                    {bm.type === 20 && 
                    <Action 
                        name="Water 2:"
                        timeRange={`${ranges && ranges.waterTwoTimeStart} - ${ranges && ranges.waterTwoTimeEnd}`}
                        hidden
                    />}
                    <Action 
                        name="Harvest:"
                        timeRange={`${ranges && ranges.harvestTimeStart} - ${ranges && ranges.harvestTimeEnd}`}
                        hidden
                    />
                </Box>
                <Button
                    onClick={() => { 
                        saveBerry()
                        setForm(false)
                    }}
                >
                    Save
                </Button>
                <Button
                    onClick={() => setForm(false)}
                >
                    Close
                </Button>
            </Box>
        </Card>
    )
}