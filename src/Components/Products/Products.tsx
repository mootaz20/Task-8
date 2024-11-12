import { IoSearchOutline } from "react-icons/io5";
import Product from "./Product/Product";
import PaginationCom from "../PaginationCom/PaginationCom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts, searchProducts, setPage } from "../../redux/Slice";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, itemsPerPage, currentPage } = useSelector((state) => state.products);
  const [paginationProducts, setpaginationProducts] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPage(1));
    dispatch(searchProducts(e.target.value));
  };


  useEffect(() => {
    console.log("hhhh");
    
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    if (Array.isArray(products)) {
      setpaginationProducts(products.slice(firstIndex, lastIndex));
    }
  }, [products, currentPage]);


  if (error) return <div className="w-full h-full flex justify-center items-center text-3xl font-semibold">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[61.55%] mb-12">
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleSearch}
          placeholder="Search product by name"
          style={{ color: "rgba(196, 196, 196, 1)" }}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm font-normal"
        />
        <IoSearchOutline
          size={"16px"}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
      <div className="w-[88.3%] flex flex-col">
        <button
          onClick={() => navigate("add")}
          className="self-end bg-customyellow rounded py-3.5 px-6 text-sm font-medium text-white mb-8">
          ADD NEW PRODUCT
        </button>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
          {loading ? (
              <Loader auth={false} />
          ) : paginationProducts.length === 0 ? (
              <h1 className="text-2xl font-semibold">No Products Found </h1>
          ) : (
            paginationProducts.map((el) => <Product key={el.id} product={el} />)
          )}
        </div>
      </div>
      <div>
        <PaginationCom />
      </div>
    </div>
  );
}

export default Products
