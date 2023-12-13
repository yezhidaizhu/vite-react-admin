import { useState } from "react";

export default function useDisclose(defaultStatus = false) {
  const [open, setopen] = useState(defaultStatus);

  const onClose = () => setopen(false);
  const onOpen = () => setopen(true);

  return { open, onOpen, onClose };
}