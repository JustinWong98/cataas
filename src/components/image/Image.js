import { useState, useRef, useEffect } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import axios from "axios";

function Image({ imageURL }) {
  // since the cat image generated is random - we need to provide a way for the user to save an image
  const [image, setImage] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageURL);
    setCopyMessage("Copied to Clipboard!");
  };
  useEffect(() => {
    async function fetchImage() {
      const imageResult = await axios.get(imageURL);
      console.log(imageResult);
      setImage(imageResult);
    }
    fetchImage();
  }, [imageURL]);

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
          <Typography> Sample Image</Typography>
          <img src={imageURL} width="40%" height="40%" />
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
