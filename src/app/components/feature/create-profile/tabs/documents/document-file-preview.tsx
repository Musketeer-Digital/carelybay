"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { UploadedFile } from "@/types/documentTypes";

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: Function;
  selectedFile: UploadedFile | undefined;
}

const DocumentFilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  selectedFile,
}) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  // Generate a preview URL when the file is selected
  useEffect(() => {
    if (selectedFile?.file) {
      const previewUrl = URL.createObjectURL(selectedFile.file);
      setFilePreviewUrl(previewUrl);
    }

    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl); // Cleanup when modal closes
      }
    };
  }, [selectedFile]);

  return (
    <CustomDialog
      open={isOpen}
      onClose={() => onClose()}
      title="Confirm and upload your file"
      maxWidth="lg"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => onClose()}
          sx={{
            px: 3,
            borderRadius: 20,
            height: 40,
            color: COLORS.WHITE_COLOR,
          }}
        >
          Close
        </CustomButton>
      }
    >
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Please confirm before uploading your PDF
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          bgcolor: "#F4F7FC",
          borderRadius: 2,
          p: 4,
          width: "100%",
          minHeight: "60vh",
          position: "relative",
        }}
      >
        {selectedFile && selectedFile.file.type ? (
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              maxHeight: "60vh",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              src={filePreviewUrl!}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                border: "none",
              }}
            ></iframe>
          </Box>
        ) : (
          <>
            <PictureAsPdfIcon
              sx={{ fontSize: 80, color: COLORS.PRIMARY_COLOR }}
            />
            <Typography
              variant="body1"
              sx={{ mt: 2, color: COLORS.GREY_COLOR, fontWeight: 500 }}
            >
              {selectedFile?.name} (
              {selectedFile?.size ? Math.round(selectedFile?.size / 1024) : "0"}{" "}
              KB)
            </Typography>
          </>
        )}
      </Box>
    </CustomDialog>
  );
};

export default DocumentFilePreviewModal;
