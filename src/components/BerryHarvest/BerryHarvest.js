import React from "react"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Action from "./Action"
import { Data, Time, BerryMath } from "../../utils"

export default function BerryHarvest({ id, title, number, plant_date, waterone_date, harvest_date }) {
    const bm = new BerryMath(title)
    const ranges = bm.getRanges(plant_date)
    const titleCapitalized = title.charAt(0).toUpperCase() + title.slice(1)
    function setSelectedDatePlant(date) {
        const data = new Data("rich")
        data.updateBushel(id, { plant_date: date })
    }
    function setSelectedDateWaterOne(date) {
        const data = new Data("rich")
        console.log({ date: date })
        data.updateBushel(id, { waterone_date: date })
    }
    function setSelectedDateHarvest(date) {
        const data = new Data("rich")
        data.updateBushel(id, { harvest_date: date })
    }
    return (
        <Card>
            <Box p="2vw">
                <Typography> {titleCapitalized} x{number} </Typography>
                <Box display="flex" flexDirection="column">
                    <Action 
                        name="Plant Time:"
                        timeRange=""
                        selectedDate={plant_date} 
                        setSelectedDate={setSelectedDatePlant} 
                        handleDateChange={setSelectedDatePlant} 
                    />
                    <Action
                        name="Water 1:"
                        timeRange={`${ranges && ranges.waterOneTimeStart} - ${ranges && ranges.waterOneTimeEnd}`}
                        selectedDate={waterone_date} 
                        setSelectedDate={setSelectedDateWaterOne} 
                        handleDateChange={setSelectedDateWaterOne} 
                    />
                    <Action
                        name="Harvest:"
                        timeRange={`${ranges && ranges.harvestTimeStart} - ${ranges && ranges.harvestTimeEnd}`}
                        selectedDate={harvest_date} 
                        setSelectedDate={setSelectedDateHarvest} 
                        handleDateChange={setSelectedDateHarvest} 
                    />
                </Box>
                <Button
                    onClick={() => {
                        const data = new Data("rich")
                        data.updateBushel(id, { archived: true })
                    }}
                >
                    Archive
                </Button>
            </Box>
        </Card>
    )
}