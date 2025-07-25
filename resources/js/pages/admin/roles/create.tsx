import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import axios from "axios";

interface Permission {
  id: number;
  name: string;
  checked: boolean;
}

interface FormRole {
  id: number;
  name: string;
  permissions: Permission[];
  [key: string]: any;
}

const Create: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [data, setData] = useState<FormRole>({
    id: 0,
    name: '',
    permissions: [],
  });
  const [errors, setErrors] = useState<any>({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axios.get("/api/permissions").then((res) => {
      const perms = res.data.map((p: any) => ({
        id: p.id,
        name: p.name,
        checked: false
      }));
      setPermissions(perms);
      setData((prev) => ({ ...prev, permissions: perms }));
    });
  }, []);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedPermissions = data.permissions.map((perm, i) =>
      i === index ? { ...perm, checked } : perm
    );
    setData((prev) => ({ ...prev, permissions: updatedPermissions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const payload = {
      name: data.name,
      permissions: data.permissions.filter(p => p.checked).map(p => p.name),
    };

    axios.post("/roles", payload)
      .then(() => {
        Swal.fire("Success", "Role created successfully.", "success");
        setData({
          id: 0,
          name: '',
          permissions: permissions.map(p => ({ ...p, checked: false })),
        });
        router.get('/admin/roles');
        setErrors({});
      })
      .catch((error) => {
        setErrors(error.response?.data?.errors || {});
        Swal.fire("Error", "There was an error creating the role.", "error");
      })
      .finally(() => setProcessing(false));
  };

  const handleCancel = () => {
    router.get('/admin/roles');
  };

  return (
  <>
  
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Role</h1>
          <Link href="/admin/roles" className="text-blue-600 hover:underline">← Back to Roles</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border rounded p-3">
              {data.permissions.map((permission, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`perm-${index}`}
                    checked={permission.checked}
                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`perm-${index}`} className="text-sm text-gray-700">
                    {permission.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.permissions && <p className="text-sm text-red-600 mt-1">{errors.permissions}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className={`px-4 py-2 rounded-md text-white ${processing ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {processing ? "Creating..." : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default Create;
