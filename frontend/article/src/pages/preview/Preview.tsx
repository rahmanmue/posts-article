import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    // PaginationNext,
    // PaginationPrevious,
  } from "@/components/ui/pagination"
import { PostsProps } from '../all-posts/AllPosts';
import { Button } from '@/components/ui/button';

const Preview = () => {
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const [page, setPage] = useState<number>(1)
  const [disable, setDisable] = useState(false)

  const fetchData = async () => {
    try {
        const limit = 2;
        const offset = (page - 1) * limit;
        const res = await fetch(`http://localhost:8000/article/${limit}/${offset}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const resJson = await res.json()
        // console.log(resJson)
        setPosts(resJson)

        if(resJson.length == 0){
            setDisable(true)
        }else{
            setDisable(false)
        }
    
        // const postPublish = resJson.filter((p)=> p.status == "publish")
        // setPosts(postPublish)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [page])


  return (
    <>
    <h1 className="text-4xl font-semibold">Preview</h1>
    {posts.map((p, index)=> (
      <div className="mt-3" key={index}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{p.title}</CardTitle>
            <CardDescription>{p.category}</CardDescription>
          </CardHeader>
          <CardContent className="-my-2">
            <p>{p.content}</p>
          </CardContent>
          <CardFooter>
            <small>{p.status}</small>
          </CardFooter>
        </Card>
      </div>
    ))}

      <div className="my-3">
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <Button onClick={()=> setPage((prev)=> Math.max(prev -1 , 1))}>Prev</Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem className="cursor-pointer">
              <Button disabled={disable} onClick={()=> setPage((prev)=> Math.max(prev +1))} >Next</Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default Preview