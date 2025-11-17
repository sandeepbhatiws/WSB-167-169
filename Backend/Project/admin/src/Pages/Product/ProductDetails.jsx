import React, { useEffect, useState } from 'react'
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductDetails() {

  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [parent_category_id, set_parent_category_id] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_PRODUCT_API}/view-materials`)
    .then((result) => {
      if(result.data._status == true){
        setMaterials(result.data._data);
      }
    })
    .catch(() => {
      toast.error('Something went wrong');
    })

    axios.post(`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_PRODUCT_API}/view-colors`)
    .then((result) => {
      if(result.data._status == true){
        setColors(result.data._data);
      }
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
  }, []);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_PRODUCT_API}/view-parent-category`)
    .then((result) => {
      if(result.data._status == true){
        setCategories(result.data._data);
      }
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
  }, []);

  const selectCategories = (event) => {
    set_parent_category_id(event.target.value);

    axios.post(`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_PRODUCT_API}/view-sub-category`, {
      parent_category : event.target.value
    })
    .then((result) => {
      if(result.data._status == true){
        setSubCategories(result.data._data);
      } else {
        setSubCategories([]);
      }
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
  }

  const selectSubCategories = (event) => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_PRODUCT_API}/view-sub-sub-category`,{
      parent_category : parent_category_id,
      sub_category : event.target.value
    })
    .then((result) => {
      if(result.data._status == true){
        setSubSubCategories(result.data._data);
      } else {
        setSubSubCategories([]);
      }
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    data.description = value;

    // Add Product
      axios.post(`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_PRODUCT_API}/create`, data)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            // event.target.reset();
            navigate('/product/view');
          } else {
            toast.error(result.data._message);
          }
        })
        .catch(() => {
          toast.error('Something went wrong !');
        })
    // alert("Product Created Successfully!");
  };





  useEffect(() => {
    $(".dropify").dropify({
      messages: {
        default: "Drag and drop ",
        replace: "Drag and drop ",
        remove: "Remove",
        error: "Oops, something went wrong"
      }
    });
  }, []);

  
  // update work
  const [updateIdState, setUpdateIdState] = useState(false)
  let updateId = useParams().id
  useEffect(() => {
    if (updateId == undefined) {
      setUpdateIdState(false)
    }
    else {
      setUpdateIdState(true)
    }
  }, [updateId])


  return (
    <section className="w-full">

      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={"/product/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateIdState ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className='w-full px-6 py-6  '>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <div className="grid grid-cols-3 gap-[10px] ">
            {/* for left */}
            <div className="for-images">

              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  name='image'
                  id="image"
                  className="dropify"
                  data-height="160"
                  {...register("image", { required: "Product Image is required" })}
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              </div>

              <div className="">
                <label
                  htmlFor="backImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Back Image
                </label>
                <input
                  type="file"
                  id="backImage"
                  className="dropify"
                  data-height="160"
                />
              </div>

              <div className="">
                <label
                  htmlFor="GalleryImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Gallery Image
                </label>
                <input
                  type="file"
                  id="images"
                  name='images'
                  className="dropify"
                  data-height="160"
                  {...register("images", { required: "Gallery Image is required" })}
                />
                {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
              </div>
            </div>

            {/* for midd */}
            <div className="middle">

              <div className="mb-5">
                <label
                  htmlFor="Prodct_Name"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name='name'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Product Name'
                  {...register("name", { required: "Product Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="materialname"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Meterial
                </label>
                <select
                  {...register("material_ids", { required: "Meterial is required" })}
                  name='material_ids'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  {
                    materials.map((v,i) => {
                      return(
                        <option key={i} value={v._id}>{v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.material_ids && <p className="text-red-500 text-sm">{errors.material_ids.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Parent Category
                </label>
                <select
                  {...register("parent_category", { required: "Parent Category is required" })}
                  name='parent_category'
                  onChange={ selectCategories }
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>

                  {
                    categories.map((v,i) => {
                      return(
                        <option key={i} value={v._id}>{v.name}</option>
                      )
                    })
                  }

                </select>
                {errors.parent_category && <p className="text-red-500 text-sm">{errors.parent_category.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Sub Category
                </label>
                <select
                  {...register("sub_sub_category_ids", { required: "Sub Sub Category is required" })}
                  name='sub_sub_category_ids'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>

                  {
                    subSubCategories.map((v,i) => {
                      return(
                        <option key={i} value={v._id}>{v.name}</option>
                      )
                    })
                  }

                </select>
                {errors.sub_sub_category_ids && <p className="text-red-500 text-sm">{errors.sub_sub_category_ids.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="is_featured"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Featured
                </label>
                <select
                  {...register("is_featured", { required: "Is Featured is required" })}
                  name='is_featured'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>

                </select>
                {errors.is_featured && <p className="text-red-500 text-sm">{errors.is_featured.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="is_onsale"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is OnSale
                </label>
                <select
                  {...register("is_onsale", { required: "Is Onsale is required" })}
                  name='is_onsale'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>

                </select>
                {errors.is_onsale && <p className="text-red-500 text-sm">{errors.is_onsale.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="is_top_rated"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Top Rated
                </label>
                <select
                  {...register("is_top_rated", { required: "Is Top Rated is required" })}
                  name='is_top_rated'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>

                </select>
                {errors.is_top_rated && <p className="text-red-500 text-sm">{errors.is_top_rated.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="actual_price"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Actual Price
                </label>
                <input
                  type="text"
                  name='actual_price'
                  {...register("actual_price", { required: " Actual Price is required" })}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Actual Price'
                />
                {errors.actual_price && <p className="text-red-500 text-sm">{errors.actual_price.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="estimate_delivery_days"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Estimate Delivery Days
                </label>
                <input
                  type="text"
                  name='estimate_delivery_days'
                  {...register("estimate_delivery_days", { required: " Estimate Delivery Days is required" })}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Estimate Delivery Days'
                />
                {errors.estimate_delivery_days && <p className="text-red-500 text-sm">{errors.estimate_delivery_days.message}</p>}
              </div>
            </div>

            {/* for right */}
            <div className="right-items">

              <div className="mb-5">
                <label
                  htmlFor="code"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Code
                </label>
                <input
                  type="text"
                  name='code'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Product Code'
                  {...register("code", { required: "Product Code is required" })}
                />
                {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Color
                </label>
                <select
                  {...register("color_ids", { required: "Color is required" })}
                  name='color_ids'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>

                  {
                    colors.map((v,i) => {
                      return(
                        <option key={i} value={v._id}>{v.name}</option>
                      )
                    })
                  }

                </select>
                {errors.color_ids && <p className="text-red-500 text-sm">{errors.color_ids.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Category
                </label>
                <select
                  {...register("sub_category", { required: "Sub Category is required" })}
                  name='sub_category'
                  onChange={ selectSubCategories }
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Sub Category</option>
                  {
                    subCategories.map((v,i) => {
                      return(
                        <option key={i} value={v._id}>{v.name}</option>
                      )
                    })
                  }

                </select>
                {errors.sub_category && <p className="text-red-500 text-sm">{errors.sub_category.message}</p>}

              </div>
          
              <div className="mb-5">
                <label
                  htmlFor="is_best_selling"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Best Selling
                </label>
                <select
                  {...register("is_best_selling", { required: " Best Selling is required" })}
                  name='is_best_selling'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>

                </select>
                {errors.is_best_selling && <p className="text-red-500 text-sm">{errors.is_best_selling.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="is_new_arrival"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is New Arrival
                </label>
                <select
                  {...register("is_new_arrival", { required: "Is New Arrival is required" })}
                  name='is_new_arrival'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>

                </select>
                {errors.is_new_arrival && <p className="text-red-500 text-sm">{errors.is_new_arrival.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="is_upsell"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Upsell
                </label>
                <select
                  {...register("is_upsell", { required: "Is Upsell is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>

                </select>
                {errors.is_upsell && <p className="text-red-500 text-sm">{errors.is_upsell.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Total In Stocks
                </label>
                <input
                  type="text"
                  {...register("quantity", { required: "Stocks is required" })}
                  name='quantity'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Total In Stocks'
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="sale_price"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Sale Price
                </label>
                <input
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Sale Price'
                  name='sale_price'
                  {...register("sale_price", { required: "Sale Price is required" })}
                />
                {errors.sale_price && <p className="text-red-500 text-sm">{errors.sale_price.message}</p>}
              </div>
              
              <div className="mb-5">
                <label
                  htmlFor="dimension"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Dimension
                </label>
                <input
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Dimension'
                  name='dimension'
                  {...register("dimension", { required: "Dimension is required" })}
                />
                {errors.dimension && <p className="text-red-500 text-sm">{errors.dimension.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="order"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Order
                </label>
                <input
                  type="text"
                  name='order'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Order'
                  {...register("order", { required: " Order is required" })}
                />
                {errors.order && <p className="text-red-500 text-sm">{errors.order.message}</p>}
              </div>
            </div>
          </div>

          <div className='py-[40px]'>
            <label
              htmlFor="short_description"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Short Description
            </label>
            <textarea name='short_description' className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 h-[200px]' {...register("short_description", { required: "Short Description is required" })}></textarea>
          </div>
          {errors.short_description && (
            <p className="text-red-500 text-sm">{errors.short_description.message}</p>
          )}

          <div className='py-[40px]'>
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Description
            </label>
            <ReactQuill theme="snow" value={value} onChange={setValue} className='h-[200px]'  />

          </div>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
             {updateIdState ? "Update Product " : "Add Product"}
             </button>

        </form>

      </div>
    </section>
  )
}

