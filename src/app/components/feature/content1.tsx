import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Content1() {
  return (
    <Box>
      <Image
        src="/feature-content1-image.png"
        alt="Child care worker"
        height={293}
        width={390}
        unoptimized
      />
      <Typography
        variant="h6"
        fontWeight={"700"}
        fontSize={"24px"}
        lineHeight={"36px"}
        sx={{
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        Your Trusted Partner in Finding the Perfect Service!
      </Typography>
      <Typography letterSpacing={"1px"}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </Typography>
      <Typography fontWeight={"400"} fontSize={"16px"} lineHeight={"24px"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sit
        nulla cumque dignissimos ducimus officia aliquam similique impedit ab
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundColor: "rgba(231, 234, 247, 1)",
            borderRadius: "50%",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            fontWeight={"600"}
            fontSize={"16px"}
            lineHeight={"24px"}
          >
            Lara Doe
          </Typography>
          <Typography fontWeight={"400"} fontSize={"12px"} lineHeight={"18px"}>
            Child care top rated
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
