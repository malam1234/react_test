import { useQuery } from 'urql';
import React from 'react';

const GET_COUNTRIES = `
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

const Milking: React.FC = () => {
    const [{ data, fetching, error }] = useQuery({ query: GET_COUNTRIES });
    return (
        <div style={{ padding: 24 }}>
            <h2>Milking Page</h2>
            <p>Welcome to the Milking page!</p>
            <h3>Books List (GraphQL Example):</h3>
            {fetching && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.allBooks && (
                <ul>
                    {data.allBooks.slice(0, 10).map((book: any) => (
                        <li key={book.id}>
                            {book.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Milking;
