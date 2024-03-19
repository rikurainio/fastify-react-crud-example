import BookForm from './bookForm'
import { getBooks } from '../services/book'
import { useQuery } from '@tanstack/react-query'
import { NewBookParams } from '@buutti/shared'
import React from 'react'
import BookCard from './bookCard'

const Books = () => {
  const [editingBook, setEditingBook] = React.useState<number | undefined>(undefined)
  const [formData, setFormData] = React.useState<NewBookParams>({
    title: '',
    author: '',
    description: '',
  });

  const { data: books }: any = useQuery({
    queryKey: ["books"],
    queryFn: getBooks
  })

  return (
    <div className='lg:flex w-full gap-3'>
      <BookForm 
        formData={formData}
        setFormData={setFormData} 
        editingBook={editingBook}
        setEditingBook={setEditingBook}
      />
      
      {/** Map books */}
      <div className='w-full h-full overflow-y-scroll flex flex-col gap-2 border border-border rounded p-2 mt-[4.25rem] max-h-[35vh] lg:max-h-[80vh]'>
        {books && books.map((book: any) => 
          <BookCard
            key={book.id}
            book={book} 
            onClick={() => {
              setEditingBook(book.id as number)
              setFormData(book as NewBookParams)
            }}
        />
        )}
      </div>
    </div>
  )
}

export default Books