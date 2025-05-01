
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import { useSelector } from 'react-redux';

const NotFound = () => {
    const navigate = useNavigate();
    const token = useSelector((store) => store.USER.token)

    const handleNavigate = () => {
      if(token){
        navigate("/Dashboard")
      } else {
        navigate("/")
      }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.subtitle}>Sorry, the page you're looking for doesn't exist.</p>
            <button className={styles.button} onClick={handleNavigate}>
                {token ? "Go To Dashboard" : "Go Home"}
            </button>
        </div>
    );
};

export default NotFound;
