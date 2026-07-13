import { Skeleton } from "@mui/material";

interface SquareSkeletonProps {
  borderRadius?: number;
}

export default function SquareSkeleton({
  borderRadius = 0,
}: SquareSkeletonProps) {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        width: "100%",
        height: "auto",
        aspectRatio: "1 / 1",
        borderRadius,
      }}
    />
  );
}
