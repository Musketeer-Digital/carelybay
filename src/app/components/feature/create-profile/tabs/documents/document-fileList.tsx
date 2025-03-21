import { Box, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import DocumentFileItem from "./documen-fileItem";
import { UploadedFile } from "@/types/documentTypes";
import DocumentFilePreviewModal from "./document-file-preview";
import { useState } from "react";

interface DocumentFileListProps {
  fileList: UploadedFile[];
  setFileList: (files: UploadedFile[]) => void;
}

const DocumentFileList: React.FC<DocumentFileListProps> = ({
  fileList,
  setFileList,
}) => {
  const [toggleFilePreviewModel, setToggleFilePreviewModel] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile>();

  const handleRemoveFile = (index: number) => {
    setFileList(fileList.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 2,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          bgcolor: "#E9EFF6",
          p: 1.5,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Typography variant="body2" fontWeight={500}>
          Uploaded {fileList.length} file{fileList.length > 1 ? "s" : ""}
        </Typography>
      </Box>

      <Box>
        {fileList.map((file, index) => (
          <DocumentFileItem
            key={index}
            file={file}
            onRemove={() => handleRemoveFile(index)}
            onPreview={() => {
              setToggleFilePreviewModel(true);
              setSelectedFile(file);
            }}
          />
        ))}
      </Box>

      <DocumentFilePreviewModal
        isOpen={toggleFilePreviewModel}
        onClose={setToggleFilePreviewModel}
        selectedFile={selectedFile}
      />
    </Box>
  );
};

export default DocumentFileList;
