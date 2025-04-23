import { Box, Typography, IconButton, LinearProgress } from "@mui/material";
import { PDFIcon } from "@/app/components/icons/pdf-icon";
import { CloseIcon } from "@/app/components/icons/close-icon";
import { UploadedFile } from "@/types/documentTypes";
import { RemoveRedEye } from "@mui/icons-material";
import { DeleteIcon } from "@/app/components/icons/delete-icon";

interface DocumentFileItemProps {
  file?: UploadedFile;
  onRemove: () => void;
  onPreview: Function;
}

const DocumentFileItem: React.FC<DocumentFileItemProps> = ({
  file,
  onRemove,
  onPreview,
}) => {
  const fileInProgress = file?.progress !== undefined && file?.progress < 100;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        p: 1.5,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <PDFIcon />
          <Typography
            variant="body2"
            fontWeight="500"
            noWrap
            sx={{
              maxWidth: {
                xs: 150,
                sm: 200,
                md: 450,
              },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={file?.name}
          >
            {file?.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" color="textSecondary">
            {file?.size} KB
          </Typography>
          {fileInProgress && (
            <LinearProgress
              variant="determinate"
              value={file?.progress}
              sx={{
                minWidth: 400,
                mt: 1,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#E0E0E0",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#FF7A00",
                  borderRadius: 4,
                },
              }}
            />
          )}

          {fileInProgress ? (
            <IconButton onClick={onRemove} size="small">
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton onClick={onRemove} size="small">
              <DeleteIcon />
            </IconButton>
          )}

          {!fileInProgress && (
            <IconButton onClick={() => onPreview()} size="small">
              <RemoveRedEye />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentFileItem;
