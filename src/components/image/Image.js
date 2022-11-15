import { useState } from "react";
import {
  Box,
  Button,
  Link,
  Typography,
  Dialog,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

function Image({ imageURL }) {
  const [loading, setLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [open, setOpen] = useState(false);

  // trick to generate a new cat image every time button is clicked
  async function fetchImage(imageURL) {
    setLoading(true);
    await axios.get(imageURL);
    setLoading(false);
  }

  const handleClickOpen = async () => {
    await fetchImage(imageURL);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageURL);
    setCopyMessage("Copied to Clipboard!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imageURL && (
        <>
          {!loading ? (
            <>
              <Button
                onClick={handleClickOpen}
                variant="contained"
                sx={{
                  marginBottom: "2vh",
                  marginTop: "2vh",
                }}
              >
                Sample Image
              </Button>
              <Dialog onClose={handleClose} open={open}>
                <img src={imageURL} alt="sample cat" />
              </Dialog>
            </>
          ) : (
            <CircularProgress />
          )}
          <Typography>
            Your image URL:{" "}
            <Link href={imageURL} target="_blank" rel="noreferrer noopener">
              {imageURL}
            </Link>
          </Typography>
          <Button
            variant="contained"
            onClick={copyToClipboard}
            sx={{
              marginTop: "2vh",
            }}
          >
            Copy to Clipboard
          </Button>
        </>
      )}
      <Typography>{copyMessage}</Typography>
    </Box>
  );
}

export default Image;
