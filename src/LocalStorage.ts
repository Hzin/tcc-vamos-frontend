const tokenId = 'token';
const productDetails = '@productDetails';

const LocalStorage = {
    getToken: (): string | null => {
        return localStorage.getItem(tokenId)
    },

    setToken: (token: string) => {
        localStorage.setItem(tokenId, token)
    },

    clearToken: () => {
        localStorage.setItem(tokenId, '');
    }
}

export default LocalStorage