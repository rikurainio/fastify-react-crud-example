import { DeleteBookParams, NewBookParams, UpdateBookParams } from '@buutti/shared'

export const getBooks = async () => {
  const response = await fetch('http://localhost:3000/v1/books/list')
  return await response.json()
}

export const updateBook = async (b: UpdateBookParams) => {
  return await fetch('http://localhost:3000/v1/books/', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(b),
  })
}

export const deleteBook = async (b: DeleteBookParams) => {
  return await fetch('http://localhost:3000/v1/books/', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(b)
  })
}

export const createBook = async (b: NewBookParams) => {
  return await fetch('http://localhost:3000/v1/books/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(b)
  })
}