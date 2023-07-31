import React, { FC, useState } from 'react'
import { COLUMN_DATA_TABLE_TYPE, VALIDATION_DEVIS_TYPE } from '../../../utils/types'
import Loading from '../../loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import { api_img } from '../../../redux/constants'
import { deleteSeparator, formatNumberInput, formatNumberWithSpaces } from '../../../utils/functions'
import { validation_devis } from '../../../utils/validation'
import { validateDevis } from '../../../redux/actions/devis.actions'
import { toast } from 'react-toastify'

// importation icons
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'

type DEVIS_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const DevisModal: FC<DEVIS_MODAL_TYPE> = ({ row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type }) => {

    const data: VALIDATION_DEVIS_TYPE = { amount: '', motif: '', status: '' }

    const [validationDevisData, setValidationDevisData] = useState(data)
    const [err, setErr] = useState<VALIDATION_DEVIS_TYPE>()
    const [menu, setMenu] = useState({ info: true, file: false })
    const [chooseStatus, setChooseStatus] = useState('')

    const { loadingDevis } = useSelector((state: RootReducerType) => state.devis)
    const dispatch = useDispatch<any>()

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

    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
                <div className='overlay'></div>

                {type === 'afficher' &&
                    <div className='display_edit_delete_modal_container devis'>
                        <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false) }} />

                        <div className='icon_name'>
                            <div className='icon_name_container'>
                                <FaUserCircle className='icon' />
                                <p>DEVIS</p>
                            </div>
                        </div>

                        <div className='display_information_devis'>
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
                                                    <span className='value'> {row?.nom.toUpperCase()} {row?.prenom} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Email</span>
                                                    <span className='value'> {row?.email ? row?.email : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Profession</span>
                                                    <span className='value'> {row?.profession ? row?.profession : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nom de jeune fille</span>
                                                    <span className='value'> {row?.nomJeuneFille ? row?.nomJeuneFille : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Type d'identification</span>
                                                    <span className='value'> {row?.typeIdentification ? row?.typeIdentification : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Numéro d'identification</span>
                                                    <span className='value'> {row?.numeroIdentification ? row?.numeroIdentification : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Téléphone mobile</span>
                                                    <span className='value'> {row?.telephoneMobile ? row?.telephoneMobile : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Téléphone fixe</span>
                                                    <span className='value'> {row?.telephoneFixe ? row?.telephoneFixe : 'N/A'} </span>
                                                </div>
                                            </div>

                                            <p className='global_title'>Information sur le compteur</p>
                                            <div className='container'>
                                                <div className='information_container'>
                                                    <span className='title'>Type de compteur</span>
                                                    <span className='value'> {row?.typeCompteur ? row?.typeCompteur : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Type de demande</span>
                                                    <span className='value'> {row?.typeDemande ? row?.typeDemande : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Usage</span>
                                                    <span className='value'> {row?.usage ? row?.usage : 'N/A'} </span>
                                                </div>
                                            </div>

                                            <p className='global_title'>Information sur les appareils</p>
                                            <div className='container'>
                                                <div className='information_container'>
                                                    <span className='title'>Nombre de climatiseur</span>
                                                    <span className='value'> {row?.climatiseur ? row?.climatiseur : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de ventilateur</span>
                                                    <span className='value'> {row?.ventilateur ? row?.ventilateur : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de machine à laver</span>
                                                    <span className='value'> {row?.machineLaver ? row?.machineLaver : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre d'ampoule</span>
                                                    <span className='value'> {row?.ampoule ? row?.ampoule : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de chauffe à eau</span>
                                                    <span className='value'> {row?.chauffeEau ? row?.chauffeEau : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre d'ordinateur</span>
                                                    <span className='value'> {row?.ordinateur ? row?.ordinateur : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de téléphone</span>
                                                    <span className='value'> {row?.telephone ? row?.telephone : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de congélateur</span>
                                                    <span className='value'> {row?.congelateur ? row?.congelateur : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de réfrigérateur</span>
                                                    <span className='value'> {row?.refrigerateur ? row?.refrigerateur : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de téléviseur</span>
                                                    <span className='value'> {row?.televiseur ? row?.televiseur : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de bouilloire électrique</span>
                                                    <span className='value'> {row?.bouilloireElectrique ? row?.bouilloireElectrique : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre de fer à repasser</span>
                                                    <span className='value'> {row?.ferRepasser ? row?.ferRepasser : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Nombre d'autres choses</span>
                                                    <span className='value'> {row?.autre ? row?.autre : 'N/A'} </span>
                                                </div>
                                            </div>

                                            <p className='global_title'>Information sur les status et les paiements</p>
                                            <div className='container'>
                                                <div className='information_container'>
                                                    <span className='title'>Statut validation</span>
                                                    <span className='value'> {row?.status === 'PENDING' ? 'En attente' : row?.status === 'REJECT' ? 'Rejeté' : row?.status === 'VALIDATED' ? 'Validé' : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Montant après validation</span>
                                                    <span className='value'> {formatNumberWithSpaces(row?.amount)} FCFA </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Motif après rejet</span>
                                                    <span className='value rejet'> {row?.motif ? row?.motif : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Statut paiement</span>
                                                    <span className='value'> {row?.paymentStatus === 'PENDING' ? 'En attente' : row?.paymentStatus === 'CANCELED' ? 'Annulé' : row?.paymentStatus === 'PAID' ? 'Payé' : 'N/A'} </span>
                                                </div>
                                            </div>

                                            <p className='global_title'>Adresse</p>
                                            <div className='container'>
                                                <div className='information_container'>
                                                    <span className='title'>Ville</span>
                                                    <span className='value'> {row?.ville.name ? row?.ville.name : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Commune</span>
                                                    <span className='value'> {row?.commune ? row?.commune as string : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Quartier</span>
                                                    <span className='value'> {row?.quartier ? row?.quartier : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Rue</span>
                                                    <span className='value'> {row?.rue ? row?.rue : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Porte</span>
                                                    <span className='value'> {row?.porte ? row?.porte : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Proche de</span>
                                                    <span className='value'> {row?.procheDe ? row?.procheDe : 'N/A'} </span>
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Localisation</span>
                                                    <span className='value'> {row?.localisation ? <a href={`https://maps.google.com/maps?q=${row?.localisation}`} target='_blank' rel='noreferrer'>Afficher dans le MAP</a> : 'N/A'} </span>
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
                                                    {row?.proTitrePropriete ?
                                                        !row?.proTitrePropriete.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.proTitrePropriete}`} alt='image_proTitrePropriete' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.proTitrePropriete}`}>Cliquez ici pour télécharger le document PDF</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Copie d'identité</span>
                                                    {row?.proCopieIdentite ?
                                                        !row?.proCopieIdentite.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.proCopieIdentite}`} alt='image_proCopieIdentite' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.proCopieIdentite}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Copie du visa</span>
                                                    {row?.proCopieVisa ?
                                                        !row?.proCopieVisa.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.proCopieVisa}`} alt='image_proCopieVisa' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.proCopieVisa}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Quittus EDM</span>
                                                    {row?.quittusEdm ?
                                                        !row?.quittusEdm.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.quittusEdm}`} alt='image_quittusEdm' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.quittusEdm}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>
                                            </div>

                                            <p className='global_title'>Fichier sur le locateur</p>
                                            <div className='container'>
                                                <div className='information_container'>
                                                    <span className='title'>Titre de propriété</span>
                                                    {row?.locTitrePropriete ?
                                                        !row?.locTitrePropriete.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.locTitrePropriete}`} alt='image_locTitrePropriete' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.locTitrePropriete}`}>Cliquez ici pour télécharger le document PDF</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Copie d'identité du locateur</span>
                                                    {row?.locCopieIdentiteLocataire ?
                                                        !row?.locCopieIdentiteLocataire.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.locCopieIdentiteLocataire}`} alt='image_locCopieIdentiteLocataire' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.locCopieIdentiteLocataire}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Copie d'identité du propriétaire</span>
                                                    {row?.locCopieIdentiteProprietaire ?
                                                        !row?.locCopieIdentiteProprietaire.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.locCopieIdentiteProprietaire}`} alt='image_locCopieIdentiteProprietaire' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.locCopieIdentiteProprietaire}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Copie du visa</span>
                                                    {row?.locCopieVisa ?
                                                        !row?.locCopieVisa.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.locCopieVisa}`} alt='image_locCopieVisa' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.locCopieVisa}`}>Cliquez ici pour télécharger le document PDF.</a>
                                                            </div>
                                                        : <span className='value'>N/A</span>
                                                    }
                                                </div>

                                                <div className='information_container'>
                                                    <span className='title'>Attestion de l'aut. du branchement</span>
                                                    {row?.autBranchement ?
                                                        !row?.autBranchement.endsWith('.pdf') ?
                                                            <div className='value_img'>
                                                                <img src={`${api_img}/${row?.autBranchement}`} alt='image_autBranchement' />
                                                            </div> :
                                                            <div className='value_pdf'>
                                                                <a href={`${api_img}/${row?.autBranchement}`}>Cliquez ici pour télécharger le document PDF.</a>
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
                    </div>
                }

                {type === 'valider' &&
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

                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(row?.id) }}>
                            <div className='select_label_container'>
                                <label htmlFor='status'>Statut :</label>
                                <select name='status' id='status' onChange={e => { setChooseStatus(e.target.value); setValidationDevisData({ ...validationDevisData, status: e.target.value }) }}>
                                    <option value=''>Chosir un statut</option>
                                    {row?.status !== 'PENDING' && <option value='PENDING'>En attente</option>}
                                    {row?.status !== 'VALIDATED' && <option value='VALIDATED'>Valider</option>}
                                    {row?.status !== 'REJECT' && <option value='REJECT'>Rejeter</option>}
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
                                <button type='reset' className='abort' disabled={loadingDevis ? true : false} style={{ cursor: loadingDevis ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete(false); setValidationDevisData(data); setErr(data) }}>Annuler</button>
                            </div>

                        </form>
                    </div>
                }
            </div> : <></>
    )
}

export default DevisModal