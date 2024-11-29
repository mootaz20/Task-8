import { useDispatch } from "react-redux";
import "./Product.css";
import { deleteProduct, deleteProductReducer } from "../../../redux/Slice";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import React, { MouseEvent, useState } from "react";
import { AppDispatch } from "../../../redux/Store";

interface ProductProps {
  id: number | string;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
interface Props {
  product: ProductProps;
}
const Product : React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showModal, setshowModal] = useState<boolean>(false);

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) : void => {
    event.stopPropagation();
    console.log(product.id);
    setshowModal(true);
  };

  const onConfirm = () : void => {
    setshowModal(false);
    dispatch(deleteProductReducer(product.id));
    dispatch(deleteProduct(product.id));
  };

  const onClose = () : void => {
    setshowModal(false);
  };

  const handleCardClick = () : void => {
    navigate(`product/${product.id}`);
  };

  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) : void => {
    event.stopPropagation();
    navigate(`product/edit/${product.id}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="w-[208px] h-[208px] rounded-2xl overflow-hidden relative card hover:cursor-pointer"
        style={{ boxShadow: "8px 8px 4px 0px rgba(0, 0, 0, 0.25)" }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt="error"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <img
            src="/assets/image/image 2.png"
            alt="error"
            className="w-full h-full object-cover rounded-2xl"
          />
        )}
        <div className="flex flex-col justify-center items-center text-center bg-hoverCardBackGround px-3 cardHover w-[208px] h-[208px] ">
          <h2 className="text-3xl font-medium mb-8 overflow-hidden whitespace-nowrap text-ellipsis w-full">
            {product.name}
          </h2>
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleEditClick}
              className="w-[81px] h-[34px] rounded text-white text-sm font-medium bg-customyellow">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-[81px] h-[34px] rounded text-white text-sm font-medium bg-[rgba(254,0,0,1)]">
              Delete
            </button>
          </div>
        </div>
      </div>
      {showModal && <DeleteModal onClose={onClose} onConfirm={onConfirm} />}
    </>
  );
};

export default Product;
