import React, { useState } from "react";
import {
  Button,
  Input,
  MenuItem,
  FormControl,
  Select,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [originalImageSrc, setOriginalImageSrc] = useState("");
  const [processedImageSrc, setProcessedImageSrc] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Read the file and set it as the original image source
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("filter", selectedFilter);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProcessedImageSrc(`data:image/jpeg;base64,${response.data}`);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        textAlign="center"
        sx={{ color: "white" }}
      >
        Digital Image Processing
      </Typography>
      <Paper
        elevation={4}
        sx={{
          p: 12,
          pt: 3,
          pb: 3,
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(255,255,255,0.2)",
          color: "white",
        }}
      >
        <Typography variant="h3" gutterBottom textAlign="center">
          Filters
        </Typography>
        <Input
          type="file"
          onChange={handleFileChange}
          disableUnderline
          inputProps={{ accept: "image/*" }}
          sx={{
            mb: 2,
            background: "white",
            height: 50,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "black",
          }}
        />
        <Box sx={{ display: "flex", width: "100%", mb: 2 }}>
          <FormControl sx={{ flex: 1, mr: 1 }}>
            <Select
              value={selectedFilter}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "4px",
                "& .MuiSelect-select": {
                  padding: "10px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "black",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="gaussian_lowpass">
                Lowpass Gaussian Filter - Spatial Domain
              </MenuItem>
              <MenuItem value="butterworth_lowpass">
                Lowpass Butterworth Filter - Frequency Domain
              </MenuItem>
              <MenuItem value="laplacian_highpass">
                HighPass Laplacian Filter - Spatial Domain
              </MenuItem>
              <MenuItem value="histogram_matching">Histogram Matching</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              flex: "none",
              backgroundColor: "yellow",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Apply Filter
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {originalImageSrc && (
            <Box sx={{ maxWidth: "50%", p: 1, pb: 0, pt: 0 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                Original Image
              </Typography>
              <img
                src={originalImageSrc}
                alt="Original"
                style={{ width: "100%" }}
              />
            </Box>
          )}
          {processedImageSrc && (
            <Box sx={{ maxWidth: "50%", p: 1, pt: 0 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                Processed Image
              </Typography>
              <img
                src={processedImageSrc}
                alt="Processed"
                style={{ width: "100%" }}
              />
            </Box>
          )}
        </Box>
      </Paper>
      <Box sx={{ maxWidth: "50%", p: 1, pb: 0, pt: 0 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            pt: 2,
            pb: 0,
          }}
        >
          Developed by Aneesh Lalwani❤️
        </Typography>
      </Box>
    </Box>
  );
};

export default MainPage;
