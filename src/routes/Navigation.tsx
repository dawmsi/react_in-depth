import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'About', path: '/about' },
];

export default function Navigation() {
  return (
    <ul className="flex gap-2 flex-wrap mx-3">
      {navigation.map(({ name, path }, index) => (
        <li key={index}>
          <Link
            to={path}
            component={NavLink}
            variant="button"
            color="inherit"
            className=" [&.active]:text-gray-300">
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
