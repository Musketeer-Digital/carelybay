import { useRef, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { UploadIcon } from "@/app/components/icons/upload-icon";
import CustomButton from "@/app/components/CustomButton";
import { COLORS } from "@/constants/colors";
import { UploadedFile } from "@/types/documentTypes";
import { useProfileStore } from "@/store/profileSlice";
import { updateProfile } from "@/utils/api/profile";
import { validateFiles } from "@/utils/profileUtils";
import { FullscreenSpinner } from "@/app/components/CustomSpinner";

interface DocumentUploadProps {
  fileList: UploadedFile[];
  setFileList: Function;

  selectedDocument: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  fileList,
  setFileList,
  selectedDocument,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const { userProfile, setUserProfile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUploading = async (selectedFile: File) => {
    setIsLoading(true);
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      // will call the GCP function here
      const fileUrl = ""; // await uploadDocument(formData);

      const newDocument = {
        fileName: selectedFile.name,
        fileUrl: fileUrl,
        fileType: selectedFile.type,
        size: selectedFile.size,
        uploadedAt: new Date(),
      };

      const fileList = Array.isArray(userProfile.documents)
        ? [...userProfile.documents, newDocument]
        : [newDocument];

      const updatedProfile = await updateProfile({
        ...userProfile,
        documents: fileList,
      });
      setIsLoading(false);
      setUserProfile(updatedProfile);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to upload document:", error);
    }
  };

  // Function to handle file selection from input
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedDocument) return;

    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const validFiles = validateFiles(files);

      if (validFiles.length > 0) {
        processFiles(validFiles);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!selectedDocument) return;

    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      processFiles(Array.from(event.dataTransfer.files));
    }
  };

  const processFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      name: file.name,
      size: Math.round(file.size / 1024),
      progress: 0,
      file: file,
    }));

    setFileList((prevFiles: UploadedFile[]) => [...prevFiles, ...newFiles]);

    // Simulate Upload Progress
    // Will update it with uploading process once main is merged here
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFileList((prevFiles: UploadedFile[]) =>
          prevFiles.map((prevFile) =>
            prevFile.name === file.name ? { ...prevFile, progress } : prevFile,
          ),
        );
        if (progress >= 100) {
          clearInterval(interval);

          handleFileUploading(file.file);
        }
      }, 300);
    });
  };

  return (
    <Box
      sx={{
        border: `2px dashed ${isDragging ? COLORS.PRIMARY_COLOR : "#ccc"}`,
        borderRadius: "20px",
        p: 3,
        cursor: "pointer",
        transition: "border 0.2s ease-in-out",
        backgroundColor: isDragging ? "#f9f9f9" : "transparent",
      }}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        if (!selectedDocument) return;
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        disabled={!selectedDocument}
        type="file"
        hidden
        id="file-input"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        <Box>
          <UploadIcon />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography
            sx={{ textDecoration: "underline" }}
            variant="body2"
            color="textSecondary"
          >
            {isDragging ? "Drop files here" : "Drag and drop file here"}
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

              height: 40,
              color: COLORS.WHITE_COLOR,
            }}
            variant="primary"
            disabled={!selectedDocument}
          >
            Upload
          </CustomButton>
        </Box>
      </Box>
      {isLoading && <FullscreenSpinner />}
    </Box>
  );
};

export default DocumentUpload;
