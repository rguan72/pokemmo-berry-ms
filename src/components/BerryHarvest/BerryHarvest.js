import React from "react"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Action from "./Action"
import { Data } from "../../utils"

export default function BerryHarvest({ id, title, number, plant_date }) {
    const waterTimeStart = plant_date.getTime() + 4 * 60 * 60 * 1000
    const waterTimeEnd = plant_date.getTime() + 8 * 60 * 60 * 1000
    const harvestTimeStart = plant_date.getTime() + 8 * 60 * 60 * 1000
    const harvestTimeEnd = plant_date.getTime() + 8 * 60 * 60 * 1000
    function setSelectedDatePlant(date) {
        const data = new Data("rich")
        data.updateBushel(id, { plant_date: date })
    }
    function handleDateChangePlant(date) {
        setSelectedDatePlant(date)
    }
    return (
        <Card>
            <Box p="2vw">
                <Typography> {title} x{number} </Typography>
                <Box display="flex" flexDirection="column">
                    <Action 
                        name="Plant Time:"
                        timeRange=""
                        selectedDate={plant_date} 
                        setSelectedDate={setSelectedDatePlant} 
                        handleDateChange={handleDateChangePlant} 
                    />
                    <Action 
                        name="Water 1:"
                        timeRange="X - X"
                        selectedDate={plant_date} 
                        setSelectedDate={setSelectedDatePlant} 
                        handleDateChange={handleDateChangePlant} 
                    />
                    <Action 
                        name="Harvest:"
                        timeRange="X - X:"
                        selectedDate={plant_date} 
                        setSelectedDate={setSelectedDatePlant} 
                        handleDateChange={handleDateChangePlant} 
                    />
                </Box>
            </Box>
        </Card>
    )
}