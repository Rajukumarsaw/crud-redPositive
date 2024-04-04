import { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';

const App = ({ Data }) => {

  const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', hobbies: '' });
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState(null);


  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [updateRow, setUpdateRow] = useState(false);

  const emptyArray = Array(4).fill("");
  useEffect(() => {
    if (Data && Data.length > 0) {
      setData(Data);
    }
  }, [Data]);
  console.log('form data', data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async () => {
    try {

      const res = await axios.post(import.meta.env.VITE_APP_SERVER_DOMAIN +'/data/createData', formData);

      if (res.data.success) {
        toast.success("New entry added");
        setShowForm(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const editData = async () => {
    try {

      const res = await axios.put( import.meta.env.VITE_APP_SERVER_DOMAIN +`/data/editData/${rowId}`, formData);

      if (res.data.success) {
        toast.success("Entry Updated");
        setFormData({ name: '', phoneNumber: '', email: '', hobbies: '' });
        setUpdateRow(false);
        setRowId(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSave = () => {

    submitData();
    setFormData({ name: '', phoneNumber: '', email: '', hobbies: '' });
  };


  const handleDelete = async (id) => {
    try {
      const del = await axios.delete(import.meta.env.VITE_APP_SERVER_DOMAIN + `/data/deleteData/${id}`);
      if (del.data.success) {
        toast.success("Entry deleted");
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (id) => {
    const row = data.find(row => row._id === id);
    setUpdateRow(true);
    setFormData(row);
    setRowId(id);
  };

  const handleCheckboxChange = (id) => {
    const selectedRow = data.find(row => row._id === id);
    if (selectedRows.some(row => row._id === id)) {
      setSelectedRows(selectedRows.filter(row => row._id !== id));
    } else {
      setSelectedRows([...selectedRows, selectedRow]);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows([...data]);
    } else {
      setSelectedRows([]);
    }
  };
  const handleSendEmail = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_APP_SERVER_DOMAIN + '/send-email', selectedRows);
      if (res.data.success) {
        toast.success("Email sent successfully");
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send email");
    }
  };
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility
  };
  return (
    <div className="container mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4 font-mono text-[#10444f]">Table: All Entry</h1>
      <table className="w-full mb-8 rounded-lg">
        <thead className=' bg-[#22b3d0] text-[#eff4f5] text-xl'>
          <tr>
            <th className="px-4 py-2 text-left">
              <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
            </th>
            <th className="px-4 py-2 text-left ">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Hobbies</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        
        <tbody className=' bg-[#c9deed] text-[#1b363b]'>
          { Data? data && data.map((row) => (
            <tr key={row._id}>
              <td className="px-4 py-2">
                <input type="checkbox" onChange={() => handleCheckboxChange(row._id)} checked={selectedRows.some(selectedRow => selectedRow._id === row._id)} />
              </td>
              <td className="px-4 py-2" >{row._id}</td>
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.phoneNumber}</td>
              <td className="px-4 py-2">{row.email}</td>
              <td className="px-4 py-2">{row.hobbies}</td>
              <td className="px-4 py-2 flex">
                <button className="mr-2" onClick={() => handleEdit(row._id)}>
                  <AiOutlineEdit className='text-blue-500 hover:text-blue-700' size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(row._id)}>
                  <AiOutlineDelete size={20} />
                </button>
              </td>
            </tr>
          )):(emptyArray.map((item)=>(
            <tr key={1} className=' h-2 animate-pulse'>
              <td className="px-4 py-2">{item}</td>
              <td className="px-4 py-2">loading...</td>
              <td className="px-4 py-2">loading...</td>
              <td className="px-4 py-2">loading...</td>
              <td className="px-4 py-2">loading...</td>
              <td className="px-4 py-2">loading...</td>
              <td className="px-4 py-2">loading...</td>
            </tr>
          ))) }  
        </tbody>
      </table>
     

      <div className="mb-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={handleSendEmail}>
          Send
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={toggleForm}>
          Add New Data
        </button>
      </div>
      {(showForm || updateRow) &&
        <div className="bg-[#c9deed] p-4">
          <h2 className="text-lg font-bold mb-2">{(updateRow) ? ("Update Entry") : ("Add New Entry")}</h2>
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="border rounded px-4 py-2 mb-2 mr-2"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border rounded px-4 py-2 mb-2 mr-2"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border rounded px-4 py-2 mb-2 mr-2"
            />
            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleInputChange}
              placeholder="Hobbies"
              className="border rounded px-4 py-2 mb-2 mr-2"
            />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" onClick={(updateRow && !showForm) ? editData : handleSave}>
              Save
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default App;
