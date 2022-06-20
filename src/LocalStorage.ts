const tokenId = 'token';
const productDetails = '@productDetails';

const LocalStorage = {
    getToken: (): string => {
        const tokenId =  localStorage.getItem('tokenId')

        if (!tokenId) {
            return ''
        }

        return tokenId
    },

    setToken: (token: string) => {
        localStorage.setItem('tokenId', token)
    },

    clearToken: () => {
        localStorage.removeItem('tokenId')
    }
}

export default LocalStorage