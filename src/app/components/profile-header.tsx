"use client";

import { Avatar, Card, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { BG_LIGHT_GREY_COLOR, BG_LIGHT_ORANGE_COLOR } from "@/constants/colors";

const ProfileHeader = () => {
  return (
    <Card
      sx={{
        boxShadow: 2,
        borderRadius: 2,
        textAlign: "center",
        padding: 5,
        marginTop: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Avatar
          sx={{
            bgcolor: BG_LIGHT_ORANGE_COLOR,
            width: 100,
            height: 100,
            fontSize: 50,
            fontWeight: "bold",
            color: "black",
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
            bgcolor: BG_LIGHT_GREY_COLOR,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            py: 1,
            width: "60%",
            borderRadius: 2,
            marginTop: 2,
          }}
        >
          <ChildCareIcon />
          <Typography sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
            Childcare
          </Typography>
          <IconButton
            sx={{
              color: "black",
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileHeader;
