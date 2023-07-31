import React, { useEffect, useState } from 'react'
import { ADD_EDIT_QUARTER_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { RootReducerType } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addQuarter } from '../../redux/actions/quarter.actions'
import { validation_quarter } from '../../utils/validation'
import { getAllCommunes } from '../../redux/actions/commune.actions'
import { FaUserCircle } from 'react-icons/fa'
import Loading from '../loading/Loading'
import { RxCross2 } from 'react-icons/rx'

const AddQuarter: PAGE_COMPONENT_TYPE = ({ seeQuarter, setSeeQuarter }) => {

    const data: ADD_EDIT_QUARTER_TYPE = { name: '', communeId: '' }

    const [addQuarterData, setAddQuarterData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_QUARTER_TYPE>()

    const { loadingQuarter } = useSelector((state: RootReducerType) => state.quarter)
    const { loadingCommune, allCommunes } = useSelector((state: RootReducerType) => state.commune)
    const dispatch = useDispatch<any>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_quarter(addQuarterData)

        if (error.communeId !== initialError.communeId || error.name !== initialError.name) {
            setErr(error)
        } else {
            const { communeId, name } = addQuarterData
            setErr(initialError)

            dispatch(addQuarter({ communeId: communeId.trim(), name: name.trim() }, setAddQuarterData))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAddQuarterData({ ...addQuarterData, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        dispatch(getAllCommunes())
    }, [dispatch])

    return (
        !seeQuarter ? <></> :
            <div className='add'>
                <div className='overlay'></div>

                <div className='add_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeQuarter && setSeeQuarter(false); setAddQuarterData(data); setErr(data) }} />

                    <div className='loading_container'>
                        {loadingQuarter && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>QUARTIER</p>
                        </div>
                    </div>

                    <form action='' onSubmit={handleSubmit}>
                        <div className='input_label_container'>
                            <label htmlFor='name'>Nom du quarter</label>
                            <input type='text' name='name' id='name' value={addQuarterData.name} onChange={handleChange} />
                            {err?.name && <span className='error'> {err?.name} </span>}
                        </div>

                        <div className='select_label_container'>
                            <label htmlFor='communeId'>Associée à la commune</label>
                            {loadingCommune ? <Loading hide_text h_w={35} padding='0px' mg='0px' /> :
                                <select name='communeId' id='communeId' value={addQuarterData.communeId} onChange={handleChange}>
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
                            <button type='reset' className='abort' disabled={loadingQuarter ? true : false} style={{ cursor: loadingQuarter ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeQuarter && setSeeQuarter(false); setErr(data) }}>Annuler</button>
                        </div>
                    </form>

                </div>
            </div>
    )
}

export default AddQuarter