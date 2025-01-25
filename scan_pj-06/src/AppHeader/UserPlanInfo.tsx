import './UserPlanInfo.css';

import Loader from '../Loader';
import { AuthContext } from '../App';
import { useContext, useEffect, useState } from 'react';

function UserPlanInfo() {

    const [companiesNum, setCompaniesNum] = useState(0);
    const [companiesLimit, setCompaniesLimit] = useState(0);
    const [userAccInfoLoaded, setUserPlanInfoLoaded] = useState(false);

    const authInfo = useContext(AuthContext);
    const accessToken = authInfo?.accessToken;

    async function getUserPlanInfo() {
        try {
            let response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            let result = await response.json();

            if (!result.eventFiltersInfo) {
                throw new Error('eventFiltersInfo is not found');
            } else {
                setCompaniesNum(result.eventFiltersInfo.usedCompanyCount);
                setCompaniesLimit(result.eventFiltersInfo.companyLimit);
                setUserPlanInfoLoaded(true);
            }

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUserPlanInfo();
    }, []);

    return (
        <div className='UserPlanInfo'>
            {userAccInfoLoaded ?
                <div className='UserPlanInfo__content'>
                    <div className='UserPlanInfo__companiesNum'>
                        <span>Использовано компаний</span>
                        <span className='companiesNum__num'>{companiesNum}</span>
                    </div>
                    <div className='UserPlanInfo__companiesLimit'>
                        <span>Лимит по компаниям</span>
                        <span className='companiesLimit__num'>{companiesLimit}</span>
                    </div>
                </div> :
                <Loader />}
        </div>
    )

}

export default UserPlanInfo;