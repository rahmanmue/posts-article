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
  const [status, setStatus] = useState<string>("Publish");
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


      <Tabs defaultValue="Publish" className="my-3 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Publish" onClick={()=> setStatus("Publish")}>Publish</TabsTrigger>
          <TabsTrigger value="Draft" onClick={()=> setStatus("Draft")} >Draft</TabsTrigger>
          <TabsTrigger value="Thrash" onClick={()=> setStatus("Thrash")} >Thrash</TabsTrigger>
        </TabsList>
        <TabsContent value="Publish">
          <TableContent posts={posts || []} fetchData = {fetchData} status={status}/>
        </TabsContent>
        <TabsContent value="Draft">
          <TableContent posts={posts || []} fetchData = {fetchData} status={status}/>
        </TabsContent>
        <TabsContent value="Thrash">
          <TableContent posts={posts || []} fetchData = {fetchData} status={status} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default AllPosts