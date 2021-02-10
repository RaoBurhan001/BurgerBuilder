import axios from 'axios';

const instance=axios.create(
    {
        baseURL:'https://burgerbuilder-d12e5.firebaseio.com/'
    }
)
export default instance;