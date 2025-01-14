import './UserAccInfo.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './App';

function UserAccInfo() {

    const [ companiesNum, setCompaniesNum ] = useState(0);
    const [ companiesLimit, setCompaniesLimit ] = useState(0);

    const authInfo = useContext(AuthContext);
    const accessToken = authInfo?.accessToken;

    async function getUserAccInfo() {
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
                throw new Error("eventFiltersInfo is not found");
            } else {
                setCompaniesNum(result.eventFiltersInfo.usedCompanyCount);
                setCompaniesLimit(result.eventFiltersInfo.companyLimit);
            }

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUserAccInfo();
    }, []);

    return (
        <div className="UserAccInfo">
                <div className='UserAccInfo__companiesNum'>
                    <span>Использовано компаний</span>
                    <span className='companiesNum__num'>{companiesNum}</span>
                </div>
                <div className='UserAccInfo__companiesLimit'>
                    <span>Лимит по компаниям</span>
                    <span className='companiesLimit__num'>{companiesLimit}</span>
                </div>
        </div>
    )
}

export default UserAccInfo;