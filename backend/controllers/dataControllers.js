const Data=require('../model/dataModel');

const getData=async(req, res)=>{
    try{
      const newData= await Data.find({});
      res.status(200).json({
        newData,
      });
    }
    catch(err){
      console.log(err);
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
};
const createData=async(req,res)=>{
    try{
     const {email}=req.body;
    const userExists = await Data.findOne({email});
    if (userExists) {
        throw new Error("Email already exists");
      }

     const user= await Data.create(req.body);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
      });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message,
          });
    }
};
const editData = async (req, res) => {
    try {
       await Data.findByIdAndUpdate(req.params.id, req.body);
  
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const deleteData = async (req, res) => {
    try {
      const DataId = req.params.id;
  
      const data = await Data.findByIdAndDelete(DataId);
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  module.exports={getData, createData, editData, deleteData};
