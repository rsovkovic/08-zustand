import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { tags } from "@/types/note";

// const tags: (NoteTag | "All")[] = [
//   "All",
//   "Todo",
//   "Work",
//   "Personal",
//   "Meeting",
//   "Shopping",
// ];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
            //  onClick={toggleMenu}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default SidebarNotes;
