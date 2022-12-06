import { Button, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Header = () => {
    const {user} = useContext(AuthContext);
    return (
        <>
            <Navbar className="my-4 shadow-sm" fluid={true} rounded={true}>
            <Link to="/">
                <span className="self-center text-emerald-600 whitespace-nowrap text-4xl font-bold dark:text-white">
                    CareerClub
                </span>
            </Link>
            <div className="flex md:order-2">
                {user ? (
                    <Button color="failure" pill={true}>
                        Sign Out
                    </Button>
                ) : (
                    <Link to="/login">
                        <Button color="success" pill={true}>
                            Login
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to='/' className="hover:text-blue-600">
                    Home
                </Link>
                <Link className="hover:text-blue-600" to="/services">
                    Services
                </Link>
                <Link to='/blogs' className="hover:text-blue-600">
                    Blogs
                </Link>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
};

export default Header;