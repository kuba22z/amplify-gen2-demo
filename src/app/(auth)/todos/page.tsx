'use client'
// pages/index.tsx
import React, {useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';
import {Schema} from '@/../amplify/data/resource';
import {Button, View} from "@aws-amplify/ui-react";
import {TodoCreateForm} from "@/ui-components";
import {TodoCreateFormInputValues} from "@/ui-components/TodoCreateForm";

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function Todos() {
    const [todos, setTodos] = useState<Schema['Todo'][]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newTodo, setNewTod] = useState({})

    async function listTodos() {
        // fetch all todos
        client.models.Todo
            .list({authMode: 'userPool'})
            .then((response) => setTodos(response.data))
            .catch(error => console.error(error));
        setIsLoading(false)
    }
    async function createTodo(fields: TodoCreateFormInputValues) {
        const d= await client.models.Todo.create({
            // prompt the user to enter the title
            content: fields.content,
            isDone: fields.isDone,
            priority: 'medium'
        }).then(response => {
            console.log(response.data);
            return response.data
        })
            .then(newDto => {
                setTodos(prevState => prevState.concat(newDto))
                return {
                    content: newDto.content ? newDto.content : "",
                    isDone: newDto.isDone === undefined || newDto.isDone === null ? false : newDto.isDone,
                    priority: newDto.priority === undefined || newDto.priority === null ? "" : newDto.priority.toString(),
                }
            }).catch(a => {
                console.error(a);
                return {}
            });
        setNewTod(d);
    }


    useEffect(() => {
        setIsLoading(true)
        listTodos();
    }, []);

    return (
        <main>
            <View style={styles.container}>
                <h1>Hello, Amplify 👋</h1>

                <TodoCreateForm onSubmit={(a) => {
                    //TODO TodoCreateForm can do this out of the box. Problem:
                   // Not Authorized to access createTodo on type Mutation
                    createTodo(a); return newTodo}}>
                </TodoCreateForm>
                <div>
                    {isLoading ? <text>Loading...</text> : <ul>
                        {todos.map((todo) => (
                            <div key={todo.id}>
                            <li key={todo.id}>{todo.content}</li>
                            <Button onClick={
                                () => client.models.Todo.delete({id:todo.id})
                            } > Delete </Button>
                            </div>
                        ))}
                    </ul>}
                </div>
            </View>
        </main>
    );
}


const styles = {
    container: {
        width: 700,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    todo: {marginBottom: 15},
    input: {border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
    todoName: {fontSize: 20, fontWeight: 'bold'},
    todoDescription: {marginBottom: 0},
    button: {backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px'}
}
