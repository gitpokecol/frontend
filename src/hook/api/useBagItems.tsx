import { useEffect, useState } from "react";
import { BagItem } from "../../type/item";
import { getBagItems } from "../../api/apis";

export default function useBagItems() {
  const [bagItems, setBagItems] = useState<BagItem[]>(null);

  const fetchBagItems = async () => {
    const res = await getBagItems();
    const bagItems_ = res.items.map((item) => ({
      item_type: item.item_type,
      count: item.count,
    }));

    setBagItems(bagItems_);
  };

  useEffect(() => {
    fetchBagItems();
  }, []);

  return { bagItems, fetchBagItems };
}
