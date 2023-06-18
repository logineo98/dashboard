export const isTokenExpired = (actual: number, final: number) => {
    if (final < actual) return true; else return false
}

export const displayDate = (date: number) => {
    const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const hour = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : new Date(date).getHours()
    const minute = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()

    return `${day}/${month}/${year} ${hour}:${minute}`
}

export const formatNumberWithSpaces = (data: number) => data?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const formatNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '')
    const formatted = rawValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

    return formatted
}

export const deleteSeparator = (input: string) => (input.replace(/\D/g, ''))
