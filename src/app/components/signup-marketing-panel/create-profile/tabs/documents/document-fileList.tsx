import { Box, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import DocumentFileItem from "./documen-fileItem";
import { UploadedFile } from "@/types/documentTypes";
import DocumentFilePreviewModal from "./document-file-preview";
import { useState } from "react";
import CustomConfirmationModal from "@/app/components/CustomConfirmationModal";

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
  const [open, setOpen] = useState(false);
  const [deletedFileIndex, setDeletedFileIndex] = useState<number>();

  const handleRemoveFile = () => {
    setFileList(fileList.filter((_, i) => i !== deletedFileIndex));
    setOpen(false);
  };

  const onDeleteDocument = (index: number) => {
    setOpen(true);
    setDeletedFileIndex(index);
  };

  const onCloseDeleteModel = () => {
    setOpen(false);
    setDeletedFileIndex(undefined);
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

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
        }}
      >
        {fileList.map((file, index) => (
          <DocumentFileItem
            key={index + file.name}
            file={file}
            onRemove={() => onDeleteDocument(index)}
            onPreview={() => {
              setToggleFilePreviewModel(true);
              setSelectedFile(file);
            }}
          />
        ))}
      </Box>

      <DocumentFilePreviewModal
        isOpen={toggleFilePreviewModel}
        onClose={() => setToggleFilePreviewModel(false)}
        selectedFile={selectedFile}
      />

      <CustomConfirmationModal
        open={open}
        onClose={onCloseDeleteModel}
        onConfirm={handleRemoveFile}
        title="Delete Document"
        description="Are you sure you want to delete this document?"
        confirmText="Yes"
        cancelText="No"
      />
    </Box>
  );
};

export default DocumentFileList;
