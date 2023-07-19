import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineFilter } from 'react-icons/ai'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { filterDevis, getAllDevis } from '../../../redux/actions/deivs.actions'
import { RootReducerType } from '../../../redux/store'
import { filterPostPay, getAllPostPays } from '../../../redux/actions/post_pay.actions'
import { filterPrePay, getAllPrePays } from '../../../redux/actions/pre_pay.actions'
import { filterClient, getAllClients } from '../../../redux/actions/user.actions'

const FilterExportImport: PAGE_COMPONENT_TYPE = ({ title }) => {

    const [displayFilter, setDisplayFilter] = useState(false)
    const [devisFilterData, setDevisFilterData] = useState<{ status?: string | null, paymentStatus?: string | null, begin?: string | null, end?: string | null }>({ status: '', paymentStatus: '', begin: '', end: '' })
    const [postPayFilterData, setPostPayFilterData] = useState<{ paymentStatus?: string | null, begin?: string | null, end?: string | null }>({ paymentStatus: '', begin: '', end: '' })
    const [prePayFilterData, setPrePayFilterData] = useState<{ paymentStatus?: string | null, begin?: string | null, end?: string | null }>({ paymentStatus: '', begin: '', end: '' })
    const [clientFilterData, setClientFilterData] = useState<{ enable?: string | boolean | null }>({ enable: '' })

    const { devisFilter } = useSelector((state: RootReducerType) => state.devis)
    const { postPayFilter } = useSelector((state: RootReducerType) => state.post_pay)
    const { prePayFilter } = useSelector((state: RootReducerType) => state.pre_pay)
    const { clientFilter } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (title === 'devis') {
            dispatch(filterDevis({
                begin: devisFilterData.begin ? devisFilterData.begin : null,
                end: devisFilterData.end ? devisFilterData.end : null,
                paymentStatus: devisFilterData.paymentStatus ? devisFilterData.paymentStatus : null,
                status: devisFilterData.status ? devisFilterData.status : null,
            }))
        } else if (title === 'post_pay') {
            dispatch(filterPostPay({
                begin: postPayFilterData.begin ? postPayFilterData.begin : null,
                end: postPayFilterData.end ? postPayFilterData.end : null,
                paymentStatus: postPayFilterData.paymentStatus ? postPayFilterData.paymentStatus : null,
            }))
        } else if (title === 'pre_pay') {
            dispatch(filterPrePay({
                begin: prePayFilterData.begin ? prePayFilterData.begin : null,
                end: prePayFilterData.end ? prePayFilterData.end : null,
                paymentStatus: prePayFilterData.paymentStatus ? prePayFilterData.paymentStatus : null,
            }))
        } else if (title === 'client') {
            dispatch(filterClient({
                enable: clientFilterData?.enable === 'activé' ? true : clientFilterData?.enable === 'non activé' ? false : null
            }))
        }

        setDisplayFilter(false)
    }

    return (
        <div className='filter_import_export_container'>
            <div className='filter_type_close'>
                {(title !== 'news' && title !== 'information' && title !== 'town' && title !== 'admin') &&
                    <button className='filter_container' onClick={() => setDisplayFilter(prev => !prev)}>
                        <AiOutlineFilter className='filter_icon' />
                    </button>
                }

                {devisFilter && title === 'devis' &&
                    <div className='type_filter_close'>
                        <span className='type'>Annuler le filtre</span>
                        <button className='close_container' onClick={() => dispatch(getAllDevis())}>
                            <AiOutlineClose className='close_icon' />
                        </button>
                    </div>
                }

                {postPayFilter && title === 'post_pay' &&
                    <div className='type_filter_close'>
                        <span className='type'>Annuler le filtre</span>
                        <button className='close_container' onClick={() => dispatch(getAllPostPays())}>
                            <AiOutlineClose className='close_icon' />
                        </button>
                    </div>
                }

                {prePayFilter && title === 'pre_pay' &&
                    <div className='type_filter_close'>
                        <span className='type'>Annuler le filtre</span>
                        <button className='close_container' onClick={() => dispatch(getAllPrePays())}>
                            <AiOutlineClose className='close_icon' />
                        </button>
                    </div>
                }

                {clientFilter && title === 'client' &&
                    <div className='type_filter_close'>
                        <span className='type'>Annuler le filtre</span>
                        <button className='close_container' onClick={() => dispatch(getAllClients())}>
                            <AiOutlineClose className='close_icon' />
                        </button>
                    </div>
                }
            </div>

            {displayFilter &&
                <form onSubmit={handleFilter} className='filter_form'>
                    {(title !== 'news' && title !== 'information') &&
                        <>
                            {/* devis validation*/}
                            <div className='input_select_container'>
                                {title === 'devis' &&
                                    <select onChange={e => setDevisFilterData({ ...devisFilterData, status: e.target.value })} value={devisFilterData.status as string}>
                                        <option value=''>Statut de validation</option>
                                        <option value='PENDING'>En cours</option>
                                        <option value='REJECT'>Rejeté</option>
                                        <option value='VALIDATED'>Validé</option>
                                    </select>
                                }
                            </div>

                            {/* devis paiement*/}
                            <div className='input_select_container'>
                                {title === 'devis' &&
                                    <select onChange={e => setDevisFilterData({ ...devisFilterData, paymentStatus: e.target.value })} value={devisFilterData.paymentStatus as string}>
                                        <option value=''>Statut de paiement</option>
                                        <option value='PENDING'>En cours</option>
                                        <option value='CANCELED'>Annulé</option>
                                        <option value='PAID'>Payé</option>
                                    </select>
                                }
                            </div>

                            {/* post pay */}
                            <div className='input_select_container'>
                                {(title === 'post_pay') &&
                                    <select onChange={e => setPostPayFilterData({ ...postPayFilterData, paymentStatus: e.target.value })} value={postPayFilterData.paymentStatus as string}>
                                        <option value=''>Statut de paiement</option>
                                        <option value='PENDING'>En cours</option>
                                        <option value='CANCELED'>Annulé</option>
                                        <option value='PAID'>Payé</option>
                                    </select>
                                }
                            </div>

                            {/* pre pay */}
                            <div className='input_select_container'>
                                {(title === 'pre_pay') &&
                                    <select onChange={e => setPrePayFilterData({ ...prePayFilterData, paymentStatus: e.target.value })} value={prePayFilterData.paymentStatus as string}>
                                        <option value=''>Statut de paiement</option>
                                        <option value='PENDING'>En cours</option>
                                        <option value='CANCELED'>Annulé</option>
                                        <option value='PAID'>Payé</option>
                                    </select>
                                }
                            </div>

                            {/* client */}
                            <div className='input_select_container'>
                                {(title === 'client') &&
                                    <select onChange={e => setClientFilterData({ ...clientFilterData, enable: e.target.value })} value={clientFilterData.enable as string}>
                                        <option value=''>Statut du compte</option>
                                        <option value='activé'>Activé</option>
                                        <option value='non activé'>Non activé</option>
                                    </select>
                                }
                            </div>
                        </>
                    }

                    <div className='input_date_container'>
                        {(title === 'devis') &&
                            <>
                                <input type='date' name='begin' id='begin' value={devisFilterData.begin as string} onChange={e => setDevisFilterData({ ...devisFilterData, begin: e.target.value })} />
                                <input type='date' name='end' id='end' value={devisFilterData.end as string} onChange={e => setDevisFilterData({ ...devisFilterData, end: e.target.value })} />
                            </>
                        }

                        {(title === 'post_pay') &&
                            <>
                                <input type='date' name='begin' id='begin' value={postPayFilterData.begin as string} onChange={e => setPostPayFilterData({ ...postPayFilterData, begin: e.target.value })} />
                                <input type='date' name='end' id='end' value={postPayFilterData.end as string} onChange={e => setPostPayFilterData({ ...postPayFilterData, end: e.target.value })} />
                            </>
                        }

                        {(title === 'pre_pay') &&
                            <>
                                <input type='date' name='begin' id='begin' value={prePayFilterData.begin as string} onChange={e => setPrePayFilterData({ ...prePayFilterData, begin: e.target.value })} />
                                <input type='date' name='end' id='end' value={prePayFilterData.end as string} onChange={e => setPrePayFilterData({ ...prePayFilterData, end: e.target.value })} />
                            </>
                        }
                    </div>

                    <div className='cancel_apply_container'>
                        <button className='cancel' onClick={() => setDisplayFilter(false)}>Fermer</button>
                        <button className='apply'>Appliquer</button>
                    </div>
                </form>
            }

            {(title !== 'news' && title !== 'information' && title !== 'town' && title !== 'admin' && title !== 'client') &&
                <div className='import_export_container'>
                    <button className='exporter'>Exporter</button>
                    <button className='importer'>Importer</button>
                </div>
            }

        </div>
    )
}

export default FilterExportImport