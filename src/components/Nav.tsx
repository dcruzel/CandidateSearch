import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <header>
    <nav>
      <ul className="nav-item">
        {/* <li className="nav-link"><a className="nav-item" href="/">Home</a></li>
        <li className="nav-link"><a className="nav-item" href="/SavedCandidates">Potential Candidates</a></li> */}


        <li><Link to='/'>Home</Link></li>
        <li><Link to='/SavedCandidates'>Potential Candidates</Link></li>


      </ul>
    </nav>
    </header>
  )
};

export default Nav;
