// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//     getProductComponentById,
//   deleteProductComponent,
// } from "../api/services";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const ProductComponentDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [component, setComponent] = useState(null);

//   useEffect(() => {
//     getProductComponentById(id)
//       .then((res) => setComponent(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleDelete = () => {
//     deleteProductComponent(id)
//       .then(() => navigate("/product-components"))
//       .catch((err) => console.error(err));
//   };

//   if (!component) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <main className="p-8">
//         <h1 className="text-2xl font-bold">Product Component Details</h1>
//         <div className="mt-4">
//           <p><strong>ID:</strong> {component.id}</p>
//           <p><strong>Name:</strong> {component.name}</p>
//           <p><strong>Description:</strong> {component.description}</p>
//           <p><strong>Raw Materials:</strong></p>
//           <ul>
//             {component.rawMaterials.map((material) => (
//               <li key={material.id}>
//                 {material.categoryName} - {material.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="mt-4 flex space-x-2">
//           <button
//             onClick={() => navigate(`/product-components/${id}/edit`)}
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

// export default ProductComponentDetail;
