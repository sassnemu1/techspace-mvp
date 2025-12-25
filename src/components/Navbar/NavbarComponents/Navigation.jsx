import Link from "next/link";

export default function Navigation({ items, activeItem, setActiveItem }) {
  return (
    <nav className="terminal-nav">
      {items.map((item) => (
        <div className="terminal-nav-wrapper" key={item.id}>
          <Link
            href={item.href}
            className={`terminal-nav-item ${
              activeItem === item.id ? "terminal-nav-item--active" : ""
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            {item.label}
          </Link>

          {item.subLinks && item.subLinks.length > 0 && (
            <div className="terminal-nav-submenu">
              {item.subLinks.map((sub) => (
                <Link
                  key={sub.id}
                  href={sub.href}
                  className="terminal-nav-subitem"
                >
                  {sub.label}
                  <span className="terminal-nav-subitem-arrow">↗</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
