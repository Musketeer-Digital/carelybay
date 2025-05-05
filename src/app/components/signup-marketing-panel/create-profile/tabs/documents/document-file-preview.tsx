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
  onClose: () => void;
  selectedFile?: UploadedFile;
}

const DocumentFilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  selectedFile,
}) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile?.file) {
      const url = URL.createObjectURL(selectedFile.file);
      setFilePreviewUrl(url);
    }

    return () => {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    };
  }, [selectedFile]);

  const isPdf = selectedFile?.file?.type === "application/pdf";
  const isImage = selectedFile?.file?.type?.startsWith("image");

  return (
    <CustomDialog
      open={isOpen}
      onClose={onClose}
      title="Confirm and preview your file"
      maxWidth="lg"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={onClose}
          sx={{ px: 3, height: 40, color: COLORS.WHITE_COLOR }}
        >
          Close
        </CustomButton>
      }
    >
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Please confirm before uploading your file
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
        {selectedFile && filePreviewUrl ? (
          <>
            {isPdf && (
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "50vh", md: "70vh" },
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <iframe
                  src={filePreviewUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "8px",
                  }}
                ></iframe>
              </Box>
            )}

            {isImage && (
              <Box
                component="img"
                src={filePreviewUrl}
                alt="Uploaded preview"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  borderRadius: 2,
                  objectFit: "contain",
                }}
              />
            )}
          </>
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
              {selectedFile?.size ? Math.round(selectedFile.size / 1024) : "0"}{" "}
              KB)
            </Typography>
          </>
        )}
      </Box>
    </CustomDialog>
  );
};

export default DocumentFilePreviewModal;
