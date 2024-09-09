import { useEffect, useState } from "react";
import { getDailyItem } from "../../api/apis";

export default function useDailyItem() {
  const [dailyItemType, setDailyItemType] = useState<number | null>(null);
  const [canClaim, setCanClaim] = useState<boolean | null>(null);

  useEffect(() => {
    getDailyItem().then((dailyItemResponse) => {
      setDailyItemType(dailyItemResponse.type);
      setCanClaim(dailyItemResponse.can_abtain);
    });
  }, []);

  return { dailyItemType, canClaim };
}
