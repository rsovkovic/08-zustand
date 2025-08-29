"use client";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { tags } from "@/types/note";
import { useState } from "react";

// const tags: (NoteTag | "All")[] = [
//   "All",
//   "Todo",
//   "Work",
//   "Personal",
//   "Meeting",
//   "Shopping",
// ];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          ]{" "}
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggleMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
