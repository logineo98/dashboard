import React from 'react'
import { GiSmartphone } from 'react-icons/gi'
import { MdOutlineAdminPanelSettings, MdOutlineNewspaper } from 'react-icons/md'
import { RiInformationLine } from 'react-icons/ri'
import { NUMBER_ELEMENT_DASHBOARD_TYPE } from './types'
import { TbFileInvoice } from 'react-icons/tb'

export const numberElements: Array<NUMBER_ELEMENT_DASHBOARD_TYPE> = [
    { title: 'devis', icon: <TbFileInvoice className='icon' />, name: 'Devis', link: '/list-devis' },
    { title: 'info', icon: <RiInformationLine className='icon' />, name: 'Informations', link: '/information' },
    { title: 'actu', icon: <MdOutlineNewspaper className='icon' />, name: 'Actualités', link: '/news' },
    { title: 'user', icon: <GiSmartphone className='icon' />, name: 'Clients mobiles', link: '/client' },
    { title: 'admin', icon: <MdOutlineAdminPanelSettings className='icon' />, name: 'Administrateurs', link: '/admin' },
]