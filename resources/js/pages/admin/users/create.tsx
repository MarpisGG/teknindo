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
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: any;
}

const Create: React.FC = () => {
    const { roles = [] } = usePage<PageProps>().props;
  const { user, flash } = usePage<PageProps>().props;
  const { data, setData, post, processing, errors } = useForm<User>({
    id: user?.id || 0,
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
    roles: [],
  });

  useEffect(() => {
    if (flash?.success) {
      alert(flash.success);
    }
    if (flash?.error) {
      alert(flash.error);
    }
  }, [flash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/users', {
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
        console.error('Error creating user:', errors);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.name as keyof User, e.target.value);
  };

  const handleCancel = () => {
    router.get('/admin/users');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create User</h1>
          <button
            onClick={handleCancel}
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Users
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
            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block font-medium mb-1 text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <select
            name="role"
            value={data.role}
            onChange={(e) => setData("roles", [e.target.value])}
            className="border p-2 rounded w-full"
            >
            <option value="">Select Role</option>
            {roles.map((role: any) => (
                <option key={role.id} value={role.name}>
                {role.name}
                </option>
            ))}
            </select>
          <div className="flex justify-start space-x-3 pt-4">
            <button
              type="submit"
              disabled={processing}
              className={`px-4 py-2 ${processing ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}
            >
              {processing ? 'Creating...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
