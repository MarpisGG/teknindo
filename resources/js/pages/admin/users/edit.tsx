import React, { useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  roles: string[]; // Assuming roles are stored as an array of strings
  [key: string]: any;
}

interface PageProps {
  user?: User;
  roles?: { id: number; name: string }[];
    userRoles?: string[]; // Assuming user roles are stored as an array of strings
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: any;
}

const Edit: React.FC = () => {
  const { user, flash, roles = [], userRoles = [] } = usePage<PageProps>().props;
  const { data, setData, put, processing, errors } = useForm<User>({
    id: user?.id || 0,
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
    roles: user?.roles || [],
  });

  useEffect(() => {
    if (flash?.success) alert(flash.success);
    if (flash?.error) alert(flash.error);
  }, [flash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/users/${data.id}`, {
      onSuccess: () => {
        setData({
          id: 0,
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          roles: [],
        });
      },
      onError: (errors) => {
        console.error('Error updating user:', errors);
      },
    });
  };

  const handleCancel = () => {
    router.get('/admin/users');
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 sm:p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
         <button
            onClick={handleCancel}
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Users
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={data.roles[0] || ''}
            onChange={(e) => setData('roles', [e.target.value])}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Role</option>
            {roles.map(role => (
                <option key={role.id} value={role.name}>
                    {role.name}
                </option>
                ))}
          </select>
          {errors.roles && <div className="text-red-500 text-sm">{errors.roles}</div>}
        </div>

        <div className="flex justify-start gap-2 pt-4">
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
            className={`px-4 py-2 ${processing ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}
          >
            {processing ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
