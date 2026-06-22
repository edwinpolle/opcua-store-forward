import { Tooltip } from "bootstrap";
import React, { useEffect } from "react";

export function useTooltip(ref: React.RefObject<HTMLButtonElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    const tooltip = new Tooltip(ref.current, {
      delay: {
        show: 400,
        hide: 100,
      },
    });

    return () => tooltip.dispose();
  }, [ref]);
}

export function scrollToId(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  document: Document,
  id: string,
) {
  e.preventDefault();

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
