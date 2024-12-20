import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <header>
    <nav>
      <ul className="nav-item">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/SavedCandidates'>Potential Candidates</Link></li>


      </ul>
    </nav>
    </header>
  )
};

export default Nav;
