import { useEffect, useState } from "react";
import { getDailyItem } from "../../api/apis";

export default function useDailyItem() {
  const [dailyItemType, setDailyItemType] = useState<number | null>(null);
  const [canClaim, setCanClaim] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchDailyItem = async () => {
    setLoading(true);
    setError(false);
    try {
      const dailyItemResponse = await getDailyItem();
      setDailyItemType(dailyItemResponse.type);
      setCanClaim(dailyItemResponse.can_abtain);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyItem();
  }, []);

  return { dailyItemType, canClaim, fetchDailyItem, loading, error };
}
