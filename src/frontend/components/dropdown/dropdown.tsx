import { useEffect, useRef, useState } from "react";

type Props = {
  onChange: (value: string) => void;
  title?: string;
  value: string;
  values: string[];
};

export function Dropdown({ onChange, title, value, values }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const dropdownref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownref.current &&
        !dropdownref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={dropdownref} className="dropdown gap-2 d-flex flex-column">
      {title && <span>{title}</span>}
      <button
        className="btn btn-secondary dropdown-toggle"
        onClick={() => setOpen(true)}
      >
        {selected}
      </button>
      {open && (
        <ul className="dropdown-menu d-block">
          {values.map((v) => (
            <li
              key={v}
              className="dropdown-item"
              onClick={() => {
                onChange(v);
                setSelected(v);
                setOpen(false);
              }}
            >
              {v}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
