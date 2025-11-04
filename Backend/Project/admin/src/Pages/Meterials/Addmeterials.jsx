import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddMaterial() {
  const params = useParams();
  const [updatedId, setUpdatedId] = useState('');
  const [materialDetails, setMaterialDetails] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id != '') {
      setUpdatedId(params.id);

      axios.post(`${ import.meta.env.VITE_BASE_URL }/${ import.meta.env.VITE_MATERIAL_API }/details/${params.id}`)
        .then((result) => {
          if (result.data._status == true) {
            setMaterialDetails(result.data._data)
            setMaterial(result.data._data.code)
          } else {
            setMaterialDetails('');
          }
        })
        .catch(() => {
          toast.error('Something went wrong !!');
        })
    }
  }, [params]);

  const formHandler = (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,
      order: event.target.order.value,
    }

    if (!updatedId) {
      // Add Material
      axios.post(`${ import.meta.env.VITE_BASE_URL }/${ import.meta.env.VITE_MATERIAL_API }/create`, formData)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            event.target.reset();
            navigate('/material/view');
          } else {
            toast.error(result.data._message);
          }
        })
        .catch(() => {
          toast.error('Something went wrong !');
        })


    } else {
      // Update Material
      axios.put(`${ import.meta.env.VITE_BASE_URL }/${ import.meta.env.VITE_MATERIAL_API }/update/${updatedId}`, formData)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            event.target.reset();
            navigate('/material/view');
          } else {
            toast.error(result.data._message);
          }
        })
        .catch(() => {
          toast.error('Something went wrong !');
        })
    }

  }

  return (
    <div className="w-full">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
          {updatedId ? "Update Material" : "Add Materials"}
        </h3>

        <form autoComplete="off"
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
          onSubmit={formHandler}
        >
          {/* Material Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Material Name</label>
            <input
              type="text" name="name"
              defaultValue={materialDetails.name}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Material Name"
            />
          </div>

          {/* Material Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Order</label>
            <input
              type="number" name="order"
              defaultValue={materialDetails.order}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {updatedId ? "Update Material" : "Add Material"}
          </button>
        </form>
      </div>
    </div>
  );
}
