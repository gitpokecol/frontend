import { Grid } from "@mui/material";
import SquareSkeleton from "./SquareSkeleton";

interface SlotGridSkeletonProps {
  count?: number;
}

export default function SlotGridSkeleton({ count = 16 }: SlotGridSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} item xs={3} sm={1.5} height="fit-content">
          <SquareSkeleton />
        </Grid>
      ))}
    </>
  );
}
