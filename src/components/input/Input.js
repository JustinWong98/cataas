import { useState, Children, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Autocomplete,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  Stepper,
  Step,
  StepLabel,
  Zoom,
} from "@mui/material";
import { Field, Form, Formik, useFormik } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import { object, number, string } from "yup";

import CustomTextField from "../Custom/CustomTextField";
import CustomSelect from "../Custom/CustomSelect";
import Image from "../image/Image";

const InputForm = () => {
  useEffect(() => {
    async function fetchTags() {
      const tags = await axios.get("https://cataas.com/api/tags");
      setTags(tags.data);
    }
    fetchTags();
  }, []);

  const filterSettings = [
    "none",
    "blur",
    "mono",
    "sepia",
    "negative",
    "paint",
    "pixel",
  ];
  const typeSettings = ["none", "small", "medium", "square", "original"];
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState();
  const [heightOrWidth, setHeightOrWidth] = useState("none");
  const [imageURL, setImageURL] = useState("");
  const { handleChange } = useFormik({});
  const handleHeightOrWidth = (e) => {
    setHeightOrWidth(e.target.value);
  };

  const constructUrl = (formValues) => {
    let outputURL = "https://cataas.com/cat";
    console.log(formValues);
    if (formValues.gif) {
      outputURL += "/gif";
    }
    if (formValues.tag.length > 0 && !formValues.gif) {
      outputURL += `/${formValues.tag}`;
    }
    if (formValues.says.length > 0) {
      formValues.says = formValues.says.replace(/\s/g, "%20");
      outputURL += `/says/${formValues.says}`;
    }
    if (formValues.type.length > 0 && formValues.type !== "none") {
      outputURL += `?type=${formValues.type}`;
    }
    if (formValues.filter.length > 0 && formValues.filter !== "none") {
      outputURL += `?filter=${formValues.filter}`;
    }
    if (heightOrWidth === "height" && Number(formValues.height) > 0) {
      outputURL += `?height=${formValues.height}`;
    } else if (heightOrWidth === "width" && Number(formValues.width) > 0) {
      outputURL += `?width=${formValues.width}`;
    }
    setImageURL(outputURL);
  };

  return (
    <Container
      sx={{
        display: "flex column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.8), 
                    rgba(0, 0, 0, 0.8)
                  ),url(https://cataas.com/cat)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FormikStepper
          validationSchema={object({
            says: string().nullable(),
          })}
          initialValues={{
            tag: "",
            gif: false,
            says: "",
            filter: "none",
            width: undefined,
            height: undefined,
            type: "none",
          }}
          onSubmit={(values) => {
            if (currentTag) {
              values.tag = currentTag;
            }
            constructUrl(values);
          }}
          onChange={handleChange}
        >
          <FormikStep label="Image File Type">
            <Box
              paddingBottom={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Zoom in={true}>
                <Typography variant="body1" paddingLeft="5%">
                  First off, would you like your cat to only be in GIF
                  form(default is image)?
                </Typography>
              </Zoom>
              <Field
                name="gif"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: "Gif me a gif!" }}
                sx={{
                  color: "#4caf50",
                }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            validationSchema={object({
              says: string().nullable(),
            })}
            label="Cat Text"
          >
            <Box
              paddingBottom={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Zoom in={true}>
                <Typography variant="body1">
                  What do you want your cat to say?
                </Typography>
              </Zoom>
              <Field name="says" component={CustomTextField} label="Meow!" />
            </Box>
          </FormikStep>
          <FormikStep label="Cat Tags">
            <Box
              paddingBottom={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Zoom in={true}>
                <Typography variant="body1" paddingLeft="5%">
                  Want a specific tag for your cat? (Not applicable for GIF
                  images, sorry!)
                </Typography>
              </Zoom>
            </Box>
            <Box paddingBottom={2}>
              <Autocomplete
                disablePortal
                id="tags"
                options={tags}
                onChange={(e, value) => {
                  setCurrentTag(value);
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <Field
                    component={CustomTextField}
                    {...params}
                    name="tags"
                    label="Tags for your cat!"
                    variant="outlined"
                    sx={{
                      input: {
                        color: "#4caf50",
                      },
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
                  />
                )}
              />
            </Box>
          </FormikStep>
          <FormikStep
            validationSchema={object({
              height: number().lessThan(1001).integer().positive().nullable(),
              width: number().lessThan(1001).integer().positive().nullable(),
            })}
            label="Additional Image Settings"
          >
            <Box
              paddingBottom={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Zoom in={true}>
                <Typography variant="body1">Any filters?</Typography>
              </Zoom>
              <Field
                component={CustomSelect}
                options={filterSettings}
                name="filter"
              >
                {filterSettings.map((filter) => (
                  <MenuItem
                    key={filter}
                    value={filter}
                    sx={{ selected: { color: "#4caf50" } }}
                  >
                    {filter}
                  </MenuItem>
                ))}
              </Field>
              <Zoom in={true} style={{ transitionDelay: "500ms" }}>
                <Typography variant="body1">
                  Any additional size settings?
                </Typography>
              </Zoom>
              <Field
                component={CustomSelect}
                options={typeSettings}
                name="type"
              >
                {typeSettings.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Field>
              <Zoom in={true} style={{ transitionDelay: "1000ms" }}>
                <Typography variant="body1" maxWidth="75vw">
                  ...Or you can specify either the image width OR height, not
                  both(up to 1000px).
                </Typography>
              </Zoom>
              <RadioGroup
                row
                name="heightWidthSelector"
                value={heightOrWidth}
                onChange={handleHeightOrWidth}
              >
                <FormControlLabel
                  value="none"
                  control={
                    <Radio
                      sx={{
                        color: "#4caf50",
                      }}
                    />
                  }
                  label="None"
                />
                <FormControlLabel
                  value="height"
                  control={
                    <Radio
                      sx={{
                        color: "#4caf50",
                      }}
                    />
                  }
                  label="Height"
                />
                <FormControlLabel
                  value="width"
                  control={
                    <Radio
                      sx={{
                        color: "#4caf50",
                      }}
                    />
                  }
                  label="Width"
                />
              </RadioGroup>
              {heightOrWidth === "height" && (
                <Field
                  name="height"
                  type={"number"}
                  component={CustomTextField}
                  label="Height in px"
                />
              )}
              {heightOrWidth === "width" && (
                <Field
                  name="width"
                  type="number"
                  component={CustomTextField}
                  label="Width in px"
                />
              )}
              <Image imageURL={imageURL} />
            </Box>
          </FormikStep>
        </FormikStepper>
      </Box>
    </Container>
  );
};

const FormikStep = ({ children, ...props }) => {
  return <>{children}</>;
};

export const FormikStepper = ({ children, ...props }) => {
  const childrenArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  function isLastPage() {
    return step === childrenArray.length - 1;
  }
  return (
    <Formik
      {...props}
      enableReinitialize="true"
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastPage()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
      sx={{ width: "25%" }}
    >
      {(props) => (
        <Form autoComplete="off" values={props.values}>
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child) => (
              <Step
                key={child.props.label}
                sx={{
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "#52af4c",
                    },
                  "& .MuiSvgIcon-root": { color: "#4caf50" },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    { color: "#4caf50" },
                }}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}

          <Box
            paddingBottom={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {step > 0 ? (
              <Button
                onClick={() => setStep((e) => e - 1)}
                variant="outlined"
                sx={{
                  marginBottom: "5%",
                }}
              >
                Back
              </Button>
            ) : null}
            <Button type="submit" variant="contained">
              {isLastPage() ? "Generate my cat!" : "Next"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default InputForm;
