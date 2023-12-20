'use client'
// pages/index.tsx
import {useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';
import {Schema} from '@/amplify/data/resource';

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function HomePage() {
    const [todos, setTodos] = useState<Schema['Todo'][]>([]);

    async function listTodos() {
        // fetch all todos
        const {data} = await client.models.Todo.list({
            authMode: 'userPool'
        })  ;
        setTodos(data);
    }

    useEffect(() => {
        listTodos();
    }, []);

    return (
        <main>
            <h1>Hello, Amplify 👋</h1>
            <button onClick={async () => {
                // create a new Todo with the following attributes
                const {errors, data: newTodo} = await client.models.Todo.create({
                    // prompt the user to enter the title
                    content: window.prompt("title"),
                    isDone: false,
                    priority: 'medium'
                })
                console.log(errors, newTodo);
            }}>Create
            </button>
            <ul>
                {todos.map((todo) => (

                    <li key={todo.id}>{todo.content}</li>

                ))}
            </ul>
        </main>
    );
}
