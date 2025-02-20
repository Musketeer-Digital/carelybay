"use client";

import { Avatar, Card, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { COLORS } from "@/constants/colors";

const ProfileHeader = () => {
  return (
    <Card
      sx={{
        boxShadow: 2,
        borderRadius: 2,
        textAlign: "center",
        padding: { xs: 3, md: 5 },
        marginTop: 3,
        width: "100%", 
        maxWidth: 400, 
        marginX: "auto", 
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Avatar
          sx={{
            bgcolor: COLORS.BG_LIGHT_ORANGE_COLOR,
            width: { xs: 70, md: 100 }, 
            height: { xs: 70, md: 100 },
            fontSize: { xs: 30, md: 50 },
            fontWeight: "bold",
            color: COLORS.BLACK_COLOR,
          }}
        >
          S
        </Avatar>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 2 }}>
        Swan
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box
          sx={{
            bgcolor: COLORS.BG_LIGHT_GREY_COLOR,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: { xs: 1, md: 2 }, 
            py: 1,
            width: "100%", 
            maxWidth: 300, 
            borderRadius: 2,
            marginTop: 2,
          }}
        >
          <ChildCareIcon fontSize="small" />
          <Typography sx={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: { xs: "0.9rem", md: "1rem" } }}>
            Childcare
          </Typography>
          <IconButton sx={{ color: COLORS.BLACK_COLOR }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileHeader;
