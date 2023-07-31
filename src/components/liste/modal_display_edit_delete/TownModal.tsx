import React, { FC, useEffect, useState } from 'react'
import { ADD_EDIT_TOWN_TYPE, COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { FaUserCircle } from 'react-icons/fa'
import Loading from '../../loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import { RxCross2 } from 'react-icons/rx'
import { validation_town } from '../../../utils/validation'
import { deleteTown, editTown } from '../../../redux/actions/town.actions'

type TOWN_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const TownModal: FC<TOWN_MODAL_TYPE> = ({ row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type }) => {
    const data: ADD_EDIT_TOWN_TYPE = { id: '', name: '' }

    const [editTownData, setEditTownData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_TOWN_TYPE>()

    const { loadingTown } = useSelector((state: RootReducerType) => state.town)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_town(editTownData)

        if (error.name !== initialError.name) {
            setErr(error)
        } else {
            const { id, name } = editTownData
            setErr(initialError)

            id && dispatch(editTown(id, { name: name.trim() }, setSeeModalDisplayEditDelete))
        }
    }

    useEffect(() => {
        setEditTownData({ id: row ? row.id : '', name: row ? row.name : '' })
    }, [row])

    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
                <div className='overlay'></div>

                <div className='display_edit_delete_modal_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); setErr(data) }} />

                    <div className='loading_container'>
                        {loadingTown && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>VILLE</p>
                        </div>
                    </div>

                    {type === 'afficher' &&
                        <div className='display_information'>
                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Nom de la ville</span>
                                    <span className='value'> {row?.name} </span>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'modifier' &&
                        <form action='' onSubmit={handleSubmit}>
                            <div className='input_label_container'>
                                <label htmlFor='name'>Nom de la ville</label>
                                <input type='text' name='name' id='name' value={editTownData.name} onChange={e => setEditTownData({ ...editTownData, name: e.target.value })} />
                                {err?.name && <span className='error'> {err?.name} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); setErr(data) }}>Annuler</button>
                            </div>
                        </form>
                    }

                    {type === 'supprimer' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer cette ville ? </p>

                                <div className='yes_or_no_container'>
                                    <button disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }} className='yes' onClick={() => { dispatch(deleteTown(row?.id, setSeeModalDisplayEditDelete)); }}>OUI</button>
                                    <button disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }} className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div> : <></>
    )
}

export default TownModal