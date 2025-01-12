// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getRawMaterialById, deleteRawMaterial } from "../api/services";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const RawMaterialDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [material, setMaterial] = useState(null);

//   useEffect(() => {
//     getRawMaterialById(id)
//       .then((res) => setMaterial(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleDelete = () => {
//     deleteRawMaterial(id)
//       .then(() => navigate("/raw-materials"))
//       .catch((err) => console.error(err));
//   };

//   if (!material) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <main className="p-8">
//         <h1 className="text-2xl font-bold">Raw Material Details</h1>
//         <div className="mt-4">
//           <p><strong>ID:</strong> {material.id}</p>
//           <p><strong>Category Name:</strong> {material.categoryName}</p>
//           <p><strong>Description:</strong> {material.description}</p>
//           <p><strong>Products:</strong></p>
//           <ul>
//             {material.rawMaterialProducts.map((product) => (
//               <li key={product.id}>
//                 {product.name} - {product.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="mt-4 flex space-x-2">
//           <button
//             onClick={() => navigate(`/raw-materials/${id}/edit`)}
//             className="px-4 py-2 bg-yellow-500 text-white rounded"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="px-4 py-2 bg-red-500 text-white rounded"
//           >
//             Delete
//           </button>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default RawMaterialDetail;
