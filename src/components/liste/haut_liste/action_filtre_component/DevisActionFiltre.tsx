import React, { useEffect, useState } from 'react'
import { PAGE_COMPONENT_TYPE, VALIDATION_DEVIS_TYPE } from '../../../../utils/types'
import { toast } from 'react-toastify'
import { RootReducerType } from '../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import { api_img } from '../../../../redux/constants'
import { validation_devis } from '../../../../utils/validation'
import { validateDevis } from '../../../../redux/actions/deivs.actions'
import Loading from '../../../loading/Loading'
import { deleteSeparator, formatNumberInput, formatNumberWithSpaces } from '../../../../utils/functions'

const DevisActionFiltre: PAGE_COMPONENT_TYPE = ({ nbSelectedRow, ElementSelected, setEmptyRowSelected, setElementSelected }) => {

    const data: VALIDATION_DEVIS_TYPE = { amount: '', motif: '', status: '' }

    const [chooseAction, setChooseAction] = useState('')
    const [chooseStatus, setChooseStatus] = useState('')
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [menu, setMenu] = useState({ info: true, file: false })
    const [validationDevisData, setValidationDevisData] = useState(data)
    const [err, setErr] = useState<VALIDATION_DEVIS_TYPE>()

    const { allDevis, loadingDevis } = useSelector((state: RootReducerType) => state.devis)
    const dispatch = useDispatch<any>()

    const handleChooseAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (chooseAction) {
            if (chooseAction === 'afficher') {
                setSeeModalDisplayEditDelete(true)
                allDevis?.forEach((devis: any) => {
                    if (ElementSelected && ElementSelected.length === 1 && devis?.id === ElementSelected[0].id) ElementSelected[0] = devis
                })
            } else if (chooseAction === 'valider') {
                if (ElementSelected) {
                    if (ElementSelected.length === 1) {
                        if (ElementSelected[0].paymentStatus === 'PAID') toast.warn('Ce devis a déjà été par le demandeur.')
                        else {
                            allDevis?.forEach((devis: any) => {
                                if (ElementSelected && ElementSelected.length === 1 && devis?.id === ElementSelected[0].id) ElementSelected[0] = devis
                            })
                            setSeeModalDisplayEditDelete(true)
                            setChooseStatus('')
                        }
                    }
                }
            }
        } else {
            toast.warn('Veuillez selectionner une action à effectuer')
        }
    }

    const handleSubmit = (id: string) => {

        const { error, initialError } = validation_devis(validationDevisData)

        if (error.amount !== initialError.amount || error.motif !== initialError.motif) {
            setErr(error)
        } else {
            setErr(initialError)
            const { amount } = validationDevisData

            if (chooseStatus) {
                if (chooseStatus === 'PENDING') {
                    dispatch(validateDevis(id, { amount: 0, motif: '', status: chooseStatus }, setSeeModalDisplayEditDelete, setValidationDevisData))
                } else if (chooseStatus === 'VALIDATED') {
                    dispatch(validateDevis(id, { ...validationDevisData, amount: parseInt(deleteSeparator(amount as string), 10) }, setSeeModalDisplayEditDelete, setValidationDevisData))
                } else if (chooseStatus === 'REJECT') {
                    dispatch(validateDevis(id, { ...validationDevisData, amount: 0 }, setSeeModalDisplayEditDelete, setValidationDevisData))
                }
            } else toast.warn('Veuillez selectionner un statut')
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

                    {chooseAction && chooseAction === 'afficher' &&
                        <div className='display_edit_delete_modal_container devis'>
                            <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); }} />

                            <div className='icon_name'>
                                <div className='icon_name_container'>
                                    <FaUserCircle className='icon' />
                                    <p>DEVIS</p>
                                </div>
                            </div>

                            {ElementSelected?.map((devis, i) => (
                                <div key={i} className='display_information_devis'>
                                    <div className='container'>
                                        <div className='menu'>
                                            <span className={menu.info ? 'active' : ''} onClick={() => setMenu({ file: false, info: true })}>Informations</span>
                                            <span className={menu.file ? 'active' : ''} onClick={() => setMenu({ file: true, info: false })}>Fichiers</span>
                                        </div>
                                        <div className='menu_body'>
                                            {menu.info &&
                                                <div className='info_container'>
                                                    <p className='global_title'>Information sur le demandeur</p>
                                                    <div className='container'>
                                                        <div className='information_container'>
                                                            <span className='title'>Nom complet</span>
                                                            <span className='value'> {devis.nom.toUpperCase()} {devis.prenom} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Email</span>
                                                            <span className='value'> {devis.email ? devis.email : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Profession</span>
                                                            <span className='value'> {devis.profession ? devis.profession : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nom de jeune fille</span>
                                                            <span className='value'> {devis.nomJeuneFille ? devis.nomJeuneFille : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Type d'identification</span>
                                                            <span className='value'> {devis.typeIdentification ? devis.typeIdentification : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Numéro d'identification</span>
                                                            <span className='value'> {devis.numeroIdentification ? devis.numeroIdentification : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Téléphone mobile</span>
                                                            <span className='value'> {devis.telephoneMobile ? devis.telephoneMobile : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Téléphone fixe</span>
                                                            <span className='value'> {devis.telephoneFixe ? devis.telephoneFixe : 'N/A'} </span>
                                                        </div>
                                                    </div>

                                                    <p className='global_title'>Information sur le compteur</p>
                                                    <div className='container'>
                                                        <div className='information_container'>
                                                            <span className='title'>Type de compteur</span>
                                                            <span className='value'> {devis.typeCompteur ? devis.typeCompteur : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Type de demande</span>
                                                            <span className='value'> {devis.typeDemande ? devis.typeDemande : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Usage</span>
                                                            <span className='value'> {devis.usage ? devis.usage : 'N/A'} </span>
                                                        </div>
                                                    </div>

                                                    <p className='global_title'>Information sur les appareils</p>
                                                    <div className='container'>
                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de climatiseur</span>
                                                            <span className='value'> {devis.climatiseur ? devis.climatiseur : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de ventilateur</span>
                                                            <span className='value'> {devis.ventilateur ? devis.ventilateur : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de machine à laver</span>
                                                            <span className='value'> {devis.machineLaver ? devis.machineLaver : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre d'ampoule</span>
                                                            <span className='value'> {devis.ampoule ? devis.ampoule : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de chauffe à eau</span>
                                                            <span className='value'> {devis.chauffeEau ? devis.chauffeEau : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre d'ordinateur</span>
                                                            <span className='value'> {devis.ordinateur ? devis.ordinateur : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de téléphone</span>
                                                            <span className='value'> {devis.telephone ? devis.telephone : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de congélateur</span>
                                                            <span className='value'> {devis.congelateur ? devis.congelateur : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de réfrigérateur</span>
                                                            <span className='value'> {devis.refrigerateur ? devis.refrigerateur : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de téléviseur</span>
                                                            <span className='value'> {devis.televiseur ? devis.televiseur : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de bouilloire électrique</span>
                                                            <span className='value'> {devis.bouilloireElectrique ? devis.bouilloireElectrique : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre de fer à repasser</span>
                                                            <span className='value'> {devis.ferRepasser ? devis.ferRepasser : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Nombre d'autres choses</span>
                                                            <span className='value'> {devis.autre ? devis.autre : 'N/A'} </span>
                                                        </div>
                                                    </div>

                                                    <p className='global_title'>Information sur les status et les paiements</p>
                                                    <div className='container'>
                                                        <div className='information_container'>
                                                            <span className='title'>Statut validation</span>
                                                            <span className='value'> {devis.status === 'PENDING' ? 'En attente' : devis.status === 'REJECT' ? 'Rejeté' : devis.status === 'VALIDATED' ? 'Validé' : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Montant après validation</span>
                                                            <span className='value'> {formatNumberWithSpaces(devis.amount)} FCFA </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Motif après rejet</span>
                                                            <span className='value rejet'> {devis.motif ? devis.motif : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Statut paiement</span>
                                                            <span className='value'> {devis.paymentStatus === 'PENDING' ? 'En attente' : devis.paymentStatus === 'CANCELED' ? 'Annulé' : devis.paymentStatus === 'PAID' ? 'Payé' : 'N/A'} </span>
                                                        </div>
                                                    </div>

                                                    <p className='global_title'>Adresse</p>
                                                    <div className='container'>
                                                        <div className='information_container'>
                                                            <span className='title'>Ville</span>
                                                            <span className='value'> {devis.ville.name ? devis.ville.name : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Commune</span>
                                                            <span className='value'> {devis.commune ? devis.commune : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Quartier</span>
                                                            <span className='value'> {devis.quartier ? devis.quartier : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Rue</span>
                                                            <span className='value'> {devis.rue ? devis.rue : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Porte</span>
                                                            <span className='value'> {devis.porte ? devis.porte : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Proche de</span>
                                                            <span className='value'> {devis.procheDe ? devis.procheDe : 'N/A'} </span>
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Localisation</span>
                                                            <span className='value'> {devis.localisation ? <a href={`https://maps.google.com/maps?q=${devis.localisation}`} target='_blank' rel='noreferrer'>Afficher dans le MAP</a> : 'N/A'} </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {menu.file &&
                                                <div className='file_container'>
                                                    <p className='global_title'>Fichier sur le propriétaire</p>
                                                    <div className='container'>
                                                        <div className='information_container'>
                                                            <span className='title'>Titre de propriété</span>
                                                            {devis.proTitrePropriete ?
                                                                !devis.proTitrePropriete.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.proTitrePropriete}`} alt='image_proTitrePropriete' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.proTitrePropriete}`}>Cliquez ici pour télécharger le document PDF</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Copie d'identité</span>
                                                            {devis.proCopieIdentite ?
                                                                !devis.proCopieIdentite.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.proCopieIdentite}`} alt='image_proCopieIdentite' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.proCopieIdentite}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Copie du visa</span>
                                                            {devis.proCopieVisa ?
                                                                !devis.proCopieVisa.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.proCopieVisa}`} alt='image_proCopieVisa' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.proCopieVisa}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Quittus EDM</span>
                                                            {devis.quittusEdm ?
                                                                !devis.quittusEdm.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.quittusEdm}`} alt='image_quittusEdm' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.quittusEdm}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>
                                                    </div>

                                                    <p className='global_title'>Fichier sur le locateur</p>
                                                    <div className='container'>
                                                        <div className='information_container'>
                                                            <span className='title'>Titre de propriété</span>
                                                            {devis.locTitrePropriete ?
                                                                !devis.locTitrePropriete.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.locTitrePropriete}`} alt='image_locTitrePropriete' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.locTitrePropriete}`}>Cliquez ici pour télécharger le document PDF</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Copie d'identité du locateur</span>
                                                            {devis.locCopieIdentiteLocataire ?
                                                                !devis.locCopieIdentiteLocataire.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.locCopieIdentiteLocataire}`} alt='image_locCopieIdentiteLocataire' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.locCopieIdentiteLocataire}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Copie d'identité du propriétaire</span>
                                                            {devis.locCopieIdentiteProprietaire ?
                                                                !devis.locCopieIdentiteProprietaire.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.locCopieIdentiteProprietaire}`} alt='image_locCopieIdentiteProprietaire' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.locCopieIdentiteProprietaire}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Copie du visa</span>
                                                            {devis.locCopieVisa ?
                                                                !devis.locCopieVisa.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.locCopieVisa}`} alt='image_locCopieVisa' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.locCopieVisa}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>

                                                        <div className='information_container'>
                                                            <span className='title'>Attestion de l'aut. du branchement</span>
                                                            {devis.autBranchement ?
                                                                !devis.autBranchement.endsWith('.pdf') ?
                                                                    <div className='value_img'>
                                                                        <img src={`${api_img}/${devis.autBranchement}`} alt='image_autBranchement' />
                                                                    </div> :
                                                                    <div className='value_pdf'>
                                                                        <a href={`${api_img}/${devis.autBranchement}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                                    </div>
                                                                : <span className='value'>N/A</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    }

                    {chooseAction && chooseAction === 'valider' &&
                        <div className='display_edit_delete_modal_container'>
                            <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); }} />

                            <div className='loading_container'>
                                {loadingDevis && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                            </div>

                            <div className='icon_name'>
                                <div className='icon_name_container'>
                                    <FaUserCircle className='icon' />
                                    <p>DEVIS</p>
                                </div>
                            </div>

                            {ElementSelected?.map((devis, i) => (
                                <form key={i} onSubmit={(e) => { e.preventDefault(); handleSubmit(devis.id) }}>
                                    <div className='select_label_container'>
                                        <label htmlFor='status'>Statut :</label>
                                        <select name='status' id='status' onChange={e => { setChooseStatus(e.target.value); setValidationDevisData({ ...validationDevisData, status: e.target.value }) }}>
                                            <option value=''>Chosir un statut</option>
                                            {devis.status !== 'PENDING' && <option value='PENDING'>En attente</option>}
                                            {devis.status !== 'VALIDATED' && <option value='VALIDATED'>Valider</option>}
                                            {devis.status !== 'REJECT' && <option value='REJECT'>Rejeter</option>}
                                        </select>
                                    </div>

                                    {chooseStatus === 'VALIDATED' &&
                                        <div className='input_label_container'>
                                            <label htmlFor='amount'>Montant en FCFA</label>
                                            <input type='text' name='amount' id='amount' value={validationDevisData.amount} onChange={e => setValidationDevisData({ amount: formatNumberInput(e), motif: '', status: chooseStatus })} />
                                            {err?.amount && <span className='error'> {err?.amount} </span>}
                                        </div>
                                    }

                                    {chooseStatus === 'REJECT' &&
                                        <div className='textarea_label_container'>
                                            <label htmlFor='motif'>Motif du rejet</label>
                                            <textarea name='motif' id='motif' value={validationDevisData.motif} onChange={e => setValidationDevisData({ amount: '', motif: e.target.value, status: chooseStatus })} />
                                            {err?.motif && <span className='error'> {err?.motif} </span>}
                                        </div>
                                    }

                                    <div className='save_abort'>
                                        <button disabled={loadingDevis ? true : false} style={{ cursor: loadingDevis ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                        <button type='reset' className='abort' disabled={loadingDevis ? true : false} style={{ cursor: loadingDevis ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); setValidationDevisData(data); setErr(data) }}>Annuler</button>
                                    </div>

                                </form>
                            ))
                            }
                        </div>
                    }
                </div>
            }

            <div className='form_filtre'>
                {nbSelectedRow && nbSelectedRow <= 1 ?
                    <form className='action' onSubmit={handleChooseAction}>
                        <select name='action' id='action' value={(localStorage.getItem('choose_action') && localStorage.getItem('choose_action')) as string} onChange={e => { setChooseAction(e.target.value); localStorage.setItem('choose_action', e.target.value) }}>
                            <option value=''>Chosir une action</option>
                            <option value='afficher'>Afficher</option>
                            <option value='valider'>Valider</option>
                        </select>
                        <button>Appliquer</button>
                    </form> :
                    <form className='action' onSubmit={e => { e.preventDefault(); toast.warn('Veuillez selectionner au plus un seul devis') }}>
                        <select name='action' id='action'>
                            <option value=''>Veuillez selectionner au plus un seul devis</option>
                        </select>
                        <button>Appliquer</button>
                    </form>
                }
            </div>

            <span className='nb_elements'>{allDevis.length} éléments</span>
        </div >
    )
}

export default DevisActionFiltre