import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "About", path: "/about" },
];

export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-2 flex-wrap">
        {navigation.map(({ name, path }, index) => (
          <li key={index}>
            <NavLink className="[&.active]:text-gray-50 [&.active]:underline" to={path}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
