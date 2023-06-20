import React from 'react'
import { RootReducerType } from '../../redux/store'
import { useSelector } from 'react-redux'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import Liste from '../liste/Liste'

const ListeTown: PAGE_COMPONENT_TYPE = () => {

    const { allTowns } = useSelector((state: RootReducerType) => state.town)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allTowns

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Nom de la ville', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
    ]

    return <Liste title='town' datas={data} columns={columns} />
}

export default ListeTown