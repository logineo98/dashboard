import React, { useState } from 'react'
import { ADD_EDIT_TOWN_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { validation_town } from '../../utils/validation'
import { addTown } from '../../redux/actions/town.actions'
import { FaUserCircle } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { RootReducerType } from '../../redux/store'
import Loading from '../loading/Loading'

const AddTown: PAGE_COMPONENT_TYPE = ({ seeAddTown, setSeeAddTown }) => {
    const data: ADD_EDIT_TOWN_TYPE = { name: '' }

    const [addTownData, setAddTownData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_TOWN_TYPE>()

    const { loadingTown } = useSelector((state: RootReducerType) => state.town)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_town(addTownData)

        if (error.name !== initialError.name) {
            setErr(error)
        } else {
            const { name } = addTownData
            setErr(initialError)

            dispatch(addTown({ name }, setAddTownData))
        }
    }

    return (
        !seeAddTown ? <></> :
            <div className='add'>
                <div className='overlay'></div>

                <div className='add_container'>

                    <RxCross2 className='croix' onClick={() => { setSeeAddTown && setSeeAddTown(false); setAddTownData(data); setErr(data) }} />

                    <div className='loading_container'>
                        {loadingTown && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>VILLE</p>
                        </div>
                    </div>

                    <form action='' onSubmit={handleSubmit}>
                        <div className='input_label_container'>
                            <label htmlFor='name'>Nom complet</label>
                            <input type='text' name='name' id='name' value={addTownData.name} onChange={e => setAddTownData({ name: e.target.value })} />
                            {err?.name && <span className='error'> {err?.name} </span>}
                        </div>

                        <div className='save_abort'>
                            <button disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                            <button type='reset' className='abort' disabled={loadingTown ? true : false} style={{ cursor: loadingTown ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeAddTown && setSeeAddTown(false); setErr(data) }}>Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default AddTown