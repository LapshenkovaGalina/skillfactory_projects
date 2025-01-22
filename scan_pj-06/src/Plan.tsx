import './Plan.css'
import './button.css'

const listItemPointer = require('./assets/list-pointer.png');

export type PlanInfoType = {
    planName: string,
    active: boolean,
    shortDescription: string,
    price: number,
    oldPrice: number,
    installmentInfo: string,
    planDescriptionList: string[],
    color: string,
    img: any,
    fontColor: string
}
export type PlanPropsType = {
    planInfo: PlanInfoType
}

function Plan({ planInfo }: PlanPropsType) {

    const planDescriptionListJSX = planInfo.planDescriptionList.map((listItem, ind) => {
        return (
            <li key={ind} className='description__listItem'><img src={listItemPointer} alt='>'></img>{listItem}</li>
        )
    })

    const goToPersonalAccBtn = (
        <button className='goToPersonalAccBtn commonTypeBtn'>
            Перейти в личный кабинет
        </button>
    )

    const moreBtn = (
        <button className='commonTypeBtn moreBtn'>
            Подробнее
        </button>
    )

    return (
        <div className={'Plan' + `${planInfo.active ? ' active' : ''}`}
            style={planInfo.active ? { borderColor: `#${planInfo.color}` } : undefined}>
            <div className='Plan__head' style={{ backgroundColor: `#${planInfo.color}` }}>
                <div className='head__textBlock' style={{ color: `#${planInfo.fontColor}` }}>
                    <h3>{planInfo.planName}</h3>
                    <p className='head__shortDescription'>{planInfo.shortDescription}</p>
                </div>
                <img className='head__img' src={`${planInfo.img}`} alt='plan_img'></img>
            </div>
            <div className='Plan__body'>
                <div className='Plan__priceInfo'>
                    <div className='priceInfo__priceBlock'>
                        <div className='priceBlock__wrapper'>
                            <span className='priceBlock__price'>{planInfo.price} ₽</span>
                            <span className='priceBlock__oldPrice'>{planInfo.oldPrice} ₽</span>
                        </div>
                    {planInfo.active && <div className='isActivePlanMarker'>Текущий тариф</div>}
                    </div>
                    <p className='priceInfo__installmentInfo'>{planInfo.installmentInfo}</p>
                </div>
                <div className='Plan__description'>
                    <span className='description__intro'>В тариф входит:</span>
                    <ul className='description__descriptionList'>
                        {planDescriptionListJSX}
                    </ul>
                </div>
                <div className='Plan__btn'>
                    {planInfo.active ? goToPersonalAccBtn : moreBtn}
                </div>
            </div>
        </div>
    )
}

export default Plan;