"use client"

import { AppButton } from "@app/components/app-button";
import { studentService } from "@app/services/student.service";
import { Router, useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNewStudent() {
  const router = useRouter();
  const [student, setStudent] = useState({
    name: "",
    age : "",
    gender: "M",
  });

  const onSubmit = async (e) => {
    try {
    e.preventDefault();

    if (!student.name.trim()) {
      alert("Please enter name");
      return;
    }
    if (!student.age) {
      alert("Please enter age");
      return;
    }
    await  studentService.createStudent(student);
    alert("Save success");
    router.push("/students");
  }catch (e) {       
      alert("Save failed. Please try again");
      console.error(e);
    }
  }
  return (
    <div className="">
      <div className="text-2xl font-bold">Create new student</div>
      <form onSubmit={onSubmit}>
       <div>
        <label htmlFor="name" className=" inline-block w-20">
          Name
        </label>
        <input  
            className="border" 
            type="text" 
            name="name" 
            id="name" 
            value={student.name} 
            onChange={(e) => {
              setStudent({
                ...student,
                name: e.target.value,
              });
            }}
        />      
       </div>
       <div className="mt-2">
        <label htmlFor="Age" className=" inline-block w-20">
          Age
        </label>
        <input 
            className="border" 
            id="age" 
            name="gender"  
            type="number"
            value={student.age} 
            onChange={(e) => {
              setStudent({
                ...student,
                age: e.target.value,
              });
            }} 
        />
       </div>
       <div className="mt-2">
       <label className=" inline-block w-20">Gender</label>
        <label htmlFor="rdMale" className="mr-2">
          <input 
            id="rdMale" 
            name="gender" 
            type="radio" 
            className="mr-2" 
            value="M"
            // checked={filters.gender === "M"}
            onChange={(e) => {
              setFilters({
                ...filters,
                gender: e.target.value,
              });
            }}
            />
          Male
        </label>
        <label htmlFor="rdFemale">
          <input 
            id="rdFemale" 
            name="gender" 
            type="radio" 
            className="mr-2" 
            value="F"
            // checked={filters.gender === "F"}
            onChange={(e) => {
              setFilters({
                ...filters,
                gender: e.target.value,
              });
            }}
          />
          Female
        </label>
       </div>
        <AppButton type="submit" className="mt-2" color="blue">
           Save
        </AppButton>
      </form>
    </div>
  );        
}     
