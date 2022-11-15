import { Button, Grid, Typography, Fade } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";

function Homepage() {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.6), 
                    rgba(0, 0, 0, 0.6)
                  ),url(https://cataas.com/cat?height=1000&width=1000)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      height="100vh"
      width="100vw"
    >
      <Grid container>
        <Fade in={true} timeout={1200}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "floralwhite",
            }}
          >
            <Typography variant="h1">Cataas</Typography>
          </Grid>
        </Fade>
        <Fade in={true} timeout={1800}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginY: "3vh",
              color: "floralwhite",
            }}
          >
            <Typography variant="h3">Cats as a Service</Typography>
          </Grid>
        </Fade>
        <Fade in={true} timeout={2500}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5vh",
              marginY: "5vh",
              color: "floralwhite",
            }}
          >
            <Typography variant="h6">Create your own cat meme!</Typography>
          </Grid>
        </Fade>
        <Fade in={true} timeout={2500}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginY: "5vh",
            }}
          >
            <Button variant="contained">Give me a random cat</Button>
          </Grid>
        </Fade>
        <Fade in={true} timeout={2500}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginY: "5vh",
            }}
          >
            <Button variant="contained">Let me customize my cat</Button>
          </Grid>
        </Fade>
      </Grid>
    </Box>
  );
}

export default Homepage;
