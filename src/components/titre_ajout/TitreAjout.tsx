import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../utils/types'

const TitreAjout: PAGE_COMPONENT_TYPE = ({ title, name_add, setSeeAdminAdmin, setSeeAddNewsInformation, setSeeAddTown, setSeeCommune, setSeeQuarter, }) => (

  <div className='titre_ajout'>
    <h1>{title}</h1>
    {name_add === 'admin' && <p onClick={() => setSeeAdminAdmin && setSeeAdminAdmin(true)}>Ajouter</p>}
    {name_add === 'news' && <p onClick={() => setSeeAddNewsInformation && setSeeAddNewsInformation(true)}>Ajouter</p>}
    {name_add === 'information' && <p onClick={() => setSeeAddNewsInformation && setSeeAddNewsInformation(true)}>Ajouter</p>}
    {name_add === 'town' && <p onClick={() => setSeeAddTown && setSeeAddTown(true)}>Ajouter</p>}
    {name_add === 'commune' && <p onClick={() => setSeeCommune && setSeeCommune(true)}>Ajouter</p>}
    {name_add === 'quarter' && <p onClick={() => setSeeQuarter && setSeeQuarter(true)}>Ajouter</p>}
  </div>
)

export default TitreAjout