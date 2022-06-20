import { useState } from "react";
import { copyToClipboard } from "../../utils";
import { CopyProps } from "../../utils";

const Copy = ({ text, className, textRef, children }: CopyProps) => {
  const changeRefText = () => {
    if (!textRef) return;

    const currentText: string = textRef.current.innerText;

    textRef.current.innerText = "Copied!";

    setTimeout(() => {
      textRef.current.innerText = currentText;
    }, 1500);
  };

  return (
    <div
      onClick={() => {
        copyToClipboard(text);
        changeRefText();
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Copy;
