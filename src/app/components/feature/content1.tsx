import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Content1() {
  return (
    <Box>
      <Box sx={{ borderRadius: "20px", overflow: "hidden" }}>
        <Image
          src={"https://placehold.co/390x293"}
          alt="Child care worker"
          width={390}
          height={293}
          unoptimized
        />
      </Box>
      <Typography
        variant="h6"
        fontWeight={"700"}
        fontSize={"24px"}
        lineHeight={"36px"}
      >
        Your Trusted Partner in Finding the Perfect Service!
      </Typography>
      <br />
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
