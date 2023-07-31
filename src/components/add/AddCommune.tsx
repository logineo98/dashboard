import React, { useEffect, useState } from 'react'
import { ADD_EDIT_COMMUNE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import Loading from '../loading/Loading'
import { RootReducerType } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTowns } from '../../redux/actions/town.actions'
import { validation_commune } from '../../utils/validation'
import { addCommune } from '../../redux/actions/commune.actions'

const AddCommune: PAGE_COMPONENT_TYPE = ({ seeCommune, setSeeCommune }) => {

    const data: ADD_EDIT_COMMUNE_TYPE = { name: '', cityId: '' }

    const [addCommuneData, setAddCommuneData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_COMMUNE_TYPE>()

    const { loadingCommune } = useSelector((state: RootReducerType) => state.commune)
    const { loadingTown, allTowns } = useSelector((state: RootReducerType) => state.town)
    const dispatch = useDispatch<any>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_commune(addCommuneData)

        if (error.cityId !== initialError.cityId || error.name !== initialError.name) {
            setErr(error)
        } else {
            const { cityId, name } = addCommuneData
            setErr(initialError)

            dispatch(addCommune({ cityId: cityId.trim(), name: name.trim() }, setAddCommuneData))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAddCommuneData({ ...addCommuneData, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        dispatch(getAllTowns())
    }, [dispatch])

    return (
        !seeCommune ? <></> :
            <div className='add'>
                <div className='overlay'></div>

                <div className='add_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeCommune && setSeeCommune(false); setAddCommuneData(data); setErr(data) }} />

                    <div className='loading_container'>
                        {loadingCommune && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>COMMUNE</p>
                        </div>
                    </div>

                    <form action='' onSubmit={handleSubmit}>
                        <div className='input_label_container'>
                            <label htmlFor='name'>Nom de la commune</label>
                            <input type='text' name='name' id='name' value={addCommuneData.name} onChange={handleChange} />
                            {err?.name && <span className='error'> {err?.name} </span>}
                        </div>

                        <div className='select_label_container'>
                            <label htmlFor='cityId'>Associée à la ville</label>
                            {loadingTown ? <Loading hide_text h_w={35} padding='0px' mg='0px' /> :
                                <select name='cityId' id='cityId' value={addCommuneData.cityId} onChange={handleChange}>
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
                            <button type='reset' className='abort' disabled={loadingCommune ? true : false} style={{ cursor: loadingCommune ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeCommune && setSeeCommune(false); setErr(data) }}>Annuler</button>
                        </div>
                    </form>

                </div>
            </div>
    )
}

export default AddCommune