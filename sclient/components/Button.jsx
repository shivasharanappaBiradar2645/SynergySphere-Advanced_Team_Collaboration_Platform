"use client"

export default function Button({ title, onClick, Children }) {
  return (
    <button
      className={"p-2 text-white shadow-2xs border-neutral-800 border-1 rounded-lg bg-neutral-900"}
      onClick={onClick}
    >
      {Children ? Children : title}
    </button>
  )
}
