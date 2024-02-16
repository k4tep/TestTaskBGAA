import { IData } from "../interfaces/data";

export async function getInfo() {
  const headers = new Headers();
  headers.append('Accept', 'application/json');

  const response = await fetch(`https://bgaa.by/test`, {
    method: 'GET',
    headers,
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw "error"
 }
}

export async function postInfo(data:IData[]) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  const response = await fetch(`https://bgaa.by/test_result`, {
    method: 'POST',
    body: JSON.stringify(data),
    // mode: 'cors',
    headers,
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw "error"
 }
}