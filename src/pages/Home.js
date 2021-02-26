import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import BerryHarvest from "../components/BerryHarvest"
import BerryHarvestForm from "../components/BerryHarvestForm";
import { Data } from "../utils"


function Home() {
  const [bushels, setBushels] = useState([])
  const [form, setForm] = useState(false)
  useEffect(() => {
    const data = new Data("rich")
    return data.watchBushels(setBushels)
  }, [])

  const harvests = bushels.map((bushel, idx) => <BerryHarvest {...bushel} key={idx} readOnly={false} />)
  return (
    <Box>
        <Box mt="1vh" ml="2vh">
            <Link to="/archive">Archive</Link>
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Box mt="2vh" ml="2vh"> 
                {harvests}
            </Box>
            {form && <BerryHarvestForm setForm={setForm} />}
            <Card>
            <CardActionArea
                onClick={() => setForm(true)}
            >
                <Typography>+</Typography>
            </CardActionArea>
            </Card>
        </Box>
    </Box>
  );
}

export default Home;
