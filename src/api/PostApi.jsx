import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPost=()=>{

    return api.get("/posts");
}

export const deletePost=(id)=>{
    return api.delete(`/posts/${id}`)
}

//post

 export const postData=(post)=>{
    return api.post("/posts",post)
 }

 // put

 export const editData=(id,post)=>{
        return api.put(`/posts/${id}`,post)
 }

