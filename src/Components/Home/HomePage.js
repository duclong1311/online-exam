import { useSelector } from 'react-redux';
import videoHomepage from '../../Assets/hero.mp4';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();

    return (
        <>
            <div className="homepage-container">
                <div className='homepage-video'>
                    <video autoPlay muted loop>
                        <source
                            src={videoHomepage}
                            type='video/mp4'
                        />
                    </video>
                </div>
                <div className='homepage-content'>
                    <div className='title-1'>Get to know your customers with forms worth filling out</div>
                    <div className='title-2'>Collect all the data you need to <span className='highlight'>understand customers</span> with forms designed to be refreshingly different.</div>
                    <div className='title-3'>
                        {
                            isAuthenticated === false ?
                                <button onClick={() => navigate('/login')}>Login now!</button>
                                :
                                <button onClick={() => navigate('/user')}>Doing Quizz Now!</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;