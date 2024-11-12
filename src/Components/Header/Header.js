import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Utils/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../Redux/Actions/userActions';
import { FaReact } from "react-icons/fa";
import Language from './Language';

const Header = () => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);

    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to={'/'} className={"navbar-brand"}>
                    <span ><FaReact className='brand-icon' /></span>
                    CodeGym
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className={"nav-link"}>Home</NavLink>
                        <NavLink to={'/user'} className={"nav-link"}>User</NavLink>
                        <NavLink to={'/admin'} className={"nav-link"}>Admin</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>My profile</NavDropdown.Item>
                                <NavDropdown.Item>Another action</NavDropdown.Item>
                                <NavDropdown.Item>Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogout()}>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;