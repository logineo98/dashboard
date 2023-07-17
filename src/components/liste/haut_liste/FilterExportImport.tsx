import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineFilter } from 'react-icons/ai'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'

const FilterExportImport: PAGE_COMPONENT_TYPE = ({ title }) => {

    const [displayFilter, setDisplayFilter] = useState(false)
    const [filterChoosed, setFilterChoosed] = useState('')

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setDisplayFilter(false)
    }

    console.log(title)

    return (
        <div className='filter_import_export_container'>
            <div className='filter_type_close'>
                <button className='filter_container' onClick={() => setDisplayFilter(prev => !prev)}>
                    <AiOutlineFilter className='filter_icon' />
                </button>

                {filterChoosed !== '' &&
                    <div className='type_filter_close'>
                        <span className='type'>Filtre par {filterChoosed}</span>
                        <button className='close_container' onClick={() => setFilterChoosed('')}>
                            <AiOutlineClose className='close_icon' />
                        </button>
                    </div>
                }
            </div>

            {displayFilter &&
                <form onSubmit={handleFilter} className='filter_form'>
                    {(title !== 'news' && title !== 'information') &&
                        <div className='input_select_container'>
                            <select onChange={e => setFilterChoosed(e.target.value)} value={filterChoosed}>
                                {(title === 'admin' || title === 'client') &&
                                    <>
                                        <option value=''>Type de statut du compte</option>
                                        <option value='activé'>Activé</option>
                                        <option value='non activé'>Non activé</option>
                                    </>
                                }

                                {title === 'devis' &&
                                    <>
                                        <option value=''>Type de filtre</option>
                                        <option value='validation'>Validation</option>
                                        <option value='paiement'>Paiement</option>
                                        <option value='date'>Date</option>
                                    </>
                                }

                                {(title === 'post_pay' || title === 'pre_pay') &&
                                    <>
                                        <option value=''>Type de filtre</option>
                                        <option value='paiement'>Paiement</option>
                                        <option value='date'>Date</option>
                                    </>
                                }
                            </select>
                        </div>}

                    {/* for the devis */}
                    <div className='input_select_container'>
                        {filterChoosed && title === 'devis' && filterChoosed !== 'date' &&
                            <select>
                                {filterChoosed === 'validation' &&
                                    <>
                                        <option value=''>Statut validation</option>
                                        <option value='en cours'>En cours</option>
                                        <option value='payé'>Payé</option>
                                        <option value='annulé'>Annulé</option>
                                    </>
                                }

                                {filterChoosed === 'paiement' &&
                                    <>
                                        <option value=''>Statut paiement</option>
                                        <option value='en cours'>En cours</option>
                                        <option value='payé'>Payé</option>
                                        <option value='annulé'>Annulé</option>
                                    </>
                                }
                            </select>
                        }
                    </div>

                    {/* for the post pay and pre pay */}
                    <div className='input_select_container'>
                        {filterChoosed && (title === 'post_pay' || title === 'pre_pay') && filterChoosed === 'paiement' &&
                            <select>
                                <option value=''>Statut paiement</option>
                                <option value='en cours'>En cours</option>
                                <option value='payé'>Payé</option>
                                <option value='annulé'>Annulé</option>
                            </select>
                        }
                    </div>

                    <div className='input_date_container'>
                        {/* for the devis */}
                        {(title === 'devis' && filterChoosed === 'date') &&
                            <>
                                <input type='date' name='date_begin' id='date_begin' />
                                <input type='date' name='date_end' id='date_end' />
                            </>
                        }

                        {/* for the post pay and pre pay */}
                        {filterChoosed && (title === 'post_pay' || title === 'pre_pay') && filterChoosed === 'date' &&
                            <>
                                <input type='date' name='date_begin' id='date_begin' />
                                <input type='date' name='date_end' id='date_end' />
                            </>
                        }

                        {/* for information and news */}
                        {(title === 'news' || title === 'information') &&
                            <>
                                <input type='date' name='date_begin' id='date_begin' />
                                <input type='date' name='date_end' id='date_end' />
                            </>
                        }
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