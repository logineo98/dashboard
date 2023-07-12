import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import Loading from '../../loading/Loading'

ChartJS.register(ArcElement, Tooltip, Legend)

const Circle = () => {

    const { allStats, loadingStat } = useSelector((state: RootReducerType) => state.stat)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Cercle',
            },
        },
    }

    const data = {
        labels: ['Payé', 'Annulé', 'En cours'],
        datasets: [
            {
                label: 'Nombre de factures',
                // data: [
                //     allStats?.payment.success ? allStats?.payment.success : 0,
                //     allStats?.payment.pending ? allStats?.payment.pending : 0,
                //     allStats?.payment.failure ? allStats?.payment.failure : 0
                // ],
                data: [
                    5,
                    10,
                    6
                ],
                backgroundColor: [
                    'rgb(6, 161, 6, 0.4)',
                    'rgba(239, 62, 52, 0.4)',
                    'rgba(195, 146, 0, 0.4)',
                ],
                borderColor: [
                    'rgb(6, 161, 6, 1)',
                    'rgba(239, 62, 52, 1)',
                    'rgba(195, 146, 0, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className='circle'>
            {loadingStat ? <Loading /> : <Pie data={data} options={options} className='pie' />}
        </div>
    )
}

export default Circle