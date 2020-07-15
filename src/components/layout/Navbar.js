import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <NavLink to='/malfunctions' activeClassName='selected'>
            Неисправности
          </NavLink>
        </li>
        <li>
          <NavLink to='/jumpers' activeClassName='selected'>
            Перемычки
          </NavLink>
        </li>{' '}
        <li>
          <NavLink to='/notes' activeClassName='selected'>
            ППР
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
