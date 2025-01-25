import '../AppMain.css'
import './MainPage.css'

import Slider from "./Slider";
import PlansBlock from "./PlansBlock";
import AboutServiceBlock from "./AboutServiceBlock";
import mainPageImg from "../assets/main_page_img.png";
import { mainPageSlides, plansData } from './mainPageDataArrays';

function MainPage() {
    return (
        <div className='MainPage'>
            <main className="AppMain">
                <AboutServiceBlock />
                <h2 className='MainPage__h2'>Почему именно мы</h2>
                <Slider slidesArr={mainPageSlides} />
                <div className="MainPage__imgWrapper" >
                    <img className="MainPage__img" src={mainPageImg} alt="main page"></img>
                </div>
                <h2 className='MainPage__h2'>Наши тарифы</h2>
                <PlansBlock plans={plansData} />
            </main>
        </div>
    )
}
export default MainPage;