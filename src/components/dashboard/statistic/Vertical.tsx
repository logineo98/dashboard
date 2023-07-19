import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import Loading from '../../loading/Loading'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import { getAllStatsDevisByYear } from '../../../redux/actions/stat_devis_by_year.actions'
import { getAllStatsPostPayByYear } from '../../../redux/actions/stat_post_pay_by_year.actions'
import { getAllStatsPrePayByYear } from '../../../redux/actions/stat_pre_pay_by_year.actions'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Vertical: PAGE_COMPONENT_TYPE = ({ title }) => {

    const [chooseDevisYear, setChooseDevisYear] = useState(new Date().getFullYear().toString())
    const [choosePostPayYear, setChoosePostPayYear] = useState(new Date().getFullYear().toString())
    const [choosePrePayYear, setChoosePrePayYear] = useState(new Date().getFullYear().toString())

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const { allStatsDevisByYear, loadingStatDevisByYear } = useSelector((state: RootReducerType) => state.statDevisByYear)
    const { allStatsPostPayByYear, loadingStatPostPayByYear } = useSelector((state: RootReducerType) => state.statPostPayByYear)
    const { allStatsPrePayByYear, loadingStatPrePayByYear } = useSelector((state: RootReducerType) => state.statPrePayByYear)
    const dispatch = useDispatch<any>()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Vertical',
            },
        },
    }

    const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
    const data = {
        labels,
        datasets: [
            {
                label: 'Payé',
                data: title === 'devis' ? [allStatsDevisByYear?.janvier?.success, allStatsDevisByYear?.fevrier?.success, allStatsDevisByYear?.mars?.success, allStatsDevisByYear?.avril?.success, allStatsDevisByYear?.mai?.success, allStatsDevisByYear?.juin?.success, allStatsDevisByYear?.juillet?.success, allStatsDevisByYear?.aout?.success, allStatsDevisByYear?.septembre?.success, allStatsDevisByYear?.octobre?.success, allStatsDevisByYear?.novembre?.success, allStatsDevisByYear?.decembre?.success] :
                    title === 'post_pay' ? [allStatsPostPayByYear?.janvier?.success, allStatsPostPayByYear?.fevrier?.success, allStatsPostPayByYear?.mars?.success, allStatsPostPayByYear?.avril?.success, allStatsPostPayByYear?.mai?.success, allStatsPostPayByYear?.juin?.success, allStatsPostPayByYear?.juillet?.success, allStatsPostPayByYear?.aout?.success, allStatsPostPayByYear?.septembre?.success, allStatsPostPayByYear?.octobre?.success, allStatsPostPayByYear?.novembre?.success, allStatsPostPayByYear?.decembre?.success] :
                        title === 'pre_pay' && [allStatsPrePayByYear?.janvier?.success, allStatsPrePayByYear?.fevrier?.success, allStatsPrePayByYear?.mars?.success, allStatsPrePayByYear?.avril?.success, allStatsPrePayByYear?.mai?.success, allStatsPrePayByYear?.juin?.success, allStatsPrePayByYear?.juillet?.success, allStatsPrePayByYear?.aout?.success, allStatsPrePayByYear?.septembre?.success, allStatsPrePayByYear?.octobre?.success, allStatsPrePayByYear?.novembre?.success, allStatsPrePayByYear?.decembre?.success],
                backgroundColor: 'rgb(6, 161, 6, 0.7)',
            },
            {
                label: 'Annulé',
                data: title === 'devis' ? [allStatsDevisByYear?.janvier?.failure, allStatsDevisByYear?.fevrier?.failure, allStatsDevisByYear?.mars?.failure, allStatsDevisByYear?.avril?.failure, allStatsDevisByYear?.mai?.failure, allStatsDevisByYear?.juin?.failure, allStatsDevisByYear?.juillet?.failure, allStatsDevisByYear?.aout?.failure, allStatsDevisByYear?.septembre?.failure, allStatsDevisByYear?.octobre?.failure, allStatsDevisByYear?.novembre?.failure, allStatsDevisByYear?.decembre?.failure] :
                    title === 'post_pay' ? [allStatsPostPayByYear?.janvier?.failure, allStatsPostPayByYear?.fevrier?.failure, allStatsPostPayByYear?.mars?.failure, allStatsPostPayByYear?.avril?.failure, allStatsPostPayByYear?.mai?.failure, allStatsPostPayByYear?.juin?.failure, allStatsPostPayByYear?.juillet?.failure, allStatsPostPayByYear?.aout?.failure, allStatsPostPayByYear?.septembre?.failure, allStatsPostPayByYear?.octobre?.failure, allStatsPostPayByYear?.novembre?.failure, allStatsPostPayByYear?.decembre?.failure] :
                        title === 'pre_pay' && [allStatsPrePayByYear?.janvier?.failure, allStatsPrePayByYear?.fevrier?.failure, allStatsPrePayByYear?.mars?.failure, allStatsPrePayByYear?.avril?.failure, allStatsPrePayByYear?.mai?.failure, allStatsPrePayByYear?.juin?.failure, allStatsPrePayByYear?.juillet?.failure, allStatsPrePayByYear?.aout?.failure, allStatsPrePayByYear?.septembre?.failure, allStatsPrePayByYear?.octobre?.failure, allStatsPrePayByYear?.novembre?.failure, allStatsPrePayByYear?.decembre?.failure],
                backgroundColor: 'rgba(239, 62, 52, 0.7)',
            },
            {
                label: 'En cours',
                data: title === 'devis' ? [allStatsDevisByYear?.janvier?.pending, allStatsDevisByYear?.fevrier?.pending, allStatsDevisByYear?.mars?.pending, allStatsDevisByYear?.avril?.pending, allStatsDevisByYear?.mai?.pending, allStatsDevisByYear?.juin?.pending, allStatsDevisByYear?.juillet?.pending, allStatsDevisByYear?.aout?.pending, allStatsDevisByYear?.septembre?.pending, allStatsDevisByYear?.octobre?.pending, allStatsDevisByYear?.novembre?.pending, allStatsDevisByYear?.decembre?.pending] :
                    title === 'post_pay' ? [allStatsPostPayByYear?.janvier?.pending, allStatsPostPayByYear?.fevrier?.pending, allStatsPostPayByYear?.mars?.pending, allStatsPostPayByYear?.avril?.pending, allStatsPostPayByYear?.mai?.pending, allStatsPostPayByYear?.juin?.pending, allStatsPostPayByYear?.juillet?.pending, allStatsPostPayByYear?.aout?.pending, allStatsPostPayByYear?.septembre?.pending, allStatsPostPayByYear?.octobre?.pending, allStatsPostPayByYear?.novembre?.pending, allStatsPostPayByYear?.decembre?.pending] :
                        title === 'pre_pay' && [allStatsPrePayByYear?.janvier?.pending, allStatsPrePayByYear?.fevrier?.pending, allStatsPrePayByYear?.mars?.pending, allStatsPrePayByYear?.avril?.pending, allStatsPrePayByYear?.mai?.pending, allStatsPrePayByYear?.juin?.pending, allStatsPrePayByYear?.juillet?.pending, allStatsPrePayByYear?.aout?.pending, allStatsPrePayByYear?.septembre?.pending, allStatsPrePayByYear?.octobre?.pending, allStatsPrePayByYear?.novembre?.pending, allStatsPrePayByYear?.decembre?.pending],
                backgroundColor: 'rgba(195, 146, 0, 0.7)',
            },
        ],
    }

    const years = Array.from({ length: (new Date().getFullYear() - 2010 + 1) }, (_, i) => new Date().getFullYear() - i)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        title === 'devis' ? dispatch(getAllStatsDevisByYear(chooseDevisYear)) :
            title === 'post_pay' ? dispatch(getAllStatsPostPayByYear(choosePostPayYear)) :
                title === 'pre_pay' && dispatch(getAllStatsPrePayByYear(choosePrePayYear))
    }

    useEffect(() => {
        dispatch(getAllStatsDevisByYear(chooseDevisYear))
        dispatch(getAllStatsPostPayByYear(choosePostPayYear))
        dispatch(getAllStatsPrePayByYear(choosePrePayYear))
    }, [])

    return (
        <div className='vertical'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='year'>Voulez-vous changer l'année ?</label>

                <div className='select_btn'>
                    <select name='year' id='year' value={title === 'devis' ? chooseDevisYear : title === 'post_pay' ? choosePostPayYear : title === 'pre_pay' ? choosePrePayYear : ''}
                        onChange={e => title === 'devis' ? setChooseDevisYear(e.target.value) : title === 'post_pay' ? setChoosePostPayYear(e.target.value) : title === 'pre_pay' && setChoosePrePayYear(e.target.value)}
                    >
                        {years.map((year, i) => (
                            <option key={i} value={year}> {year} </option>
                        ))}
                    </select>
                    <button>Appliquer</button>
                </div>
            </form>

            {title === 'devis' && loadingStatDevisByYear &&
                <div className='loading_container'>
                    <Loading h_w={35} hide_text padding='0px' mg='0px' />
                </div>
            }

            {title === 'post_pay' && loadingStatPostPayByYear &&
                <div className='loading_container'>
                    <Loading h_w={35} hide_text padding='0px' mg='0px' />
                </div>
            }

            {title === 'pre_pay' && loadingStatPrePayByYear &&
                <div className='loading_container'>
                    <Loading h_w={35} hide_text padding='0px' mg='0px' />
                </div>
            }

            <Bar options={options} data={data} className='bar' />
        </div>
    )
}

export default Vertical