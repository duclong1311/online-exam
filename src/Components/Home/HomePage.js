// import { useSelector } from 'react-redux';
import videoHomepage from '../../Assets/hero.mp4';
import './HomePage.scss';

const HomePage = (props) => {
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    // const account = useSelector(state => state.user.account);

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
                        <button>Create post now!</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;