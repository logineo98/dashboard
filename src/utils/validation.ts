import { regex, upload_files } from './constant';
import { deleteSeparator } from './functions';
import { ADD_EDIT_ADMIN_TYPE, ADD_EDIT_COMMUNE_TYPE, ADD_EDIT_NEWS_INFORMATION_TYPE, ADD_EDIT_QUARTER_TYPE, ADD_EDIT_TOWN_TYPE, VALIDATION_DEVIS_TYPE } from './types';

export const validation_add_admin = (props: ADD_EDIT_ADMIN_TYPE) => {
    const { email, name, password, password_confirm, phone, username } = props

    const initialError: ADD_EDIT_ADMIN_TYPE = { name: '', username: '', email: '', phone: '', password: '', password_confirm: '' }
    let error = initialError

    if (!name || name.trim() === '') {
        error = { ...error, name: 'Veuillez renseigner le champ.' }
    }

    if (!username || username.trim() === '') {
        error = { ...error, username: 'Veuillez renseigner le champ.' }
    } else if (!regex.username.test(username)) {
        error = { ...error, username: 'Format non valide.' }
    } else if (username.length < 4) {
        error = { ...error, username: 'Doit être supérieur ou égal à 4 caractères.' }
    }

    if (!email || email.trim() === '') {
        error = { ...error, email: 'Veuillez renseigner le champ.' }
    } else if (!regex.email.test(email)) {
        error = { ...error, email: 'Format d\'email incorrect.' }
    }

    if (!phone || phone.trim() === '') {
        error = { ...error, phone: 'Veuillez renseigner le champ.' }
    } else if (!regex.phone.test(phone)) {
        error = { ...error, phone: 'Format du numéro incorrect.' }
    }

    if (!password || password.trim() === '') {
        error = { ...error, password: 'Veuillez renseigner le champ.' }
    } else if (password.length < 6) {
        error = { ...error, password: 'Doit être supérieur ou égal à 6 caractères.' }
    }

    if (password && password.trim() !== '') {
        if (password !== password_confirm) {
            error = { ...error, password_confirm: 'Les deux mots de passe ne correspondent pas.' }
        }
    }

    return { error, initialError }
}

export const validation_edit_admin = (props: ADD_EDIT_ADMIN_TYPE) => {
    const { email, name, password, password_confirm, phone, username } = props

    const initialError: ADD_EDIT_ADMIN_TYPE = { name: '', username: '', email: '', phone: '', password: '', password_confirm: '' }
    let error = initialError

    if (!name || name.trim() === '') error = { ...error, name: 'Veuillez renseigner le champ.' }

    if (!username || username.trim() === '') {
        error = { ...error, username: 'Veuillez renseigner le champ.' }
    } else if (!regex.username.test(username)) {
        error = { ...error, username: 'Format non valide.' }
    } else if (username.length < 4) {
        error = { ...error, username: 'Doit être supérieur ou égal à 4 caractères.' }
    }

    if (!email || email.trim() === '') {
        error = { ...error, email: 'Veuillez renseigner le champ.' }
    } else if (!regex.email.test(email)) {
        error = { ...error, email: 'Format d\'email incorrect.' }
    }

    if (!phone || phone.trim() === '') {
        error = { ...error, phone: 'Veuillez renseigner le champ.' }
    } else if (!regex.phone.test(phone)) {
        error = { ...error, phone: 'Format du numéro incorrect.' }
    }

    if (password) {
        if (password.trim() === '') {
            error = { ...error, password: 'Veuillez renseigner le champ.' }
        } else if (password.length < 6) {
            error = { ...error, password: 'Doit être supérieur ou égal à 6 caractères.' }
        }
    }

    if (password && password.trim() !== '') {
        if (password !== password_confirm) {
            error = { ...error, password_confirm: 'Les deux mots de passe ne correspondent pas.' }
        }
    }

    return { error, initialError }
}

export const validation_news = (info: boolean, props: ADD_EDIT_NEWS_INFORMATION_TYPE) => {
    const { content, image, title, type, diffusionItems } = props
    const initialError: ADD_EDIT_NEWS_INFORMATION_TYPE = { content: '', image: '', title: '', type: '', diffusionItems: '' }
    let error = initialError

    console.log(props)

    if (image) {
        if (typeof image !== 'string') {
            if (!upload_files.FILES_ALLOW_TYPES.includes(image.type)) {
                error = { ...error, image: 'Seul les fichiers JPEG, PNG, JPG sont autorisés' }
            } else if (image.size > upload_files.MAX_SIZE) {
                error = { ...error, image: 'La taille du fichier ne doit pas depasser 1 Mo' }
            }
        }
    }

    if (info) {
        if (!type || type.trim() === '') error = { ...error, type: 'Veuillez sélectionner une cible' }

        if (typeof diffusionItems !== 'string') {
            if (diffusionItems?.length === 0) error = { ...error, diffusionItems: 'Veuillez faire au moins un choix' }
        }
    }

    if (!title || title.trim() === '') error = { ...error, title: 'Veuillez renseigner le champ.' }

    if (!content || content.trim() === '') error = { ...error, content: 'Veuillez renseigner le champ.' }

    return { error, initialError }
}

export const validation_town = (props: ADD_EDIT_TOWN_TYPE) => {
    const { name } = props
    const initialError: ADD_EDIT_TOWN_TYPE = { name: '' }
    let error = initialError

    if (!name || name.trim() === '') error = { ...error, name: 'Veuillez renseigner le champ.' }

    return { error, initialError }
}

export const validation_devis = (props: VALIDATION_DEVIS_TYPE) => {
    const { amount, motif, status } = props
    const initialError: VALIDATION_DEVIS_TYPE = { amount: '', motif: '', status: '' }
    let error = initialError

    if (status === 'PENDING') {
        error = initialError
    } else if (status === 'VALIDATED') {
        if (!amount || (amount as string).trim() === '') error = { ...error, amount: 'Veuillez renseigner le champ.', motif: '', status: '' }
        else if (parseInt(deleteSeparator(amount as string), 10) < 500) error = { ...error, amount: 'Veuillez saisir un montant d\'au moins 500 FCFA.', motif: '', status: '' }
    } else if (status === 'REJECT') {
        if (!motif || motif.trim() === '') error = { ...error, amount: '', motif: 'Veuillez renseigner le champ.', status: '' }
        else if (motif.length > 255) error = { ...error, amount: '', motif: 'Doit être inférieur ou égal à 255 caractères.', status: '' }
    }

    return { error, initialError }
}

export const validation_commune = (props: ADD_EDIT_COMMUNE_TYPE) => {
    const { cityId, name } = props
    const initialError: ADD_EDIT_COMMUNE_TYPE = { cityId: '', name: '' }
    let error = initialError

    if (!name || name.trim() === '') error = { ...error, name: 'Veuillez renseigner le champ.' }
    if (!cityId) error = { ...error, cityId: 'Veuillez sélectionner une ville.' }

    return { error, initialError }
}

export const validation_quarter = (props: ADD_EDIT_QUARTER_TYPE) => {
    const { communeId, name } = props
    const initialError: ADD_EDIT_QUARTER_TYPE = { communeId: '', name: '' }
    let error = initialError

    if (!name || name.trim() === '') error = { ...error, name: 'Veuillez renseigner le champ.' }
    if (!communeId) error = { ...error, communeId: 'Veuillez sélectionner une commune.' }

    return { error, initialError }
}