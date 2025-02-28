"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Info as InfoIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { COLORS } from "@/constants/colors";

interface UploadedFile {
  name: string;
  size: number;
}

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [fileList, setFileList] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        name: file.name,
        size: Math.round(file.size / 1024),
      }));
      setFileList([...fileList, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFileList(fileList.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        mx: "auto",
      }}
    >
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h6" fontWeight="bold" display="flex" gap={1}>
          Upload Documents <InfoIcon sx={{ color: "gray" }} />
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Document type
        </Typography>
        <Select
          fullWidth
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
          displayEmpty
          sx={{ mt: 1, mb: 3, bgcolor: COLORS.BG_LIGHT_GREY_COLOR }}
        >
          <MenuItem value="">Select document</MenuItem>
          <MenuItem value="ID">Identification</MenuItem>
          <MenuItem value="Certificate">Certification</MenuItem>
          <MenuItem value="Gov Proof">Gov. Proof</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            border: `1px dashed ${COLORS.BG_LIGHT_GREY_COLOR}`,
            borderRadius: 2,
            p: 3,
            bgcolor: COLORS.BG_LIGHT_GREY_COLOR,
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            type="file"
            hidden
            id="file-input"
            multiple
            onChange={handleFileUpload}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <FileIcon sx={{ fontSize: 40, color: "grey" }} />
            <Typography variant="body2" color="textSecondary">
              Drag and drop file here
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Or
            </Typography>
            <Button variant="primary">Upload</Button>
          </Box>
        </Box>

        {fileList.length > 0 && (
          <Box
            sx={{
              borderRadius: 2,
              p: 2,
              bgcolor: COLORS.BG_LIGHT_GREY_COLOR,
              width: "100%",
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              Uploaded {fileList.length} file{fileList.length > 1 ? "s" : ""}
            </Typography>

            {fileList.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  mb: 1,
                  bgcolor: "white",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FileIcon sx={{ color: COLORS.PRIMARY_COLOR }} />
                  <Typography variant="body2" fontWeight="500">
                    {file.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    {file.size} KB
                  </Typography>
                  <IconButton onClick={() => handleRemoveFile(index)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {fileList.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <input type="checkbox" id="confirm" />
            <Typography variant="body2">
              I confirm that the documents I upload are true and accurate
              documents pertaining to me.
            </Typography>
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Documents;
