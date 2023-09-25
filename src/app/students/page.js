"use client";

import { AppButton } from "@app/components/app-button"
import { studentService } from "@app/services/student.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
  });
  const [searchTermDebounced] = useDebounce(filters.searchTerm, 300);

  const router = useRouter();
  const createNew = () => {
    router.push("/students/create");
  };

const getGender = (value) => {
    if (value === "M") {
      return "Male";
    }
    if (value === "F") {
      return "Female";
    }
    return ""
  };

  const searchStudents = async () => {
    const result = await studentService.findStudents(filters);
    setStudents(result);
  };
  // useEffect(() => {
  //   console.log("Students page is mounted");
    
  //   const loadStudents = async () => {
  //     const result = await studentService.findStudents(filters);
  //     setStudents(result);
  //   };
    
  // loadStudents();
  // return () => {
  //   console.log("Students page is unmounted");
  // };
  // }, []);
  useEffect(() => {
    console.log("Students page is mounted");
    
    searchStudents();

    return () => {
      console.log("Students page is unmounted");
    };
  }, [filters.gender, searchTermDebounced]);
  return ( 
    <>
      <div className="">
        <div className="text-2xl font-bold">Students</div>
        <AppButton className="mr-2" color="blue" onClick={createNew}>
          Create new
        </AppButton>
        <div>
          <div>
            <div className="text-lg">Searh students</div>
          </div>
          <div>
            <input
             name="searhTerm" 
             className="border" 
             value={filters.searchTerm} 
             onChange={(e) => {
               setFilters({
                ...filters,
                searchTerm: e.target.value,
               });
              }}
            />
          </div>
          <div>

            <div className="mt-2">
       <label className=" inline-block w-20">Gender</label>
       <label htmlFor="rdMale" className="mr-2">
          <input 
            id="reAll" 
            name="gender" 
            type="radio" 
            className="mr-2" 
            value="M"
            checked={filters.gender === "M"}
            onChange={(e) => {
              setFilters({
                ...filters,
                gender: e.target.value,
              });
            }}
            />
          All
        </label>
        <label htmlFor="rdMale" className="mr-2">
          <input 
            id="rdMale" 
            name="gender" 
            type="radio" 
            className="mr-2" 
            value="M"
            checked={filters.gender === "M"}
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
            checked={filters.gender === "F"}
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
      </div>
      <div>
      </div>
        </div>
        <div>
          {students.map((student) => (
            <div key={student.id} className="border rounded-sm p-2 mt-2">
              <div> Name: {student.name}</div>
              <div> Age: {student.age}</div>
              <div> Gender: {getGender(student.gender)}</div>

            </div>
          ))}
          
        </div>
      </div>
      <div></div>
     </>
  );
}
