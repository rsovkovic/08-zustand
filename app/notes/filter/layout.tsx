import React from "react";
import css from "./layoutNotes.module.css";
// type Props = {
//   children: React.ReactNode;
//   sidebar: React.ReactNode;
// };

// const NotesLayout = ({ children, sidebar }: Props) => {
//   return (
//     <div style={{ display: "flex", gap: "10px" }}>
//       {sidebar}
//       <hr />
//       {children}
//     </div>
//   );
// };

// export default NotesLayout;
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;
