'use client'
// pages/index.tsx
import {useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';
import {Schema} from '@/../amplify/data/resource';

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function Todos() {
    const [todos, setTodos] = useState<Schema['Todo'][]>([]);
    const [isLoading, setIsLoading] = useState(false)

    async function listTodos() {
        // fetch all todos
        client.models.Todo
            .list({authMode: 'userPool'})
            .then((response) => setTodos(response.data))
            .catch(error => console.error(error));
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        listTodos();
    }, []);

    return (
        <main>
            <h1>Hello, Amplify 👋</h1>
            <button onClick={async () => {
                // create a new Todo with the following attributes
                client.models.Todo.create({
                    // prompt the user to enter the title
                    content: window.prompt("title"),
                    isDone: false,
                    priority: 'medium'
                }).then(response => {console.log(response.data); return response.data})
                    .then(newDto => setTodos(prevState => prevState.concat(newDto)))
                    .catch(error => console.error(error));

            }}>Create
            </button>
            <div>
            {isLoading ? <text>Loading...</text> : <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.content}</li>
                ))}
            </ul>}
            </div>
        </main>
    );
}
