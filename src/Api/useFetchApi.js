import axios from "axios"
import { useEffect, useState } from "react";
 export const useFetchApi = async(url)=>{
   let response = await fetch(url)
   return await response.json();
 }
  