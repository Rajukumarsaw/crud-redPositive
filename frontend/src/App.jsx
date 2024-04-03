//const BASE_URL = "http://localhost:8000";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Form from './components/form'

function App() {
  const [Data, setData] = useState('');

  const fetchData = async () => {
    const resp = await axios.get(import.meta.env.VITE_APP_SERVER_DOMAIN +'/data/getAllData');
    console.log(resp, 'resp');
    console.log(resp.data.newData,'newData')
    setData(resp.data.newData);
    console.log(Data, 'data');
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <>
     <div className=" bg-[#eef4f9] h-screen ">
     <Form Data={Data} />
     <Toaster/>
     </div>
    </>
  )
}

export default App
