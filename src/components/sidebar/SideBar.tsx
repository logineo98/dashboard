import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MdPayment, MdOutlineDashboardCustomize, MdOutlineAssistant, MdOutlineNewspaper, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { RiInformationLine } from 'react-icons/ri'
import { TbFileInvoice } from 'react-icons/tb'
import { GiSmartphone } from 'react-icons/gi'
import { AiOutlineSetting } from 'react-icons/ai'

const SideBar = () => {
    const { pathname } = useLocation()

    const menu = {
        dashboard: pathname === '/' ? true : false,
        devis: pathname === '/list-devis' ? true : false,
        paiement: (pathname === '/list-credit-isago' || pathname === '/list-facture-post-pay') ? true : false,
        setting: (pathname === '/admin' || pathname === '/town' || pathname === '/quarter' || pathname === '/commune') ? true : false,
        historical: pathname === '/historical' ? true : false,
        assistance: pathname === '/assistance' ? true : false,
        information: pathname === '/information' ? true : false,
        news: pathname === '/news' ? true : false,
        client: pathname === '/client' ? true : false,
        admin: pathname === '/admin' ? true : false
    }

    return (
        <div className='sidebar_container'>

            <ul className='menus'>
                <li className={menu.dashboard ? 'container active' : 'container'}>
                    <NavLink to='/' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <MdOutlineDashboardCustomize className='icon' />
                                <p>Tableau de bord</p>
                            </div>
                        </div>
                    </NavLink>
                </li>

                <li className={menu.devis ? 'container active' : 'container'}>
                    <NavLink to='/list-devis' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <TbFileInvoice className='icon' />
                                <p>Devis</p>
                            </div>
                        </div>
                    </NavLink>
                </li>

                <li className={menu.paiement ? 'container sub_menu active' : 'sub_menu container'}>
                    <NavLink to='/list-facture-post-pay' className={({ isActive }) => { if (isActive || pathname === '/list-credit-isago') return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <MdPayment className='icon' />
                                <p>Paiements</p>
                            </div>
                            {menu.paiement ? <MdOutlineKeyboardArrowDown className='fleche' /> : <MdOutlineKeyboardArrowRight className='fleche' />}
                        </div>
                    </NavLink>
                    <ul className='sous_menus'>
                        <li><NavLink to='/list-facture-post-pay' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>Post PAID</NavLink></li>
                        <li><NavLink to='/list-credit-isago' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>ISAGO</NavLink></li>
                    </ul>
                </li>

                <li className={menu.assistance ? 'container active' : 'container'}>
                    <NavLink to='/assistance' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <MdOutlineAssistant className='icon' />
                                <p>Assistances</p>
                            </div>
                        </div>
                    </NavLink>
                </li>

                <li className={menu.information ? 'container active' : 'container'}>
                    <NavLink to='/information' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <RiInformationLine className='icon' />
                                <p>Informations</p>
                            </div>
                        </div>
                    </NavLink>
                </li>

                <li className={menu.news ? 'container active' : 'container'}>
                    <NavLink to='/news' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <MdOutlineNewspaper className='icon' />
                                <p>Actualités</p>
                            </div>
                        </div>
                    </NavLink>
                </li>

                <li className={menu.client ? 'container active' : 'container'}>
                    <NavLink to='/client' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <GiSmartphone className='icon' />
                                <p>Clients mobiles</p>
                            </div>
                        </div>
                    </NavLink>
                </li>

                <li className={menu.setting ? 'container sub_menu active' : 'sub_menu container'}>
                    <NavLink to='/admin' className={({ isActive }) => { if (isActive || pathname === '/town' || pathname === '/quarter' || pathname === '/commune') return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <AiOutlineSetting className='icon' />
                                <p>Paramètres</p>
                            </div>
                            {menu.setting ? <MdOutlineKeyboardArrowDown className='fleche' /> : <MdOutlineKeyboardArrowRight className='fleche' />}
                        </div>
                    </NavLink>
                    <ul className='sous_menus'>
                        <li><NavLink to='/admin' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>Administrateurs</NavLink></li>
                        <li><NavLink to='/town' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>Villes</NavLink></li>
                        <li><NavLink to='/commune' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>Communes</NavLink></li>
                        <li><NavLink to='/quarter' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>Quartiers</NavLink></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default SideBar