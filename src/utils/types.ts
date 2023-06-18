export type FORGET_PASSWORD_TYPE = {
    user: boolean
    choose: boolean
    code: boolean
    write_password: boolean
    success: boolean
}

export type PIN_TYPE = {
    id: string | null
    type?: string
    pin?: string
    password?: string
}

export type COLUMN_DATA_TABLE_TYPE = {
    id: string
    username: string
    name: string
    email: string
    phone: string
    enabled: boolean
    role: string
    confirm: number
    title: string
    content: string
    image: string | File
    createdAt: number
    updatedAt: number
    nom: string
    prenom: string
    profession: string
    civilite: string
    nomJeuneFille: string
    typeIdentification: string
    numeroIdentification: string
    telephoneMobile: string
    telephoneFixe: string
    typeCompteur: string
    typeDemande: string
    usage: string
    // ville: ADD_EDIT_TOWN_TYPE
    commune: string
    quartier: string
    rue: string
    lot: string
    procheDe: string
    porte: number
    status: string
    climatiseur: number
    ventilateur: number
    machineLaver: number
    ampoule: number
    chauffeEau: number
    ordinateur: number
    telephone: number
    congelateur: number
    refrigerateur: number
    televiseur: number
    bouilloireElectrique: number
    ferRepasser: number
    autre: number
    proTitrePropriete: string
    quittusEdm: string
    proCopieIdentite: string
    proCopieVisa: string
    locTitrePropriete: string
    autBranchement: string
    locCopieIdentiteProprietaire: string
    locCopieIdentiteLocataire: string
    locCopieVisa: string
    paymentStatus: string
    address: string
    invoice: string
    amountPaid: number
    amountToBePaid: number
    amount: number
    compteur: string
    owner: string
    customerCode: string
    rechargeCode: string
    nbKw: string | string
    motif: string
    localisation: string
    customer: { name: string, phone: string }
}

export type PAGE_COMPONENT_TYPE = (props: {
    title?: string
    name_add?: string
    seeAdminAdmin?: boolean
    seeAddNewsInformation?: boolean
    seeAddTown?: boolean
    nbSelectedRow?: number
    ElementSelected?: Array<COLUMN_DATA_TABLE_TYPE>
    emptyRowSelected?: boolean
    setSeeAdminAdmin?: React.Dispatch<React.SetStateAction<boolean>>
    setSeeAddNewsInformation?: React.Dispatch<React.SetStateAction<boolean>>
    setSeeAddTown?: React.Dispatch<React.SetStateAction<boolean>>
    setElementSelected?: React.Dispatch<React.SetStateAction<COLUMN_DATA_TABLE_TYPE[]>>
    setSearch?: React.Dispatch<React.SetStateAction<string>>
    setEmptyRowSelected?: React.Dispatch<React.SetStateAction<boolean>>
}) => JSX.Element