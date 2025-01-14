import '../AppMain.css'
import './MainPage.css'
import Slider from "./Slider";
import PlansBlock from "../PlansBlock";
import AboutServiceBlock from "../AboutServiceBlock";

import mainPageImg from "../assets/main_page_img.png";
import beginnerPlanImg from "../assets/beginner-plan_img.png"
import proPlanImg from "../assets/pro-plan_img.png"
import businessPlanImg from "../assets/business-plan_img.png"
import mainPageSlide0 from "../assets/mainPageSlide0_img.png"
import mainPageSlide1 from "../assets/mainPageSlide1_img.png"
import mainPageSlide2 from "../assets/mainPageSlide2_img.png"

const allSlides = [
    {
        img: mainPageSlide0,
        text: 'Высокая и оперативная скорость обработки заявки'
    },
    {
        img: mainPageSlide1,
        text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    },
    {
        img: mainPageSlide2,
        text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
    },
    {
        img: mainPageSlide2,
        text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
    },
    {
        img: mainPageSlide0,
        text: 'Высокая и оперативная скорость обработки заявки'
    },
    {
        img: mainPageSlide1,
        text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    }
]

const allPlans = [
    {
        planName: 'Beginner',
        active: true,
        shortDescription: 'Для небольшого исследования',
        price: 799,
        oldPrice: 1200,
        installmentInfo: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        planDescriptionList: ['Безлимитная история запросов',
            'Безопасная сделка',
            'Поддержка 24/7'],
        color: 'FFB64F',
        img: beginnerPlanImg,
        fontColor: '000000'
    },
    {
        planName: 'Pro',
        active: false,
        shortDescription: 'Для HR и фрилансеров',
        price: 1299,
        oldPrice: 2600,
        installmentInfo: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        planDescriptionList: ['Все пункты тарифа Beginner',
            'Экспорт истории',
            'Рекомендации по приоритетам'],
        color: '7CE3E1',
        img: proPlanImg,
        fontColor: '000000'
    },
    {
        planName: 'Business',
        active: false,
        shortDescription: 'Для корпоративных клиентов',
        price: 2379,
        oldPrice: 3700,
        installmentInfo: '',
        planDescriptionList: ['Все пункты тарифа Pro',
            'Безлимитное количество запросов',
            'Приоритетная поддержка'],
        color: '000000',
        img: businessPlanImg,
        fontColor: 'FFFFFF'
    }
]

function MainPage() {
    return (
        <div className='MainPage'>
            <main className="AppMain">
                <AboutServiceBlock/>
                <h2 className='MainPage__h2'>Почему именно мы</h2>
                <Slider slidesArr={allSlides}/>
                <div className="MainPage__imgWrapper" >
                    <img className="MainPage__img" src={mainPageImg} alt="main page"></img>
                </div>
                <h2 className='MainPage__h2'>Наши тарифы</h2>
                <PlansBlock plans={allPlans}/>
            </main>
        </div>
    )
}
export default MainPage;