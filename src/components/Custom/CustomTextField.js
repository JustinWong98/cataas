import React from "react";
import { TextField } from "formik-material-ui";

function CustomTextField(props) {
  return (
    <TextField
      inputProps={{ style: { color: "#4caf50" } }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#4caf50",
          },
          "&:hover fieldset": {
            borderColor: "#4caf50",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4caf50",
          },
        },
      }}
      {...props}
      variant="outlined"
    />
  );
}

export default CustomTextField;
