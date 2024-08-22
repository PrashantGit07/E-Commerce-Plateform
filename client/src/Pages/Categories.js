// import React, { useEffect, useState } from 'react'

// const Categories = () => {
//     const [categories, setCategories] = useState([])
//     const getAllCategories = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/api/category/get-category");
//             if (response.status === 200) {
//                 setCategories(response.data.data);
//                 console.log("Categories fetched successfully");
//             }
//         } catch (e) {
//             console.error("Error fetching categories:", e);
//         }
//     };

//     useEffect(() => {
//         getAllCategories
//     }, [getAllCategories])
//     return (
//         <div>
//             Categories
//         </div>
//     )
// }

// export default Categories
