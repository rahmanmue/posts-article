import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useParams } from 'react-router-dom'

type BaseData = {
    title: string,
    category:string,
    content: string,
    status?: string
}

const FormAction = () => {
  const {id} = useParams();

  const baseData: BaseData = {
    title:'',
    category:'',
    content:''
  }

  const [data, setData] = useState<BaseData>(baseData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    setData({...data, [e.target.name]: e.target.value})
    console.log(data)
  }

  const handlePublish = async () => {
    try {
        const url = id ? `http://localhost:8000/article/${id}` : 'http://localhost:8000/article';
        const method = id ? "PUT" : "POST"
        data.status = "Publish" 
        
        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    
        const resJson = await res.json();

        if(res.ok){
            alert("Success save to Publish");
        }

        if(resJson?.detail){
            const column = resJson.detail[0].loc[1];
            const messageError = resJson.detail[0].msg.replace("String", column);
            alert(messageError)
            return
        }

        if(!id){
            setData(baseData)
        }

    } catch (error) {
        console.log(error)
    }
   
  }

  const handleDraft = async () => {
    try {
        const url = id ? `http://localhost:8000/article/${id}` : 'http://localhost:8000/article';
        const method = id ? "PUT" : "POST"
        data.status = "Draft" 


        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    
        const resJson = await res.json();

        if(res.ok){
            alert("Success save to Draft");
        }

        if(resJson?.detail){
            const column = resJson.detail[0].loc[1];
            const messageError = resJson.detail[0].msg.replace("String", column);
            alert(messageError)
            return
        }

        if(!id){
            setData(baseData)
        }
    } catch (error) {
        console.log(error)
    }

   
  }

  useEffect(()=>{
    const fetchData = async (id:number) => {
        try {
            const res = await fetch(`http://localhost:8000/article/${id}`, {
                method: "GET"
            })
            const resJson = await res.json();
            setData(resJson)
        } catch (error) {
            console.log(error)
        }
    }

    fetchData(Number(id));
  },[id])

  return (
    <>
        <h1 className="text-4xl font-semibold">Form {id ? "Edit" : "Add New" }</h1>
        <div className="flex flex-col gap-4 my-3">
            <div className="">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={data.title} onChange={handleChange}/>
            </div>
            <div className="">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={data.category} onChange={handleChange}/>
            </div>
            <div className="">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" rows={5} name="content" value={data.content} onChange={handleChange}/>
            </div>

            <div className="flex gap-2 mt-3 mb-1 justify-end">
                <Button variant="outline" onClick={handlePublish}>Publish</Button>
                <Button variant="outline" onClick={handleDraft}>Draft</Button>
            </div>
        </div>
    </>
  )
}

export default FormAction