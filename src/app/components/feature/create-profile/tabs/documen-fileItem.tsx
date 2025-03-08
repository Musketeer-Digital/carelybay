import { Box, Typography, IconButton } from "@mui/material";
import { PDFIcon } from "@/app/components/icons/pdf-icon";
import { CloseIcon } from "@/app/components/icons/close-icon";

interface UploadedFile {
  name: string;
  size: number;
}

interface DocumentFileItemProps {
  file: UploadedFile;
  onRemove: () => void;
}

const DocumentFileItem: React.FC<DocumentFileItemProps> = ({
  file,
  onRemove,
}) => {
  return (
    <Box
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
        <PDFIcon />
        <Typography variant="body2" fontWeight="500">
          {file.name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="caption" color="textSecondary">
          {file.size} KB
        </Typography>
        <IconButton onClick={onRemove}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DocumentFileItem;
