import './App.css';
import Navbar from './components/Navbar';
import { createClient, Provider, cacheExchange, fetchExchange } from 'urql';

const client = createClient({
    // url: 'https://countries.trevorblades.com/',
    url: 'http://localhost:8001/graphql/',
    exchanges: [cacheExchange, fetchExchange],
});

function AppWrapper() {
    return (
        <Provider value={client}>
            <Navbar />
        </Provider>
    );
}

export default AppWrapper;
