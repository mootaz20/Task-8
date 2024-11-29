import { GrFormPrevious } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../redux/Slice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../redux/Store";

const EditCom: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const file = useRef<HTMLInputElement | null>(null);
  const { product, loading } = useSelector(
    (state: RootState) => state.products
  );
  const navigate = useNavigate();
  const [name, setname] = useState<string | null>("");
  const [price, setprice] = useState<string | null>("");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [image, setimage] = useState<File | string>("");
  const [loadingAfterSave, setloadingAfterSave] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProduct(id));
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setname(product.name || null);
      setprice(product.price || null);
      setPreviewImage(product.image_url || "/assets/image/image 2.png");
    }
  }, [product]);

  const handleBackClick = (): void => {
    navigate("/dashboard");
  };

  const handleButtonImage = (): void => {
    if (file.current) {
      file.current.click();
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setimage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleEditClick = () => {
    setloadingAfterSave(true);
    const data = new FormData();
    if(name){
      data.append("name", name);
    }
    if(price){
      data.append("price", price);
    }
    data.append("_method", "PUT");
    if (image) {
      data.append("image", image);
    }
    dispatch(updateProduct({ data, id })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Product updated successfully");
        setloadingAfterSave(false);
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="show lg:px-16 px-6 pt-6 pb-12">
      <div className="" style={{ marginBottom: "76px" }}>
        <button
          onClick={handleBackClick}
          className="w-[40px] h-[40px] rounded-full border border-1 border-black ">
          <GrFormPrevious className="mx-auto" />
        </button>
      </div>
      <div>
        <h1
          className="lg:text-6xl md:text-3xl font-semibold"
          style={{ marginBottom: "76px" }}>
          EDIT ITEM
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader auth={false} />
          </div>
        ) : loadingAfterSave ? (
          <div className="flex justify-center items-center h-full">
            <Loader auth={false} />
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-x-8">
              <div className="flex flex-col lg:w-[41.3%] w-full ">
                <div className="flex flex-col mb-16 ">
                  <label
                    className="font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary"
                    style={{ marginBottom: "16px" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    className="py-3 px-4 font-medium rounded border border-1 border-editBorderColor"
                    value={name ? name : "name"}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary"
                    style={{ marginBottom: "16px" }}>
                    Price
                  </label>
                  <input
                    type="number"
                    className="py-3 px-4 font-medium rounded border border-1 border-editBorderColor"
                    value={price ? price : "0" }
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:w-[55.3%] w-full">
                <label
                  className="font-medium lg:text-[32px] md:text-[25px] text-[18px] lg:mt-0 mt-5 text-secondary"
                  style={{ marginBottom: "14px" }}>
                  Image
                </label>
                {
                  <button
                    type="button"
                    className="inline-flex h-[209px] bg-photoBackGround items-center justify-center rounded-md "
                    style={{
                      border: "2px dashed rgba(56, 78, 183, 0.3)",
                    }}
                    onClick={handleButtonImage}>
                    <img
                      src={previewImage}
                      alt="error"
                      width={"208px"}
                      className="mx-auto h-full object-cover"
                    />
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="sr-only"
                      ref={file}
                    />
                  </button>
                }
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center" style={{ marginTop: "120px" }}>
          <button
            onClick={handleEditClick}
            className="rounded font-medium text-white w-[199px] h-[61px] "
            style={{ backgroundColor: "#FEAF00", fontSize: "32px" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCom