import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";

export function FeatureListItem({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemIcon>
          <Box
            sx={{
              width: "25px",
              height: "25px",
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "50%",
            }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              fontWeight={"600"}
              fontSize={"16px"}
              lineHeight={"24px"}
            >
              {label}
            </Typography>
          }
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          inset
          disableTypography
          primary={
            <Typography
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"24px"}
            >
              {description}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}

export default function Content2() {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          overflow: "hidden",
          marginBottom: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box>
            <Image
              src="https://placehold.co/288x140"
              alt="Child care worker"
              width={288}
              height={140}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box>
            <Image
              src="https://placehold.co/150x140"
              alt="Child care worker"
              width={150}
              height={140}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box>
            <Image
              src="https://placehold.co/150x192"
              alt="Child care worker"
              width={150}
              height={192}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box>
            <Image
              src="https://placehold.co/285x192"
              alt="Child care worker"
              width={285}
              height={192}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FeatureListItem
            label="Convenience and Efficiency"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <FeatureListItem
            label="Safety and Trust"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <FeatureListItem
            label="Personalized Matching"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </Box>
      </Box>
    </Box>
  );
}
