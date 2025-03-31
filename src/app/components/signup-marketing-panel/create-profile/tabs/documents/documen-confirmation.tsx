import { Box, Typography, Checkbox } from "@mui/material";

const DocumentConfirmation = () => {
  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* <Checkbox /> */}
        <Typography variant="body2">
          I confirm that the documents I upload are true and accurate documents
          pertaining to me.
        </Typography>
      </Box>

      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </Box>
  );
};

export default DocumentConfirmation;
