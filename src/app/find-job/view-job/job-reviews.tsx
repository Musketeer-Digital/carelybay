"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Avatar, Stack } from "@mui/material";
import { Star } from "@mui/icons-material";

import { getJobReviews } from "@/utils/api/findJob";
import { FullscreenSpinner } from "@/app/components/CustomSpinner";

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
  childInfo?: string;
  petInfo?: string;
  ageGroup?: string;
}

const JobReviews = ({ jobId }: { jobId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async (jobId: string) => {
      try {
        setLoading(true);
        const data = await getJobReviews(jobId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchReviews(jobId);
    }
  }, [jobId]);

  if (loading) return <FullscreenSpinner />;

  return (
    <>
      {reviews.map((review) => (
        <Box
          key={review.id}
          sx={{
            border: "1px solid #E5E7EB",
            borderRadius: "20px",
            p: 3,
            width: "100%",
            backgroundColor: "#fff",
            background: "rgba(224, 232, 239, 0.2)",
            mt: 3,
          }}
        >
          <Stack direction="row" spacing={2} mb={2}>
            <Avatar
              src={review.avatarUrl || "/avatar.jpg"}
              sx={{ width: 48, height: 48 }}
            />
          </Stack>
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={700} fontSize={14} mb={0.5}>
              About Family
            </Typography>
            <Typography fontSize={14}>{review.reviewerName}</Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={0.5}
            mb={2}
          >
            <Box>
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} sx={{ color: "#FFB400", fontSize: 18 }} />
              ))}
            </Box>
            <Typography fontSize={13} color="text.secondary" ml={1}>
              {review.rating.toFixed(1)} (based on 1 review)
            </Typography>
          </Stack>
          <Typography fontSize={13} color="text.secondary" mb={2}>
            {review.comment}
          </Typography>
          {review.childInfo && (
            <Typography fontSize={13} mb={0.5}>
              • {review.childInfo}
            </Typography>
          )}
          {review.ageGroup && (
            <Typography fontSize={13} mb={0.5}>
              • Age: {review.ageGroup}
            </Typography>
          )}
          {review.petInfo && (
            <Typography fontSize={13}>• {review.petInfo}</Typography>
          )}
        </Box>
      ))}

      {!reviews.length && (
        <Typography fontWeight={700} fontSize={14} mb={0.5}>
          Not Rated Yet...
        </Typography>
      )}
    </>
  );
};

export default JobReviews;
