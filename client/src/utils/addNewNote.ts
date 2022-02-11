import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { redirectTo } from "./redirectTo";

export function  addNewNote (token: string, navigateFunc: NavigateFunction) {
  axios.post(
    '/api/notes', 
    {
      title: 'New Note', 
      text: 'Lorem Ipsum'
    }, 
    {
      headers: {
        'Content-Type': 'application/json', 
        'x-auth-token': 'Bearer ' + token
      }})
      .then(data => {
        const noteId = data.data
        const url = `/note/${noteId}`
        redirectTo(navigateFunc, url)
        
      })
      .catch((err) => {
        console.log(err)
      })
  
}