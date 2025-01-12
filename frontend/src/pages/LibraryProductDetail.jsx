// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { deleteLibraryProduct, getLibraryProductById } from "../api/services";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const LibraryProductDetail = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Correctly read the dynamic :id parameter
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     getLibraryProductById(id) // Fetch data for the specific product
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleDelete = () => {
//       deleteLibraryProduct(id)
//         .then(() => navigate("/product-components"))
//         .catch((err) => console.error(err));
//     };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <main className="p-8">
//         <h1 className="text-2xl font-bold">Library Product Details</h1>
//         <div className="mt-4">
//           <p><strong>ID:</strong> {product.id}</p>
//           <p><strong>Name:</strong> {product.name}</p>
//           <p><strong>Description:</strong> {product.description}</p>
//           <p><strong>Product Components:</strong></p>
//           <ul>
//             {product.productComponents.map((component) => (
//               <li key={component.id}>
//                 {component.name} - {component.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="mt-4 flex space-x-2">
//           <button
//             onClick={() => navigate(`/library-products/${id}/edit`)}
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

// export default LibraryProductDetail;
