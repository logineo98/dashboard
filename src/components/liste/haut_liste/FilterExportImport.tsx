import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineFilter } from 'react-icons/ai'

const FilterExportImport = () => {

    const [displayFilter, setDisplayFilter] = useState(false)
    const [filterChoosed, setFilterChoosed] = useState('')

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setDisplayFilter(false)
    }

    return (
        <div className='filter_import_export_container'>
            <div className='filter_type_close'>
                <button className='filter_container' onClick={() => setDisplayFilter(prev => !prev)}>
                    <AiOutlineFilter className='filter_icon' />
                </button>

                {filterChoosed != '' && <div className='type_filter_close'>
                    <span className='type'>Filtre par {filterChoosed}</span>
                    <button className='close_container' onClick={() => setFilterChoosed('')}>
                        <AiOutlineClose className='close_icon' />
                    </button>
                </div>}
            </div>

            {displayFilter &&
                <form onSubmit={handleFilter} className='filter_form'>
                    <div className='input_select_container'>
                        <select onChange={e => setFilterChoosed(e.target.value)} value={filterChoosed}>
                            <option value=''>Type de filtrage</option>
                            <option value='statut'>Statut</option>
                            <option value='statut validation'>Statut validation</option>
                            <option value='statut paiement'>Paiement statut</option>
                            <option value='date'>Date</option>
                        </select>
                    </div>

                    <div className='input_select_container'>
                        <select>
                            <option value=''>Type de statut</option>
                            <option value='en_cours'>En cours</option>
                            <option value='paye'>Payer</option>
                            <option value='annule'>Annuler</option>
                        </select>
                    </div>

                    <div className='input_date_container'>
                        <input type='date' name='date_begin' id='date_begin' />
                        <input type='date' name='date_end' id='date_end' />
                    </div>

                    <div className='cancel_apply_container'>
                        <button className='cancel' onClick={() => setDisplayFilter(false)}>Annuler</button>
                        <button className='apply'>Appliquer</button>
                    </div>
                </form>
            }

            <div className='import_export_container'>
                <button className='exporter'>Exporter</button>
                <button className='importer'>Importer</button>
            </div>
        </div>
    )
}

export default FilterExportImport