import Header from "../components/Header";

const NotFound = () => {
  return (
    <div>
      <Header />
      <main className="p-8 text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-gray-600">Page not found</p>
      </main>
    </div>
  );
};

export default NotFound;
