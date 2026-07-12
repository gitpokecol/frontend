import { useEffect, useState } from "react";

export default function useImagePreload(...urls: string[]) {
  const key = urls.join("|");
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all(
      key.split("|").map(
        (url) =>
          new Promise((resolve) => {
            const image = new Image();
            image.onload = resolve;
            image.onerror = resolve;
            image.src = url;
          })
      )
    ).then(() => {
      if (active) setLoadedKey(key);
    });

    return () => {
      active = false;
    };
  }, [key]);

  return loadedKey === key;
}
