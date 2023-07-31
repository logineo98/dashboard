import React, { FC, useEffect, useState } from 'react'
import { ADD_EDIT_COMMUNE_TYPE, COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { RxCross2 } from 'react-icons/rx'
import Loading from '../../loading/Loading'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import { getAllTowns } from '../../../redux/actions/town.actions'
import { validation_commune } from '../../../utils/validation'
import { deleteCommune, editCommune } from '../../../redux/actions/commune.actions'

type COMMUNE_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const CommuneModal: FC<COMMUNE_MODAL_TYPE> = ({ row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type }) => {
    const data: ADD_EDIT_COMMUNE_TYPE = { id: '', cityId: '', name: '' }

    const [editCommuneData, setEditCommuneData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_COMMUNE_TYPE>()

    const { allTowns, loadingTown } = useSelector((state: RootReducerType) => state.town)
    const { loadingCommune } = useSelector((state: RootReducerType) => state.commune)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_commune(editCommuneData)

        if (error.cityId !== initialError.cityId || error.name !== initialError.name) {
            setErr(error)
        } else {
            const { id, cityId, name } = editCommuneData
            setErr(initialError)

            id && dispatch(editCommune(id, { name: name.trim(), cityId: cityId.trim() }, setSeeModalDisplayEditDelete))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditCommuneData({ ...editCommuneData, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        dispatch(getAllTowns())
    }, [dispatch])

    useEffect(() => {
        setEditCommuneData({ id: row ? row.id : '', cityId: row ? row.city.id : '', name: row ? row.name : '' })
    }, [row])

    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
                <div className='overlay'></div>

                <div className='display_edit_delete_modal_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); setErr(data) }} />

                    <div className='loading_container'>
                        {loadingCommune && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>COMMUNE</p>
                        </div>
                    </div>

                    {type === 'afficher' &&
                        <div className='display_information'>
                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Nom de la commune</span>
                                    <span className='value'> {row?.name} </span>
                                </div>
                                <div className='information_container'>
                                    <span className='title'>Associée à la ville</span>
                                    <span className='value'> {row?.city?.name} </span>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'modifier' &&
                        <form action='' onSubmit={handleSubmit}>
                            <div className='input_label_container'>
                                <label htmlFor='name'>Nom de la commune</label>
                                <input type='text' name='name' id='name' value={editCommuneData.name} onChange={e => setEditCommuneData({ ...editCommuneData, name: e.target.value })} />
                                {err?.name && <span className='error'> {err?.name} </span>}
                            </div>

                            <div className='select_label_container'>
                                <label htmlFor='cityId'>Associée à la ville</label>
                                {loadingTown ? <Loading hide_text h_w={35} padding='0px' mg='0px' /> :
                                    <select name='cityId' id='cityId' value={editCommuneData.cityId} onChange={handleChange}>
                                        <option value=''>Veuillez sélectionner la ville</option>
                                        {allTowns?.map((town: { id: string, name: string }) => (
                                            <option key={town?.id} value={town?.id}> {town?.name} </option>
                                        ))}
                                    </select>
                                }
                                {err?.cityId && <span className='error'> {err?.cityId} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingCommune ? true : false} style={{ cursor: loadingCommune ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingCommune ? true : false} style={{ cursor: loadingCommune ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); setErr(data) }}>Annuler</button>
                            </div>
                        </form>
                    }

                    {type === 'supprimer' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer cette commune ? </p>

                                <div className='yes_or_no_container'>
                                    <button className='yes' disabled={loadingCommune ? true : false} style={{ cursor: loadingCommune ? 'not-allowed' : 'pointer' }} onClick={() => { dispatch(deleteCommune(row?.id, setSeeModalDisplayEditDelete)); }}>OUI</button>
                                    <button className='no' disabled={loadingCommune ? true : false} style={{ cursor: loadingCommune ? 'not-allowed' : 'pointer' }} onClick={() => setSeeModalDisplayEditDelete(false)}>NON</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div> : <></>
    )
}

export default CommuneModal