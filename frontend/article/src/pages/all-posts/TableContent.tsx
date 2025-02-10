import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Pencil,
    Trash2
  } from "lucide-react"
import { Link } from 'react-router-dom'
import { PostsProps } from './AllPosts'


type TableContentProps = {
    posts: PostsProps[],
    fetchData: () => void
}

const TableContent : React.FC<TableContentProps> = ({posts, fetchData}) => {
 const handleTrash = async (post: PostsProps) => {
    try {
        const updatedPost = { ...post, status: "thrash" };
        console.log(updatedPost)
        const res = await fetch(`http://localhost:8000/article/${post.id}`, {
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        })
        console.log(res)

        if(res.ok){
            alert("Succes Move to Trash")
            fetchData()
            return
        }


    } catch (error) {
        console.log(error)
    }
 }


  return (
    <Table>
        <TableCaption>A list of articles published.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {posts.map((p, index)=> (
                <TableRow key={p.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                    <Link to={`/edit/${p.id}`}>
                        <Button variant="outline"><Pencil /></Button>
                    </Link>
                    <Button variant="destructive" onClick={()=> handleTrash(p)}> <Trash2 /></Button>
                </TableCell>
                </TableRow>

            ))}
        </TableBody>
    </Table>
  )
}

export default TableContent