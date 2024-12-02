import { useState, useEffect } from "react";

export const useTypingEffect = (text, speed = 150) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Reset the typing effect after a brief pause
      const resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 2000); // Adjust this delay for the pause before restarting
      return () => clearTimeout(resetTimeout);
    }
  }, [index, text, speed]);

  return displayedText;
};
