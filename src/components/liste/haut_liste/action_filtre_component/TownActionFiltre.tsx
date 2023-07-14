import React, { useEffect, useState } from 'react'
import { ADD_EDIT_TOWN_TYPE, PAGE_COMPONENT_TYPE } from '../../../../utils/types'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../../redux/store'
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import { validation_town } from '../../../../utils/validation'
import { deleteTown, editTown } from '../../../../redux/actions/town.actions'
import Loading from '../../../loading/Loading'

const TownActionFiltre: PAGE_COMPONENT_TYPE = ({ nbSelectedRow, ElementSelected, setEmptyRowSelected, setElementSelected }) => {

    const data: ADD_EDIT_TOWN_TYPE = { id: '', name: '' }

    const [chooseAction, setChooseAction] = useState('')
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [editTownData, setEditTownData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_TOWN_TYPE>()

    const { allTowns, loadingTown } = useSelector((state: RootReducerType) => state.town)
    const dispatch = useDispatch<any>()

    const handleChooseAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (chooseAction) {
            setEmptyRowSelected && setEmptyRowSelected(false)
            if (chooseAction === 'afficher') {
                setSeeModalDisplayEditDelete(true)
                allTowns?.forEach((town: any) => {
                    if (ElementSelected && ElementSelected.length === 1 && town?.id === ElementSelected[0].id) ElementSelected[0] = town
                })
            } else if (chooseAction === 'modifier') {
                setSeeModalDisplayEditDelete(true)
                allTowns?.forEach((town: any) => {
                    if (ElementSelected && ElementSelected.length === 1 && town?.id === ElementSelected[0].id) ElementSelected[0] = town
                })
            } else if (chooseAction === 'supprimer') {
                if (ElementSelected) {
                    if (ElementSelected.length !== 0) {
                        setSeeModalDisplayEditDelete(true)
                    } else toast.warn('Veuillez selectionner une ville')
                }
            }
        } else {
            setEmptyRowSelected && setEmptyRowSelected(false)
            toast.warn('Veuillez selectionner une action à effectuer')
        }
    }

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
        localStorage.setItem('choose_action', '')
    }, [])

    useEffect(() => {
        ElementSelected && setEditTownData({ id: ElementSelected[0]?.id, name: ElementSelected[0]?.name })
    }, [chooseAction, ElementSelected])

    return (
        <div className='action_filtre'>
            {seeModalDisplayEditDelete &&
                <div className='display_edit_delete_modal'>
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

                        {chooseAction && chooseAction === 'afficher' &&
                            ElementSelected?.map((town, i) => (
                                <div key={i} className='display_information'>
                                    <div className='container'>
                                        <div className='information_container'>
                                            <span className='title'>Nom de la ville</span>
                                            <span className='value'> {town.name} </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {chooseAction && chooseAction === 'modifier' &&
                            ElementSelected?.map((town, i) => (
                                <form key={i} action='' onSubmit={handleSubmit}>
                                    <div className='input_label_container'>
                                        <label htmlFor='name'>Nom complet</label>
                                        <input type='text' name='name' id='name' value={editTownData.name} onChange={e => setEditTownData({ ...editTownData, name: e.target.value })} />
                                        {err?.name && <span className='error'> {err?.name} </span>}
                                    </div>

                                    <div className='save_abort'>
                                        <button disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                        <button type='reset' className='abort' disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); }}>Annuler</button>
                                    </div>
                                </form>
                            ))
                        }

                        {/* {chooseAction && chooseAction === 'supprimer' &&
                            <div className='delete'>
                                <div className='container'>
                                    <p> Voulez-vous vraiment supprimer cette ville ? </p>

                                    <div className='yes_or_no_container'>
                                        <span className='yes' onClick={() => { dispatch(deleteTown(row?.id, setSeeModalDisplayEditDelete)); if (allTowns.length === 1) { setChooseAction(''); localStorage.setItem('choose_action', '') } setElementSelected && setElementSelected([]); }}>OUI</span>
                                        <span className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</span>
                                    </div>
                                </div>
                            </div>
                        } */}
                    </div>
                </div>
            }

            <div className='form_filtre'>
                {nbSelectedRow && nbSelectedRow <= 1 ?
                    <form className='action' onSubmit={handleChooseAction}>
                        <select name='action' id='action' value={(localStorage.getItem('choose_action') && localStorage.getItem('choose_action')) as string} onChange={e => { setChooseAction(e.target.value); localStorage.setItem('choose_action', e.target.value) }}>
                            <option value=''>Chosir une action</option>
                            <option value='afficher'>Afficher</option>
                            <option value='modifier'>Modifier</option>
                            <option value='supprimer'>Supprimer</option>
                        </select>
                        <button>Appliquer</button>
                    </form> :
                    <form className='action' onSubmit={e => { e.preventDefault(); toast.warn('Veuillez selectionner au plus une seule ville') }}>
                        <select name='action' id='action'>
                            <option value=''>Veuillez selectionner au plus une seule ville</option>
                        </select>
                        <button>Appliquer</button>
                    </form>
                }
            </div>

            <span className='nb_elements'>{allTowns.length} éléments</span>
        </div >
    )
}

export default TownActionFiltre