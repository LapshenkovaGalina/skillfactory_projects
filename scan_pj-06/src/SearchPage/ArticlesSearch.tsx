import './ArticlesSearch.css';
import './checkbox.css';
import '../button.css';
import { FormEvent, useEffect, useState } from 'react';
import validateInn from './validateInn';
import { useNavigate } from 'react-router-dom';

type ArticleTonality = 'positive' | 'negative' | 'any';

const articleTonalityToRus = (tonality: ArticleTonality): string => {
    switch (tonality) {
        case 'positive': return 'Позитивная';
        case 'negative': return 'Негативная';
        case 'any': return 'Любая';
    }
}

const articleTonalitys: ArticleTonality[] = ['positive', 'negative', 'any'];

function ArticlesSearch() {
    const navigate = useNavigate();

    const [errorMsg0, setErrorMsg0] = useState<string | null>(null);
    const [errorMsg1, setErrorMsg1] = useState<string | null>(null);
    const [errorMsg2, setErrorMsg2] = useState<string | null>(null);

    const [firstRangeNum, setFirstRangeNum] = useState(new Date().getTime());
    const [secondRangeNum, setSecondRangeNum] = useState(new Date().getTime());

    const [INN, setINN] = useState('');
    const [tonality, setTonality] = useState<ArticleTonality>('positive');
    const [limit, setLimit] = useState('');
    const [startDateJSON, setStartDateJSON] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDateJSON, setEndDateJSON] = useState('');
    const [endDate, setEndDate] = useState('');
    const [maxFullness, setMaxFullness] = useState(false);
    const [inBusinessNews, setInBusinessNews] = useState(false);
    const [onlyMainRole, setOnlyMainRole] = useState(false);
    const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
    const [includeTechNews, setIncludeTechNews] = useState(false);
    const [excludeAnnouncements, setIncludeAnnouncements] = useState(true);
    const [excludeDigests, setIncludeDigests] = useState(true);

    const INNinputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const INNvalue = event.target.value;
        const validateInnReturnValue = validateInn(INNvalue);
        setINN(INNvalue);

        if (typeof validateInnReturnValue === 'string') {
            setErrorMsg0(validateInnReturnValue);
        } else if (validateInnReturnValue === true) {
            setErrorMsg0(null);
        }
    }

    const docsNumInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(event.target.value);
        const limit = +(event.target.value);

        if (limit === 0) {
            setErrorMsg1('Обязательное поле для заполнения');
        } else if (typeof limit === 'number') {
            if (limit > 0 && limit < 1001) {
                setErrorMsg1(null);
            } else {
                setErrorMsg1('Недопустимое число');
            }
        } else {
            setErrorMsg1('Значение поля должно быть числом');
        }
    }

    useEffect(() => {
        const currTime = new Date().getTime();
        const endDate = new Date(secondRangeNum).setHours(0);
        const startDate = new Date(firstRangeNum).setHours(0);

        if (startDate > currTime || endDate > currTime) {
            setErrorMsg2('Даты не должны быть в будущем времени')
        } else {
            if (startDate < endDate || startDate === endDate) {
                setErrorMsg2(null);
            } else if (startDate > endDate) {
                setErrorMsg2('Дата начала не может быть позже даты конца');
            }
        }
    }, [firstRangeNum, secondRangeNum]);

    const searchRangeinput0onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const inputValueUnixFormat = new Date(inputValue).getTime();
        const inputValueJSONstr = `${new Date(inputValue).toJSON()}`;

        setStartDate(inputValue);
        setStartDateJSON(inputValueJSONstr);
        setFirstRangeNum(inputValueUnixFormat);
    }

    const searchRangeinput1onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const inputValueUnixFormat = new Date(inputValue).getTime();
        const inputValueJSONstr = `${new Date(inputValue).toJSON()}`;

        setEndDate(inputValue);
        setEndDateJSON(inputValueJSONstr);
        setSecondRangeNum(inputValueUnixFormat);
    }

    const optionJSX = articleTonalitys.map((tonality: ArticleTonality, ind) => {
        return (
            <option key={ind} className='leftBlock__option' value={tonality}>
                {articleTonalityToRus(tonality)}
            </option>
        )
    })

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/searchResults/${limit}/${startDateJSON}/${endDateJSON}/${INN}/${tonality}/${maxFullness}/${inBusinessNews}/${onlyMainRole}/${onlyWithRiskFactors}/${!includeTechNews}/${excludeAnnouncements}/${excludeDigests}`);
    }

    const btnDisable = () => {
        return (
            (errorMsg0 == null && errorMsg1 == null && errorMsg2 == null
                && INN !== '' && limit !== '' && startDate !== '' && endDate !== '') ? false : true
        )
    }

    return (
        <form id="form_articlesSearch" className='ArticlesSearch' onSubmit={(event) => (onSubmitHandler(event))}>
            <div className="ArticlesSearch__leftBlock">
                <legend className='leftBlock__legend'>ИНН компании*</legend>
                <input className={`leftBlock__input input ${errorMsg0 && 'errorMsgInput'}`}
                    placeholder='10 цифр'
                    value={INN}
                    onChange={INNinputOnChange}></input>
                {errorMsg0 && <span className='errorMsg0'>{errorMsg0}</span>}
                <legend className='leftBlock__legend'>Тональность</legend>
                <select className='leftBlock__input select'
                    value={tonality}
                    onChange={(event) => setTonality(event.target.value as ArticleTonality)}>
                    {optionJSX}
                </select>
                <legend className='leftBlock__legend'>Количество документов в выдаче*</legend>
                <input className={`leftBlock__input input ${errorMsg1 && 'errorMsgInput'}`}
                    placeholder='от 1 до 1000'
                    value={limit}
                    onChange={docsNumInputOnChange}></input>
                {errorMsg1 && <span className='errorMsg1'>{errorMsg1}</span>}
                <legend className='leftBlock__legend'>Диапазон поиска*</legend>
                <div className='leftBlock__searchRange'>
                    <input className={`searchRange__input input ${errorMsg2 && 'errorMsgInput'}`}
                        type='date'
                        value={startDate}
                        onChange={searchRangeinput0onChange}></input>
                    <input className={`searchRange__input input ${errorMsg2 && 'errorMsgInput'}`}
                        type='date'
                        value={endDate}
                        onChange={searchRangeinput1onChange}></input>
                </div>
                {errorMsg2 && <span className='errorMsg2'>{errorMsg2}</span>}
            </div>
            <div className="ArticlesSearch__rightBlock">
                <div className='rightBlock__checkboxes'>
                    <label className='customCheckbox'>
                        <input type='checkbox'
                            onChange={(event) => setMaxFullness(event.target.checked)}></input><span>Признак максимальной полноты</span></label>
                    <label className='customCheckbox'>
                        <input type='checkbox'
                            onChange={(event) => setInBusinessNews(event.target.checked)}></input><span>Упоминания в бизнес-контексте</span></label>
                    <label className='customCheckbox'>
                        <input type='checkbox'
                            onChange={(event) => setOnlyMainRole(event.target.checked)}></input><span>Главная роль в публикации</span></label>
                    <label className='customCheckbox'>
                        <input type='checkbox'
                            onChange={(event) => setOnlyWithRiskFactors(event.target.checked)}></input><span>Публикации только с риск-факторами</span></label>
                    <label className='customCheckbox'>
                        <input type='checkbox'
                            onChange={(event) => setIncludeTechNews(event.target.checked)}></input><span>Включать технические новости рынков</span></label>
                    <label className='customCheckbox'>
                        <input type='checkbox'
                            onChange={(event) => setIncludeAnnouncements(event.target.checked)}></input><span>Включать анонсы и календари</span></label>
                    <label className='customCheckbox'>
                        <input type='checkbox'
                            onChange={(event) => setIncludeDigests(event.target.checked)}></input><span>Включать сводки новостей</span></label>
                </div>
                <div className='searchBtnBlock'>
                    <button form='form_articlesSearch'
                        className='commonTypeBtn searchBtn'
                        type='submit'
                        disabled={btnDisable()}>Поиск</button>
                    <div className='searchBtnBlock__note'>*Обязательные к заполнению поля</div>
                </div>
            </div>
        </form>
    )
}

export default ArticlesSearch;