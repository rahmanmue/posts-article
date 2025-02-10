import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import TableContent from './TableContent'

export type PostsProps = {
  id: string,
  title: string,
  category: string,
  content?:string,
  status?:string,
}

const AllPosts = () => {
  const [status, setStatus] = useState<string>("publish");
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/all-articles");
      const resJson = await res.json()
      const newPost = resJson.filter((p : PostsProps)=> p.status === status)
      setPosts(newPost);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[status])


  return (
    <>
      <div className="flex justify-between flex-col md:flex-row">
        <h1 className="text-4xl font-semibold">All Posts</h1>
        <div className="flex gap-2 mt-3 mb-1">
          <Link to="/add-new">
           <Button variant="outline">Add New</Button>
          </Link>

          <Link to="/preview">
            <Button variant="outline">Preview</Button>
          </Link>
         
        </div>
      </div>


      <Tabs defaultValue="published" className="my-3 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="published" onClick={()=> setStatus("publish")}>Published</TabsTrigger>
          <TabsTrigger value="draft" onClick={()=> setStatus("draft")} >Draft</TabsTrigger>
          <TabsTrigger value="thrash" onClick={()=> setStatus("thrash")} >Thrash</TabsTrigger>
        </TabsList>
        <TabsContent value="published">
          <TableContent posts={posts || []} fetchData = {fetchData}/>
        </TabsContent>
        <TabsContent value="draft">
          <TableContent posts={posts || []} fetchData = {fetchData}/>
        </TabsContent>
        <TabsContent value="thrash">
          <TableContent posts={posts || []} fetchData = {fetchData}/>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default AllPosts