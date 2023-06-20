import React from 'react'
import Liste from '../liste/Liste'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { displayDate } from '../../utils/functions'

const ListeNewsInformation: PAGE_COMPONENT_TYPE = ({ title }) => {

    const { allNews } = useSelector((state: RootReducerType) => state.news)
    const { allInformations } = useSelector((state: RootReducerType) => state.information)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = title === 'news' ? allNews : allInformations

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Titre', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.title.length < 50 ? row.title : row.title.substring(0, 50) + '...', sortable: true },
        { name: 'Contenu', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.content.length < 50 ? row.content : row.content.substring(0, 50) + '...', sortable: true },
        { name: 'Dernière modification', selector: (row: COLUMN_DATA_TABLE_TYPE) => displayDate(row.updatedAt), sortable: true },
    ]
    return <Liste title={title} datas={data} columns={columns} />
}

export default ListeNewsInformation