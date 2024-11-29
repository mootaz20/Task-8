import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface Product {
  id: number; 
  name: string; 
  price: string; 
  image_url: string; 
  created_at: string; 
  updated_at: string;
}

interface ProductsState {
  products: Product[];
  AllProducts: Product[];
  product: Product;
  loading: boolean;
  error: string | undefined | unknown;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: ProductsState = {
  products: [],
  AllProducts: [],
  product: {
    id: 0, 
    name: "",
    price: "",
    image_url: "",
    created_at: "",
    updated_at: "",
  },
  loading: false,
  error: null,
  totalPages: 0,
  itemsPerPage: 8,
  currentPage: 1,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201 || response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id : string | number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://test1.focal-x.com/api/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("item was deleted successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id : string | undefined, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://test1.focal-x.com/api/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
interface UpdateProductParams {
  data: FormData; 
  id: string | undefined; 
}
export const updateProduct = createAsyncThunk<
  void, 
  UpdateProductParams, 
  { rejectValue: string } 
>("products/updateProduct", async ({ data, id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://test1.focal-x.com/api/items/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      console.log("Updated successfully");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "An error occurred");
      return rejectWithValue(error.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://test1.focal-x.com/api/items",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        console.log("Added successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProducts : (state,action) => {
      state.products = state.AllProducts.filter((el) =>
      el.name.toLowerCase().includes(action.payload.toLowerCase())
    );
      state.totalPages = Math.ceil(state.products.length / state.itemsPerPage);
    },
    setPage : (state,action) => {
      state.currentPage = action.payload;
    },
    prevPage : (state) => {
      if (state.currentPage > 1) {
        state.currentPage = state.currentPage - 1;
      }
    },
    nextPage : (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage = state.currentPage + 1;
      }
    },
    deleteProductReducer : (state,action) => {
      state.products = state.products.filter((el) => el.id !== action.payload );
      state.totalPages = Math.ceil(state.products.length / state.itemsPerPage);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.AllProducts = action.payload;
        state.totalPages = Math.ceil(state.products.length / state.itemsPerPage);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { searchProducts , setPage , prevPage , nextPage , deleteProductReducer } = ProductsSlice.actions;

export default ProductsSlice.reducer;
