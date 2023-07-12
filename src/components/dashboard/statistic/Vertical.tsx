import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import { getAllStatsByYear } from '../../../redux/actions/stat_by_year.actions'
import Loading from '../../loading/Loading'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Vertical = () => {

    const [chooseYear, setChooseYear] = useState(new Date().getFullYear().toString())

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const { allStatsByYear, loadingStatByYear } = useSelector((state: RootReducerType) => state.statByYear)
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
    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Payé',
    //             data: [allStatsByYear?.janvier?.success, allStatsByYear?.fevrier?.success, allStatsByYear?.mars?.success, allStatsByYear?.avril?.success, allStatsByYear?.mai?.success, allStatsByYear?.juin?.success, allStatsByYear?.juillet?.success, allStatsByYear?.aout?.success, allStatsByYear?.septembre?.success, allStatsByYear?.octobre?.success, allStatsByYear?.novembre?.success, allStatsByYear?.decembre?.success],
    //             backgroundColor: 'rgb(6, 161, 6, 0.7)',
    //         },
    //         {
    //             label: 'Annulé',
    //             data: [allStatsByYear?.janvier?.failure, allStatsByYear?.fevrier?.failure, allStatsByYear?.mars?.failure, allStatsByYear?.avril?.failure, allStatsByYear?.mai?.failure, allStatsByYear?.juin?.failure, allStatsByYear?.juillet?.failure, allStatsByYear?.aout?.failure, allStatsByYear?.septembre?.failure, allStatsByYear?.octobre?.failure, allStatsByYear?.novembre?.failure, allStatsByYear?.decembre?.failure],
    //             backgroundColor: 'rgba(239, 62, 52, 0.7)',
    //         },
    //         {
    //             label: 'En cours',
    //             data: [allStatsByYear?.janvier?.pending, allStatsByYear?.fevrier?.pending, allStatsByYear?.mars?.pending, allStatsByYear?.avril?.pending, allStatsByYear?.mai?.pending, allStatsByYear?.juin?.pending, allStatsByYear?.juillet?.pending, allStatsByYear?.aout?.pending, allStatsByYear?.septembre?.pending, allStatsByYear?.octobre?.pending, allStatsByYear?.novembre?.pending, allStatsByYear?.decembre?.pending],
    //             backgroundColor: 'rgba(195, 146, 0, 0.7)',
    //         },
    //     ],
    // }

    const data = {
        labels,
        datasets: [
            {
                label: 'Payé',
                data: [10, 2, 5, 8, 1, 6, 12, 6, 3, 2, 7, 6],
                backgroundColor: 'rgb(6, 161, 6, 0.7)',
            },
            {
                label: 'Annulé',
                data: [8, 4, 1, 5, 5, 2, 3, 8, 3, 1, 10, 2],
                backgroundColor: 'rgba(239, 62, 52, 0.7)',
            },
            {
                label: 'En cours',
                data: [2, 5, 0, 5, 2, 2, 6, 5, 8, 6, 3, 4],
                backgroundColor: 'rgba(195, 146, 0, 0.7)',
            },
        ],
    }

    const years = Array.from({ length: (new Date().getFullYear() - 2010 + 1) }, (_, i) => new Date().getFullYear() - i)

    useEffect(() => {
        dispatch(getAllStatsByYear(chooseYear))
    }, [connected, dispatch, chooseYear])

    return (
        <div className='vertical'>
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor='year'>Voulez-vous changer l'année ?</label>

                <div className='select_btn'>
                    <select name='year' id='year' defaultValue={chooseYear} onChange={e => { setChooseYear(e.target.value) }}>
                        {years.map((year, i) => (
                            <option key={i} value={year}> {year} </option>
                        ))}
                    </select>
                </div>
            </form>

            {loadingStatByYear &&
                <div className='loading_container'>
                    <Loading h_w={35} hide_text padding='0px' mg='0px' />
                </div>
            }

            <Bar options={options} data={data} className='bar' />
        </div>
    )
}

export default Vertical