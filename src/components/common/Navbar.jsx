import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#000201] text-[#a2b2a7] p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold text-[#d3ba2c]">Budget Buddy</div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-[#178bab] transition-colors">Home</Link>
        </li>
        <li>
          <Link to="/budgets" className="hover:text-[#178bab] transition-colors">Budgets</Link>
        </li>
        <li>
          <Link to="/expenses" className="hover:text-[#178bab] transition-colors">Expenses</Link>
        </li>
        <li>
          <Link to="/goals" className="hover:text-[#178bab] transition-colors">Goals</Link>
        </li>
      </ul>
      <button className="bg-[#1c8c3d] text-white px-4 py-2 rounded-lg hover:bg-[#178bab] transition-colors">
        Sign In
      </button>
    </nav>
  );
};

export default Navbar;
