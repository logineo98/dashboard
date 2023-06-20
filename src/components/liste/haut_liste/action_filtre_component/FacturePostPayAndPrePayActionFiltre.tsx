import React, { useEffect, useState } from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../../utils/types'
import { toast } from 'react-toastify'
import { RootReducerType } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import { displayDate, formatNumberWithSpaces } from '../../../../utils/functions'

const FacturePostPayAndPrePayActionFiltre: PAGE_COMPONENT_TYPE = ({ title, nbSelectedRow, ElementSelected }) => {

  const [chooseAction, setChooseAction] = useState('')
  const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)

  const { allPostPays } = useSelector((state: RootReducerType) => state.post_pay)
  const { allPrePays } = useSelector((state: RootReducerType) => state.pre_pay)

  const handleChooseAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (chooseAction) {
      if (chooseAction === 'afficher') {
        setSeeModalDisplayEditDelete(true)
      }
    } else {
      toast.warn('Veuillez selectionner une action à effectuer')
    }
  }

  useEffect(() => {
    localStorage.setItem('choose_action', '')
  }, [])

  return (
    <div className='action_filtre'>
      {seeModalDisplayEditDelete &&
        <div className='display_edit_delete_modal'>
          <div className='overlay'></div>

          <div className='display_edit_delete_modal_container'>
            <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); }} />

            <div className='icon_name'>
              <div className='icon_name_container'>
                <FaUserCircle className='icon' />
                <p> {title === 'post_pay' ? 'FACTURE POST-PAYÉ' : 'FACTURE PRÉ-PAYÉ'} </p>
              </div>
            </div>

            {title === 'post_pay' && chooseAction && chooseAction === 'afficher' &&
              ElementSelected?.map((post_pre_pay, i) => (
                <div key={i} className='display_information'>
                  <div className='container'>
                    <div className='information_container'>
                      <span className='title'>Propriétaire compteur</span>
                      <span className='value'> {post_pre_pay?.owner?.length < 23 ? post_pre_pay?.owner : post_pre_pay?.owner.substring(0, 23) + '...'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Numéro facture</span>
                      <span className='value'> {post_pre_pay?.invoice} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Numéro compteur</span>
                      <span className='value'> {post_pre_pay?.compteur} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Adresse</span>
                      <span className='value'> {post_pre_pay?.address?.length < 23 ? post_pre_pay?.address : post_pre_pay?.address.substring(0, 23) + '...'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Montant total</span>
                      <span className='value'> {formatNumberWithSpaces(post_pre_pay?.amountToBePaid)} FCFA</span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Montant payé</span>
                      <span className='value'> {formatNumberWithSpaces(post_pre_pay?.amountPaid)} FCFA</span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Dernière modification</span>
                      <span className='value'> {displayDate(post_pre_pay?.updatedAt)} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Payement statut</span>
                      <span className='value'> {post_pre_pay?.status === 'PENDING' ? 'En cours' : post_pre_pay?.status === 'CANCELED' ? 'Annulé' : 'Payé'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Celui qui fait le paiement</span>
                      <span className='value'> {post_pre_pay?.customer?.name?.length < 23 ? post_pre_pay?.customer?.name : post_pre_pay?.customer?.name?.substring(0, 23) + '...'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Le numéro de retrait OM</span>
                      <span className='value'> {post_pre_pay?.phone} </span>
                    </div>
                  </div>
                </div>
              ))
            }

            {title === 'pre_pay' && chooseAction && chooseAction === 'afficher' &&
              ElementSelected?.map((post_pre_pay, i) => (
                <div key={i} className='display_information'>
                  <div className='container'>
                    <div className='information_container'>
                      <span className='title'>Propriétaire compteur</span>
                      <span className='value'> {post_pre_pay?.owner?.length < 23 ? post_pre_pay?.owner : post_pre_pay?.owner.substring(0, 23) + '...'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Numéro compteur</span>
                      <span className='value'> {post_pre_pay?.compteur} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Adresse</span>
                      <span className='value'> {post_pre_pay?.address?.length < 23 ? post_pre_pay?.address : post_pre_pay?.address.substring(0, 23) + '...'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Montant payé</span>
                      <span className='value'> {formatNumberWithSpaces(post_pre_pay?.amount)} FCFA</span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Code de recharge</span>
                      <span className='value'> {post_pre_pay.rechargeCode ? post_pre_pay.rechargeCode : 'N/A'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Nombre kilowatt (kW)</span>
                      <span className='value'> {post_pre_pay.nbKw ? post_pre_pay.nbKw : 'N/A'}</span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Dernière modification</span>
                      <span className='value'> {displayDate(post_pre_pay?.updatedAt)} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Payement statut</span>
                      <span className='value'> {post_pre_pay?.status === 'PENDING' ? 'En cours' : post_pre_pay?.status === 'CANCELED' ? 'Annulé' : 'Payé'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Celui qui fait le paiement</span>
                      <span className='value'> {post_pre_pay?.customer?.name?.length < 23 ? post_pre_pay?.customer?.name : post_pre_pay?.customer?.name?.substring(0, 23) + '...'} </span>
                    </div>

                    <div className='information_container'>
                      <span className='title'>Le numéro de retrait OM</span>
                      <span className='value'> {post_pre_pay?.phone} </span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      }

      <div className='form_filtre'>
        {nbSelectedRow && nbSelectedRow <= 1 ?
          <form className='action' onSubmit={handleChooseAction}>
            <select name='action' id='action' value={(localStorage.getItem('choose_action') && localStorage.getItem('choose_action')) as string} onChange={e => { setChooseAction(e.target.value); localStorage.setItem('choose_action', e.target.value) }}>
              <option value=''>Chosir une action</option>
              <option value='afficher'>Afficher</option>
            </select>
            <button>Appliquer</button>
          </form> :
          <form className='action' onSubmit={e => { e.preventDefault(); title === 'post_pay' ? toast.warn('Veuillez selectionner au plus une seule facture post-payé') : toast.warn('Veuillez selectionner au plus une seule facture pré-payé') }}>
            <select name='action' id='action'>
              <option value=''>Veuillez selectionner au plus une seule {title === 'post_pay' ? 'facture post-payé' : 'facture pré-payé'}</option>
            </select>
            <button>Appliquer</button>
          </form>
        }
      </div>

      <span className='nb_elements'>{title === 'post_pay' ? allPostPays.length : allPrePays.length} éléments</span>
    </div>
  )
}

export default FacturePostPayAndPrePayActionFiltre