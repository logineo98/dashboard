import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { COLUMN_DATA_TABLE_TYPE, ListeType } from '../../utils/types'
import HautListe from './haut_liste/HautListe'
import NoFilteredDataSearch from './NoFilteredDataSearch'

const Liste = (props: ListeType<any, any>) => {
    const { title, datas, columns } = props

    const [search, setSearch] = useState('')
    const [filteredDataSearch, setFilteredDataSearch] = useState<Array<any>>([])
    const [nbSelectedRow, setNbSelectedRow] = useState(0)
    const [ElementSelected, setElementSelected] = useState<Array<COLUMN_DATA_TABLE_TYPE>>([])
    const [emptyRowSelected, setEmptyRowSelected] = useState(false)

    useEffect(() => {
        setFilteredDataSearch(datas)
    }, [datas])

    useEffect(() => {
        const result = datas?.filter(data =>
            data?.username?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.email?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.phone?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.role?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.nom?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.prenom?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.typeCompteur?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.typeDemande?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.usage?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.commune?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.quartier?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.status?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.paymentStatus?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.owner?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.invoice?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.compteur?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.address?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.title?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.content?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.city?.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.commune?.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
            data?.commune?.city?.name?.toLowerCase().match(search.toLocaleLowerCase())
        )

        setFilteredDataSearch(result)
    }, [search, datas])

    return (
        <div className='liste'>
            <HautListe title={title} ElementSelected={ElementSelected} nbSelectedRow={nbSelectedRow} setSearch={setSearch} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} />

            <DataTable
                data={filteredDataSearch}
                columns={columns}
                clearSelectedRows={emptyRowSelected}
                // selectableRows={true}
                selectableRowsHighlight
                onSelectedRowsChange={({ selectedCount, selectedRows, allSelected }) => { setNbSelectedRow(selectedCount); setElementSelected(selectedRows) }}
                fixedHeader
                // fixedHeaderScrollHeight='calc(100vh - (60px + 10px + 34px + 20px + 20px + 10px + 261px))'
                fixedHeaderScrollHeight='calc(100vh - (60px + 10px + 34px + 20px + 20px + 10px + 242px))'
                noDataComponent={<NoFilteredDataSearch title={title} />}
                highlightOnHover
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                paginationComponentOptions={{ rowsPerPageText: 'Ligne par page', rangeSeparatorText: 'de' }}
                onRowClicked={(row) => { }}
                customStyles={{
                    head: { style: { borderTop: '1px solid #d3d3d3', borderLeft: '1px solid #d3d3d3', borderRight: '1px solid #d3d3d3' } },
                    rows: { style: { borderRight: '1px solid #d3d3d3', borderLeft: '1px solid #d3d3d3' } },
                    pagination: { style: { borderLeft: '1px solid #d3d3d3', borderBottom: '1px solid #d3d3d3', borderRight: '1px solid #d3d3d3' } },
                }}
            />
        </div>
    )
}

export default Liste