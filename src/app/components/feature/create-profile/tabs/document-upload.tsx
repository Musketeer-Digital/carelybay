import { Box, Button, Divider, Typography } from "@mui/material";
import { UploadIcon } from "@/app/components/icons/upload-icon";
import CustomButton from "@/app/components/CustomButton";
import { COLORS } from "@/constants/colors";

interface DocumentUploadProps {
  fileList: { name: string; size: number }[];
  setFileList: (files: { name: string; size: number }[]) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  fileList,
  setFileList,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        name: file.name,
        size: Math.round(file.size / 1024),
      }));
      setFileList([...fileList, ...newFiles]);
    }
  };

  return (
    <Box
      sx={{
        border: "1px dashed",
        borderRadius: 2,
        p: 3,
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
        justifyContent={"space-between"}
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        <Box>
          <UploadIcon />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography variant="body2" color="textSecondary">
            Drag and drop file here
          </Typography>
          <Box display="flex" alignItems="center" width="100%" gap={1}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="caption" color="textSecondary">
              Or
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <CustomButton
            sx={{
              px: 3,
              borderRadius: 20,
              height: 40,
              color: COLORS.WHITE_COLOR,
            }}
            variant="primary"
          >
            Upload
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentUpload;
