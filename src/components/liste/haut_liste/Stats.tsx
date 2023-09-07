import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'

const Stats: PAGE_COMPONENT_TYPE = ({ title }) => {

    const { allAdmins, allUsers } = useSelector((state: RootReducerType) => state.user)
    const { allDevis } = useSelector((state: RootReducerType) => state.devis)
    const { allPostPays } = useSelector((state: RootReducerType) => state.post_pay)
    const { allPrePays } = useSelector((state: RootReducerType) => state.pre_pay)

    return (
        <div className='stat_top_data_table_title'>
            {(title !== 'news' && title !== 'information' && title !== 'town' && title !== 'commune' && title !== 'quarter') && <p className='title'>Statistiques</p>}

            {title === 'admin' &&
                <div className='stat_container'>
                    <div className='stat'>
                        <span className='stat_name'>Statut compte : <span style={{}}>activé</span> </span>
                        <span className='stat_number'> {allAdmins?.filter((admin: any) => admin?.enabled === true)?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut compte : <span style={{}}>non activé</span> </span>
                        <span className='stat_number'> {allAdmins?.filter((admin: any) => admin?.enabled === false)?.length} </span>
                    </div>
                </div>
            }

            {title === 'client' &&
                <div className='stat_container'>
                    <div className='stat'>
                        <span className='stat_name'>Statut compte : <span style={{}}>activé</span> </span>
                        <span className='stat_number'> {allUsers?.filter((client: any) => client?.enabled === true)?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut compte : <span style={{}}>non activé</span> </span>
                        <span className='stat_number'> {allUsers?.filter((client: any) => client?.enabled === false)?.length} </span>
                    </div>
                </div>
            }

            {title === 'devis' &&
                <div className='stat_container'>
                    <div className='stat'>
                        <span className='stat_name'>Statut validation : <span style={{}}>En cours</span> </span>
                        <span className='stat_number'> {allDevis?.filter((devis: any) => devis?.status === 'PENDING')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut validation : <span style={{}}>Validé</span> </span>
                        <span className='stat_number'> {allDevis?.filter((devis: any) => devis?.status === 'VALIDATED')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut validation : <span style={{}}>Rejeté</span> </span>
                        <span className='stat_number'> {allDevis?.filter((devis: any) => devis?.status === 'REJECT')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>En cours</span> </span>
                        <span className='stat_number'> {allDevis?.filter((devis: any) => devis?.paymentStatus === 'PENDING')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>Payé</span> </span>
                        <span className='stat_number'> {allDevis?.filter((devis: any) => devis?.paymentStatus === 'PAID')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>Annulé</span> </span>
                        <span className='stat_number'> {allDevis?.filter((devis: any) => devis?.paymentStatus === 'CANCELED')?.length} </span>
                    </div>
                </div>
            }

            {title === 'post_pay' &&
                <div className='stat_container'>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>En cours</span> </span>
                        <span className='stat_number'> {allPostPays?.filter((post_pay: any) => post_pay?.status === 'PENDING')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>Payé</span> </span>
                        <span className='stat_number'> {allPostPays?.filter((post_pay: any) => post_pay?.status === 'PAID')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>Annulé</span> </span>
                        <span className='stat_number'> {allPostPays?.filter((post_pay: any) => post_pay?.status === 'CANCELED')?.length} </span>
                    </div>
                </div>
            }

            {title === 'pre_pay' &&
                <div className='stat_container'>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>En cours</span> </span>
                        <span className='stat_number'> {allPrePays?.filter((post_pay: any) => post_pay?.status === 'PENDING')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>Payé</span> </span>
                        <span className='stat_number'> {allPrePays?.filter((post_pay: any) => post_pay?.status === 'PAID')?.length} </span>
                    </div>
                    <div className='stat'>
                        <span className='stat_name'>Statut paiement : <span style={{}}>Annulé</span> </span>
                        <span className='stat_number'> {allPrePays?.filter((post_pay: any) => post_pay?.status === 'CANCELED')?.length} </span>
                    </div>
                </div>
            }

        </div>
    )
}

export default Stats