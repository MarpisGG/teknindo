import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import axios from "axios";

interface Category {
    id: number;
    name: string;
    slug?: string;
    description?: string;
}

interface PageProps {
  category: Category;
  auth: {
    user: {
      id: number;
      name: string;
    };
  };
  [key: string]: any;
}

const Edit: React.FC = () => {
  const { auth, category: initialCategory } = usePage<PageProps>().props;

  const [data, setData] = useState<Category>(initialCategory);
  const [errors, setErrors] = useState<any>({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    router.get("/admin/categories");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    axios
      .put(`/categories/${data.id}`, {
        name: data.name,
        description: data.description,
      })
      .then(() => {
        Swal.fire("Success", "Category updated successfully.", "success");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else {
          Swal.fire("Error", "An error occurred while updating the category.", "error");
        }
      })
      .finally(() => {
        setProcessing(false);
        router.get("/admin/categories");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Category</h1>
          <button
            onClick={handleCancel}
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Categories
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.name && (
              <div className="text-red-600 text-sm mt-1">{errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.description && (
              <div className="text-red-600 text-sm mt-1">{errors.description}</div>
            )}
          </div>

          <div className="flex justify-start space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className={`px-4 py-2 ${
                processing ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-md`}
            >
              {processing ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
