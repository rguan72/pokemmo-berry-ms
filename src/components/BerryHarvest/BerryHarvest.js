import React from "react"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Action from "./Action"
import { Data, BerryMath } from "../../utils"

export default function BerryHarvest({ uid, id, title, number, plant_date, waterone_date, watertwo_date, harvest_date, readOnly }) {
    const bm = new BerryMath(title)
    const ranges = bm.getRanges(plant_date, waterone_date)
    const titleCapitalized = title.charAt(0).toUpperCase() + title.slice(1)
    function setSelectedDatePlant(date) {
        const data = new Data(uid)
        data.updateBushel(id, { plant_date: date })
    }
    function setSelectedDateWaterOne(date) {
        const data = new Data(uid)
        data.updateBushel(id, { waterone_date: date })
    }
    function setSelectedDateHarvest(date) {
        const data = new Data(uid)
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
                        readOnly={readOnly}
                    />
                    <Action
                        name="Water 1:"
                        timeRange={`${ranges && ranges.waterOneTimeStart} - ${ranges && ranges.waterOneTimeEnd}`}
                        selectedDate={waterone_date} 
                        setSelectedDate={setSelectedDateWaterOne} 
                        handleDateChange={setSelectedDateWaterOne}
                        readOnly={readOnly}
                    />
                    <Action
                        name="Harvest:"
                        timeRange={`${ranges && ranges.harvestTimeStart} - ${ranges && ranges.harvestTimeEnd}`}
                        selectedDate={harvest_date} 
                        setSelectedDate={setSelectedDateHarvest} 
                        handleDateChange={setSelectedDateHarvest} 
                        readOnly={readOnly}
                    />
                </Box>
                {!readOnly && <Button
                    onClick={() => {
                        const data = new Data(uid)
                        data.updateBushel(id, { archived: true })
                    }}
                >
                    Archive
                </Button>}
            </Box>
        </Card>
    )
}