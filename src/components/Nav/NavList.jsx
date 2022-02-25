import { navlinks } from './navlinks';

export default function NavList() {
  return (
    <ul>
      {navlinks.map((item, index) => {
        return (
          <li key={index}>
            <a href={item.link} alt={item.title}>
              {item.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
