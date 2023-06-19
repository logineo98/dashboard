import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MdPayment, MdHistory, MdOutlineDashboardCustomize, MdOutlineAssistant, MdOutlineNewspaper, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown, MdOutlineAdminPanelSettings } from 'react-icons/md'
import { RiInformationLine } from 'react-icons/ri'
import { TbFileInvoice, TbTower } from 'react-icons/tb'
import { GiSmartphone } from 'react-icons/gi'

const SideBar = () => {
    const { pathname } = useLocation()

    const menu = {
        dashboard: pathname === '/' ? true : false,
        devis: pathname === '/list-devis' ? true : false,
        paiement: (pathname === '/list-credit-isago' || pathname === '/list-facture-post-pay') ? true : false,
        historical: pathname === '/historical' ? true : false,
        town: pathname === '/town' ? true : false,
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
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
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
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
                        </div>
                    </NavLink>
                </li>

                <li className={menu.paiement ? 'container payment active' : 'payment container'}>
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
                        <li><NavLink to='/list-facture-post-pay' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>Post payé</NavLink></li>
                        <li><NavLink to='/list-credit-isago' className={({ isActive }) => { if (isActive) return 'lien active'; else return 'lien' }}>ISAGO</NavLink></li>
                    </ul>
                </li>

                <li className={menu.town ? 'container active' : 'container'}>
                    <NavLink to='/town' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <TbTower className='icon' />
                                <p>Villes</p>
                            </div>
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
                        </div>
                    </NavLink>
                </li>

                {/* <li className={menu.historical ? 'container active' : 'container'}>
                    <NavLink to='/historical' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <MdHistory className='icon' />
                                <p>Historiques</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className='fleche' />
                        </div>
                    </NavLink>
                </li> */}

                <li className={menu.assistance ? 'container active' : 'container'}>
                    <NavLink to='/assistance' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <MdOutlineAssistant className='icon' />
                                <p>Assistances</p>
                            </div>
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
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
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
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
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
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
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
                        </div>
                    </NavLink>
                </li>

                <li className={menu.admin ? 'container active' : 'container'}>
                    <NavLink to='/admin' className={({ isActive }) => { if (isActive) return 'menu_name active'; else return 'menu_name' }}>
                        <div className='titre-fleche'>
                            <div className='titre-icon'>
                                <MdOutlineAdminPanelSettings className='icon' />
                                <p>Administrateurs</p>
                            </div>
                            {/* <MdOutlineKeyboardArrowRight className='fleche' /> */}
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SideBar