/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      content
      createdAt
      id
      isDone
      owner
      priority
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTodos(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        content
        createdAt
        id
        isDone
        owner
        priority
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
