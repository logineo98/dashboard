import Admin from '../pages/Admin'
import Assistance from '../pages/Assistance'
import ClientsMobile from '../pages/ClientMobile'
import Commune from '../pages/Commune'
import CreditISAGO from '../pages/CreditISAGO'
import Dashboard from '../pages/Dashboard'
import Devis from '../pages/Devis'
import FacturePostPay from '../pages/FacturePostPay'
import ForgetPassword from '../pages/ForgetPassword'
import Historical from '../pages/Historical'
import Information from '../pages/Information'
import Login from '../pages/Login'
import News from '../pages/News'
import Page404 from '../pages/Page404'
import Quarter from '../pages/Quarter'
import Town from '../pages/Town'
import { PAGE_COMPONENT_TYPE } from './types'

export const routeConnected: Array<{ path: string, Element: PAGE_COMPONENT_TYPE }> = [
    { path: '/', Element: Dashboard },
    { path: '/list-devis', Element: Devis },
    { path: '/list-facture-post-pay', Element: FacturePostPay },
    { path: '/list-credit-isago', Element: CreditISAGO },
    { path: '/town', Element: Town },
    { path: '/historical', Element: Historical },
    { path: '/assistance', Element: Assistance },
    { path: '/information', Element: Information },
    { path: '/news', Element: News },
    { path: '/client', Element: ClientsMobile },
    { path: '/admin', Element: Admin },
    { path: '/quarter', Element: Quarter },
    { path: '/commune', Element: Commune },

    { path: '*', Element: Page404 }
]

export const routeNotConnected: Array<{ path: string, Element: PAGE_COMPONENT_TYPE }> = [
    { path: '/', Element: Login },
    { path: '/forget-password', Element: ForgetPassword },
    { path: '/list-devis', Element: Devis },
    { path: '/list-facture-post-pay', Element: FacturePostPay },
    { path: '/list-credit-isago', Element: CreditISAGO },
    { path: '/town', Element: Town },
    { path: '/historical', Element: Historical },
    { path: '/assistance', Element: Assistance },
    { path: '/information', Element: Information },
    { path: '/news', Element: News },
    { path: '/client', Element: ClientsMobile },
    { path: '/admin', Element: Admin },
    { path: '/quarter', Element: Quarter },
    { path: '/commune', Element: Commune },

    { path: '*', Element: Page404 }
]