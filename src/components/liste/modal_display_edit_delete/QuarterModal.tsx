import React, { FC, useEffect, useState } from 'react'
import { ADD_EDIT_QUARTER_TYPE, COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { RxCross2 } from 'react-icons/rx'
import Loading from '../../loading/Loading'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import { deleteQuarter, editQuarter } from '../../../redux/actions/quarter.actions'
import { validation_quarter } from '../../../utils/validation'
import { getAllCommunes } from '../../../redux/actions/commune.actions'

type QUARTER_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const QuarterModal: FC<QUARTER_MODAL_TYPE> = ({ row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type }) => {
    const data: ADD_EDIT_QUARTER_TYPE = { id: '', communeId: '', name: '' }

    const [editQuarterData, setEditQuarterData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_QUARTER_TYPE>()

    const { allCommunes, loadingCommune } = useSelector((state: RootReducerType) => state.commune)
    const { loadingQuarter } = useSelector((state: RootReducerType) => state.quarter)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_quarter(editQuarterData)

        if (error.communeId !== initialError.communeId || error.name !== initialError.name) {
            setErr(error)
        } else {
            const { id, communeId, name } = editQuarterData
            setErr(initialError)

            id && dispatch(editQuarter(id, { name: name.trim(), communeId: communeId.trim() }, setSeeModalDisplayEditDelete))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditQuarterData({ ...editQuarterData, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        dispatch(getAllCommunes())
    }, [dispatch])

    useEffect(() => {
        setEditQuarterData({ id: row ? row.id : '', communeId: row ? (row.commune as { id: string, name: string })?.id : '', name: row ? row.name : '' })
    }, [row])

    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
                <div className='overlay'></div>

                <div className='display_edit_delete_modal_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); setErr(data) }} />

                    <div className='loading_container'>
                        {loadingQuarter && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>QUARTIER</p>
                        </div>
                    </div>

                    {type === 'afficher' &&
                        <div className='display_information'>
                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Nom du quartier</span>
                                    <span className='value'> {row?.name} </span>
                                </div>
                                <div className='information_container'>
                                    <span className='title'>Associée à la commune</span>
                                    <span className='value'> {(row?.commune as { name: string })?.name} </span>
                                </div>
                                {/* <div className='information_container'>
                                    <span className='title'>Associée à la Ville</span>
                                    <span className='value'> {(row?.commune as { name: string, city: { name: string } })?.city?.name} </span>
                                </div> */}
                            </div>
                        </div>
                    }

                    {type === 'modifier' &&
                        <form action='' onSubmit={handleSubmit}>
                            <div className='input_label_container'>
                                <label htmlFor='name'>Nom du quarter</label>
                                <input type='text' name='name' id='name' value={editQuarterData.name} onChange={e => setEditQuarterData({ ...editQuarterData, name: e.target.value })} />
                                {err?.name && <span className='error'> {err?.name} </span>}
                            </div>

                            <div className='select_label_container'>
                                <label htmlFor='communeId'>Associée à la commune</label>
                                {loadingCommune ? <Loading hide_text h_w={35} padding='0px' mg='0px' /> :
                                    <select name='communeId' id='communeId' value={editQuarterData.communeId} onChange={handleChange}>
                                        <option value=''>Veuillez sélectionner la commune</option>
                                        {allCommunes?.map((commune: { id: string, name: string }) => (
                                            <option key={commune?.id} value={commune?.id}> {commune?.name} </option>
                                        ))}
                                    </select>
                                }
                                {err?.communeId && <span className='error'> {err?.communeId} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingQuarter ? true : false} style={{ cursor: loadingQuarter ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingQuarter ? true : false} style={{ cursor: loadingQuarter ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); setErr(data) }}>Annuler</button>
                            </div>
                        </form>
                    }

                    {type === 'supprimer' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer ce quartier ? </p>

                                <div className='yes_or_no_container'>
                                    <button className='yes' disabled={loadingQuarter ? true : false} style={{ cursor: loadingQuarter ? 'not-allowed' : 'pointer' }} onClick={() => { dispatch(deleteQuarter(row?.id, setSeeModalDisplayEditDelete)); }}>OUI</button>
                                    <button className='no' disabled={loadingQuarter ? true : false} style={{ cursor: loadingQuarter ? 'not-allowed' : 'pointer' }} onClick={() => setSeeModalDisplayEditDelete(false)}>NON</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div> : <></>
    )
}

export default QuarterModal