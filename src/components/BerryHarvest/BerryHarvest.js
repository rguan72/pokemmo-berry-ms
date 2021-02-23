import React from "react"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Action from "./Action"

export default function BerryHarvest({ title, number, plant_date, setBerryBushels }) {
    function setSelectedDatePlant(date) {
        console.log("firebase stuff!")
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