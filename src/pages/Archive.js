import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import BerryHarvest from "../components/BerryHarvest"
import { Data } from "../utils"

export default function Archive({ user, test }) {
    const [bushels, setBushels] = useState([])
    useEffect(() => {
        // console.log(uid)
        // console.log(test)
        const data = new Data(user.uid)
        return data.watchBushelsArchive(setBushels)
    }, [user])
    const harvests = bushels.map((bushel, idx) => <BerryHarvest {...bushel} uid={user.uid} key={idx} readOnly />)
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