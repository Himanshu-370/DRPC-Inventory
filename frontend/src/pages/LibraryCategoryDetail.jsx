// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getLibraryCategoriesById, deleteLibraryCategory } from "../api/services";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const LibraryCategoryDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [category, setCategory] = useState(null);

//   useEffect(() => {
//     getLibraryCategoriesById(id)
//       .then((res) => setCategory(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleDelete = () => {
//     deleteLibraryCategory(id)
//       .then(() => navigate("/library-categories"))
//       .catch((err) => console.error(err));
//   };

//   if (!category) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <main className="p-8">
//         <h1 className="text-2xl font-bold">Library Category Details</h1>
//         <div className="mt-4">
//           <p><strong>ID:</strong> {category.id}</p>
//           <p><strong>Name:</strong> {category.name}</p>
//           <p><strong>Description:</strong> {category.description}</p>
//           <p><strong>Library Products:</strong></p>
//           <ul>
//             {category.libraryProducts.map((product) => (
//               <li key={product.id}>
//                 {product.name} - {product.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="mt-4 flex space-x-2">
//           <button
//             onClick={() => navigate(`/library-categories/${id}/edit`)}
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

// export default LibraryCategoryDetail;
