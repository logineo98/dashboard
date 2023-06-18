import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <div className='page404'>
            <div className='page404-container'>
                <h1>404</h1>
                <h4>Oups, Cette Page Est Introuvable !</h4>
                <h5>Le lien est peut-être corrompu</h5>
                <h6>ou la page a peut-être été supprimée</h6>
                <Link to='/' className='retour'>Revenir sur la page d'accueil</Link>
            </div>
        </div>
    )
}

export default Page404