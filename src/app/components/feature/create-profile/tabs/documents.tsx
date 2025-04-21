"use client";

import { useState } from "react";
import { Box, Typography, Select, MenuItem, Divider } from "@mui/material";
import { InfoIcon } from "@/app/components/icons/info-icon";
import DocumentFileList from "./documents/document-fileList";
import DocumentConfirmation from "./documents/documen-confirmation";
import DocumentUpload from "./documents/document-upload";
import { UploadedFile } from "@/types/documentTypes";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [fileList, setFileList] = useState<UploadedFile[]>([]);
  const router = useRouter();
  return (
    <Box
      sx={{
        borderRadius: 2,
        mx: "auto",
        mt: 5,
        mb: "100px",
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

      <DocumentConfirmation />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 3,
          alignItems: "flex-start",
          flexWrap: "wrap",
          mb: 3,
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
              borderRadius: "50px",
              border: "1px solid #ADAEAF",
            }}
          >
            <MenuItem value="">Select document</MenuItem>
            <MenuItem value="ID">Identification</MenuItem>
            <MenuItem value="Certificate">Certification</MenuItem>
            <MenuItem value="Gov Proof">Gov. Proof</MenuItem>
          </Select>

          <DocumentUpload
            fileList={fileList}
            setFileList={setFileList}
            selectedDocument={selectedDocument}
          />
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

      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CustomButton
          variant="primary"
          onClick={() => router.push("/job/posts")}
          sx={{ px: 3, height: 40 }}
          disabled={fileList.length === 0}
        >
          Go to Job Posts
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Documents;
