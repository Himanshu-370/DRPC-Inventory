const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>
        © {new Date().getFullYear()} Inventory Management. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
