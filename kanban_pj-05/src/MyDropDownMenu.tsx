import { useEffect, useState } from 'react';
import './MyDropDownMenu.css'

function MyDropDownMenu() {

    const [myDropDownMenuStyle, setMyDropDownMenuStyle] = useState<React.CSSProperties>({
        top: 0,
        left: 0,
        visibility: 'hidden'
    });

    useEffect(() => {
        const userAvatarWrapperElem = document.querySelector('.AppHeader__userAvatarWrapper');
        const myDropDownMenuElem = document.querySelector('.MyDropDownMenu');


        const rect0 = userAvatarWrapperElem?.getBoundingClientRect();
        const rect1 = myDropDownMenuElem?.getBoundingClientRect();

        const rect0_xPosition = rect0?.left || 0;
        const rect0_yPosition = rect0?.top || 0;

        const rect0Width = rect0?.width || 0;
        const rect0Height = rect0?.height || 0;

        const rect1Width = rect1?.width || 0;

        setMyDropDownMenuStyle({
            top: rect0_yPosition + rect0Height,
            left: rect0_xPosition - rect1Width / 10 * 6.55 + rect0Width / 2,
            visibility: 'visible'
        })

    }, [])

    return (
        <div className="MyDropDownMenu"
            style={myDropDownMenuStyle}>
            <div className="MyDropDownMenu__conus"></div>
            <div className="MyDropDownMenu__rectangle">
                <a className="MyDropDownMenu__option" href=''>Profile</a>
                <a className="MyDropDownMenu__option" href=''>Logout</a>
            </div>
        </div>
    )
}

export default MyDropDownMenu;