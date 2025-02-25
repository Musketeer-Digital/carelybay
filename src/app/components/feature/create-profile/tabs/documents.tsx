"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Info as InfoIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          Upload Documents <InfoIcon sx={{ color: "gray" }} />
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Document type
        </Typography>
        <Select
          fullWidth
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
          displayEmpty
          sx={{ mt: 1, mb: 3, bgcolor: "#f8f8f8" }}
        >
          <MenuItem value="">Select document</MenuItem>
          <MenuItem value="ID">Identification</MenuItem>
          <MenuItem value="Certificate">Certification</MenuItem>
        </Select>
        <Box
          sx={{
            border: "1px dashed #ccc",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            bgcolor: "#f9f9f9",
          }}
        >
          <input
            type="file"
            hidden
            id="file-input"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-input">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <FileIcon sx={{ fontSize: 40, color: "gray" }} />
              <Typography variant="body2" color="textSecondary">
                Drag and drop file here
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Or
              </Typography>
              <Button
                variant="contained"
                disabled
                sx={{ mt: 1, bgcolor: "#ddd", color: "gray" }}
              >
                Upload
              </Button>
            </Box>
          </label>
        </Box>
      </Box>
    </Box>
  );
};

export default Documents;
