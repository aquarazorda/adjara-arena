import { NavLink } from "@remix-run/react";
import clsx from "clsx";

const menuItems = [
  {
    name: "Home",
    path: "/cms",
    icon: (
      <svg
        className=" h-4 w-4"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Posts",
    path: "/cms/posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7 17h7v-2H7v2Zm0-4h10v-2H7v2Zm0-4h10V7H7v2ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Quizzes",
    path: "/cms/quizzes",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M14 15q.425 0 .738-.313t.312-.737q0-.425-.313-.737T14 12.9q-.425 0-.738.313t-.312.737q0 .425.313.738T14 15Zm-.75-3.2h1.5q0-.725.15-1.063t.7-.887q.75-.75 1-1.212t.25-1.088q0-1.125-.788-1.837T14 5q-1.025 0-1.788.575T11.15 7.1l1.35.55q.225-.625.613-.938T14 6.4q.6 0 .975.338t.375.912q0 .35-.2.663t-.7.787q-.825.725-1.012 1.137T13.25 11.8ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.413-.588T2 20V6h2v14h14v2H4ZM8 4v12V4Z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Promos",
    path: "/cms/promos",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m16 11l-4 4l-4-4l1.4-1.4l1.6 1.55V7h2v4.15l1.6-1.55L16 11Zm-6 9h4v-1h-4v1Zm-3 3q-.825 0-1.413-.588T5 21V3q0-.825.588-1.413T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.588 1.413T17 23H7Zm0-5v3h10v-3H7Zm0-2h10V6H7v10ZM7 4h10V3H7v1Zm0 14v3v-3ZM7 4V3v1Z"
        ></path>
      </svg>
    ),
  },
];

export default function CMSMenu() {
  return (
    <aside className="sticky top-0 h-screen w-56 bg-lighter-grey p-4 text-white-secondary">
      <div className="mb-4 flex items-center space-x-1">
        <h1 className="font-medium text-lg">Adjara Arena</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map(({ name, icon, path }) => (
          <NavLink
            key={"menu-item-" + name}
            to={path}
            end
            className={({ isActive }) => {
              return clsx(
                "flex w-full items-center space-x-2 rounded-lg p-2 hover:bg-medium-grey",
                isActive && "bg-grey"
              );
            }}
          >
            {icon}
            <span className="font-regular text-sm">{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
