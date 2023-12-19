import { useState } from "react";

export default function useDisclose(defaultStatus = false) {
  const [open, setopen] = useState(defaultStatus);

  const onClose = () => setopen(false);
  const onOpen = () => setopen(true);

  /**
   * 
   * @param {*} status 仅 true 或 false 才有效设置
   */
  const toggle = (status) => {
    setopen(status === false || status === true ? status : !open);
  }

  return { open, onOpen, onClose, toggle };
}