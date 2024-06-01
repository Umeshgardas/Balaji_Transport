// hooks/useCurrentPath.js

"use client";
// hooks/useCurrentPath.js
import { useEffect, useState } from "react";

const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const handlePathChange = () => setCurrentPath(window.location.pathname);

    handlePathChange(); // Set initial path
    window.addEventListener("popstate", handlePathChange); // Update path on navigation

    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return currentPath;
};

export default useCurrentPath;
