import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { COLUMN_DATA_TABLE_TYPE, ListeType } from '../../utils/types'
import HautListe from './haut_liste/HautListe'
import NoFilteredDataSearch from './NoFilteredDataSearch'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import Loading from '../loading/Loading'

const Liste = (props: ListeType<any, any>) => {
    const { title, datas, columns } = props

    const [search, setSearch] = useState('')
    const [filteredDataSearch, setFilteredDataSearch] = useState<Array<any>>([])
    const [nbSelectedRow, setNbSelectedRow] = useState(0)
    const [ElementSelected, setElementSelected] = useState<Array<COLUMN_DATA_TABLE_TYPE>>([])
    const [emptyRowSelected, setEmptyRowSelected] = useState(false)
    const [reduxLoading, setReduxLoading] = useState(false)

    const { loadingDevis } = useSelector((state: RootReducerType) => state.devis)
    const { loadingInfo } = useSelector((state: RootReducerType) => state.information)
    const { loadingNews } = useSelector((state: RootReducerType) => state.news)
    const { loadingPostPay } = useSelector((state: RootReducerType) => state.post_pay)
    const { loadingPrePay } = useSelector((state: RootReducerType) => state.pre_pay)
    const { loadingTown } = useSelector((state: RootReducerType) => state.town)
    const { loadingUser } = useSelector((state: RootReducerType) => state.user)

    useEffect(() => {
        setFilteredDataSearch(datas)
    }, [datas])

    useEffect(() => {
        switch (title) {
            case 'devis': setReduxLoading(loadingDevis); break
            case 'information': setReduxLoading(loadingInfo); break
            case 'news': setReduxLoading(loadingNews); break
            case 'post_pay': setReduxLoading(loadingPostPay); break
            case 'pre_pay': setReduxLoading(loadingPrePay); break
            case 'town': setReduxLoading(loadingTown); break
            case 'admin': setReduxLoading(loadingUser); break
            case 'client': setReduxLoading(loadingUser); break

            default: setReduxLoading(true); break
        }
    }, [title, loadingDevis, loadingInfo, loadingNews, loadingPostPay, loadingPrePay, loadingTown, loadingUser])

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
            data?.content?.toLowerCase().match(search.toLocaleLowerCase())
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
                selectableRows={true}
                selectableRowsHighlight
                onSelectedRowsChange={({ selectedCount, selectedRows, allSelected }) => { setNbSelectedRow(selectedCount); setElementSelected(selectedRows) }}
                fixedHeader
                fixedHeaderScrollHeight='calc(100vh - (60px + 10px + 34px + 20px + 20px + 10px + 261px))'
                noDataComponent={<NoFilteredDataSearch title={title} />}
                highlightOnHover
                // progressPending={reduxLoading}
                // progressComponent={<Loading />}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                paginationComponentOptions={{ rowsPerPageText: 'Ligne par page', rangeSeparatorText: 'de' }}
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