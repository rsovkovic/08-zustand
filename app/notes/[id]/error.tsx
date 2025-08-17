"use client";

interface NotesErrorProps {
  error: Error;
  //   reset: () => void;
}

export default function NotesError({ error }: NotesErrorProps) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
}
