import React, { useState, useEffect } from "react"
import Box from "@material-ui/core/Box"
import BerryHarvest from "./components/BerryHarvest"
import { Data } from "./utils"


function App() {
  const [bushels, setBushels] = useState([]);
  useEffect(() => {
    const data = new Data("rich")
    return data.watchBushels(setBushels)
  }, [])

  const harvests = bushels.map((bushel, idx) => <BerryHarvest {...bushel} key={idx}  />)
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box mt="2vh" ml="2vh"> 
            {harvests}
        </Box>
    </Box>
  );
}

export default App;
