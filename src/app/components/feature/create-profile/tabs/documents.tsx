"use client";

import { useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { InfoIcon } from "@/app/components/icons/info-icon";
import DocumentFileList from "./documents/document-fileList";
import DocumentConfirmation from "./documents/documen-confirmation";
import DocumentUpload from "./documents/document-upload";
import { UploadedFile } from "@/types/documentTypes";

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [fileList, setFileList] = useState<UploadedFile[]>([]);

  return (
    <Box
      sx={{
        borderRadius: 2,
        mx: "auto",
        mt: 5,
        mb: 5,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        gap={1}
      >
        Upload Documents <InfoIcon />
      </Typography>

      {fileList.length > 0 && <DocumentConfirmation />}

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 3,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 300,
            maxWidth: 400,
          }}
        >
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Document type
          </Typography>
          <Select
            fullWidth
            value={selectedDocument}
            onChange={(e) => setSelectedDocument(e.target.value)}
            displayEmpty
            sx={{
              mt: 1,
              mb: 3,
              borderRadius: 20,
              bgcolor: COLORS.BG_LIGHT_GREY_COLOR,
            }}
          >
            <MenuItem value="">Select document</MenuItem>
            <MenuItem value="ID">Identification</MenuItem>
            <MenuItem value="Certificate">Certification</MenuItem>
            <MenuItem value="Gov Proof">Gov. Proof</MenuItem>
          </Select>

          <DocumentUpload fileList={fileList} setFileList={setFileList} />
        </Box>

        {fileList.length > 0 && (
          <Box
            sx={{
              mt: 2,
              flex: 1,
              minWidth: 300,
            }}
          >
            <DocumentFileList fileList={fileList} setFileList={setFileList} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Documents;
