import './Layout.scss';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  heading: string;
  buttonLabel: string;
  buttonLink: string;
  children: ReactNode;
}

const Layout = ({ heading, buttonLabel, buttonLink, children }: LayoutProps) => {
  return (
    <div className="layout__container">
      <header className="layout__header">
        <div className="app__header-logo">
        </div>
      </header>
      <div className="layout__body">
        <div className="layout__body-header">
          <h1>{heading}</h1>
          <Link to={buttonLink}>
            <button>{buttonLabel}</button>
          </Link>
        </div>
        <hr />
          {children}
      </div>
    </div>
  )
}

export default Layout;
