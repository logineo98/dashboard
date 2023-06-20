export const regex = {
    phone: /(^[5-9]{1}[0-9]{7}$)/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    username: /^[^\s]+$/
}

export const upload_files = {
    FILES_ALLOW_TYPES: ['image/jpeg', 'image/jpg', 'image/png'], // to be extend later
    MAX_SIZE: 1 * 1024 * 1024, // 1 MO
}