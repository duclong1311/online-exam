import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';

const HeaderBreadcrumb = () => {
    return (
        <Breadcrumb className="quiz-detail-new-header">
            <NavLink to={'/'} className={'breadcrumb-item'}>
                Home
            </NavLink>
            <NavLink to={'/user'} className={'breadcrumb-item'}>
                User
            </NavLink>
            <Breadcrumb.Item active>Detail quiz</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default HeaderBreadcrumb;