import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import BerryHarvest from "../components/BerryHarvest"
import { Data } from "../utils"

export default function Archive() {
    const [bushels, setBushels] = useState([])
    useEffect(() => {
        const data = new Data("rich")
        return data.watchBushelsArchive(setBushels)
    }, [])
    const harvests = bushels.map((bushel, idx) => <BerryHarvest {...bushel} key={idx} readOnly />)
    return (
        <Box>
            <Box mt="1vh" ml="2vh">
                <Link to="/">Home</Link>
            </Box>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Box mt="2vh" ml="2vh"> 
                    {harvests}
                </Box>
            </Box>
        </Box>
    )

}