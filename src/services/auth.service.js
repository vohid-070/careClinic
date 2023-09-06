import axios from '../library/axios';

const AuthService = {
    login: async (userCredentials) => {
        const { data } = await axios.post('/api/v1/auth/authenticate', userCredentials);
        return data;
    }
};
export default AuthService;
