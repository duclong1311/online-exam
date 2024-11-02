import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'

const Header = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to={'/'} className={"navbar-brand"}>CodeGym</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className={"nav-link"}>Home</NavLink>
                        <NavLink to={'/user'} className={"nav-link"}>User</NavLink>
                        <NavLink to={'/admin'} className={"nav-link"}>Admin</NavLink>
                    </Nav>
                    <Nav>
                        <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                        <button className='btn-signup'>Sign up</button>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;