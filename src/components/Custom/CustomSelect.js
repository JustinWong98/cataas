import React from "react";
import { Select } from "formik-material-ui";

function CustomSelect(props) {
  return (
    <Select
      {...props}
      sx={{
        color: "#4caf50",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#4caf50",
        },
      }}
    />
  );
}

export default CustomSelect;
