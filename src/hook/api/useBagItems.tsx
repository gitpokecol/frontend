import { useEffect, useState } from "react";
import { BagItem } from "../../type/item";
import { getBagItems } from "../../api/apis";

export default function useBagItems() {
  const [bagItems, setBagItems] = useState<BagItem[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchBagItems = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getBagItems();
      const bagItems_ = res.items.map((item) => ({
        item_type: item.item_type,
        count: item.count,
      }));

      setBagItems(bagItems_);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBagItems();
  }, []);

  return { bagItems, fetchBagItems, loading, error };
}
