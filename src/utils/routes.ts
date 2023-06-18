import Dashboard from '../pages/Dashboard'
import ForgetPassword from '../pages/ForgetPassword'
import Login from '../pages/Login'
import Page404 from '../pages/Page404'
import { PAGE_COMPONENT_TYPE } from './types'

export const routeConnected: Array<{ path: string, Element: PAGE_COMPONENT_TYPE }> = [
    { path: '/', Element: Dashboard },

    { path: '*', Element: Page404 },
]

export const routeNotConnected: Array<{ path: string, Element: PAGE_COMPONENT_TYPE }> = [
    { path: '/', Element: Login },
    { path: '/forget-password', Element: ForgetPassword },

    { path: '*', Element: Page404 },
]