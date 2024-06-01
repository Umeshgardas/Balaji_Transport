"use client";

// components/Navbar.jsx
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  console.log(currentPath);
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link
            href="/"
            className={`${styles.navItem}${
              currentPath === "/" ? styles.active : ""
            } `}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/vehicles"
            className={`${styles.navItem}${
              currentPath === "/vehicles" ? styles.active : ""
            } `}
          >
            Vehicles Data
          </Link>
        </li>
        {/* <li className={`${styles.navItem} ${href === "/vehicles" ? styles.active : ""}`}>
          <Link href="/vehicles">Vehicle Data</Link>
        </li>
        <li className={`${styles.navItem} ${href === "/services" ? styles.active : ""}`}>
          <Link href="/services">About</Link>
        </li>
        <li className={`${styles.navItem} ${href === "/contact" ? styles.active : ""}`}>
          <Link href="/contact">Contact</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
