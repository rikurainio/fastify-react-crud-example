import React from "react";
import { cn } from "../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "../services/book";
import { NewBookParams } from "@buutti/shared";
import TextArea from "./textArea";
import Button from "./button";
import Input from "./input";

interface BookFormProps {
  formData: NewBookParams
  setFormData: React.Dispatch<React.SetStateAction<NewBookParams>>
  editingBook: number | undefined
  setEditingBook: React.Dispatch<React.SetStateAction<number | undefined>>
}

const BookForm = ({ formData, setFormData, editingBook, setEditingBook }: BookFormProps) => {
  const queryClient = useQueryClient()
  const mutationCreateBook = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    }
  })
  const mutationUpdateBook = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books" ]})
    }
  })
  const mutationDeleteBook = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    }
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const submitter = e.nativeEvent.submitter.name
    if (submitter === 'button-save-new') {
      mutationCreateBook.mutate({
        ...formData
      })
    } 
    if(editingBook){
      if (submitter === 'button-save-edit') {
        mutationUpdateBook.mutate({
          id: editingBook,
          ...formData,
        })
      } 
      else if (submitter === 'button-delete') {
        mutationDeleteBook.mutate({
          id: editingBook,
        })
      }
    }
    setEditingBook(undefined)
    setFormData({
      author: "",
      description: "",
      title: "",
    })
  };

  return (
    <form className="my-6 w-full" onSubmit={handleSubmit}>
      <LabelInputContainer>
        <label htmlFor="title">Title</label>
        <Input
          required
          id="title"
          maxLength={100}
          className="rounded"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </LabelInputContainer>
      <LabelInputContainer>
        <label htmlFor="author">Author</label>
        <Input
          required
          id="author"
          maxLength={50}
          className="rounded"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </LabelInputContainer>
      <LabelInputContainer>
        <label htmlFor="description">Description</label>
        <TextArea
          required
          id="description"
          maxLength={350}
          className="rounded"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </LabelInputContainer>
      <div className="flex flex-col lg:flex-row gap-2 mt-4">
        <Button disabled={!!editingBook}  className={cn(editingBook && 'bg-black bg-opacity-40 pointer-events-none')} type="submit" name="button-save-new">Save New</Button>
        <Button disabled={!!!editingBook} className={cn(!!!editingBook && 'bg-black bg-opacity-40 pointer-events-none')} type="submit" name="button-save-edit">Save</Button>
        <Button disabled={!!!editingBook} className={cn(!!!editingBook && 'bg-black bg-opacity-40 pointer-events-none')} type="submit" name="button-delete">Delete</Button>
      </div>
    </form>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col w-full mt-4 gap-1", className)}>
      {children}
    </div>
  );
};

export default BookForm