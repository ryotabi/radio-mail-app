import react from 'react';
import Header from './Header';
import '../css/404.css';


const Page404: React.FC = () => {
    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <div className="page404_wrap">
                <p className="page404_text">404</p>
                <p className="page404_subtext">ページが見つかりません</p>
            </div>
        </>
    )
}

export default Page404