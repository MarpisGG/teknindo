import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

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

interface PageProps {
    id: number;
}

const Edit: React.FC<PageProps> = ({ id }) => {
    const [data, setData] = useState<FormRole>({
        id: id,
        name: '',
        permissions: [],
    });
    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Set up axios defaults for CSRF token
    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        }
    }, []);

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/roles/${id}/edit`);

                const role = response.data.role;
                const perms = response.data.permissions.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    checked: p.checked || false,
                }));

                setData({
                    id: role.id,
                    name: role.name,
                    permissions: perms,
                });
            } catch (error) {
                console.error('Error fetching role data:', error);
                Swal.fire('Error', 'Failed to load role data.', 'error');
                // Optionally redirect back to roles index
                // router.get('/roles');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRoleData();
        }
    }, [id]);

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const updatedPermissions = data.permissions.map((perm, i) => (i === index ? { ...perm, checked } : perm));
        setData((prev) => ({ ...prev, permissions: updatedPermissions }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        // Filter only checked permissions and format for backend
        const selectedPermissions = data.permissions.filter((p) => p.checked).map((p) => ({ name: p.name }));

        const payload = {
            name: data.name,
            permissions: selectedPermissions,
        };

        try {
            const response = await axios.put(`/roles/${data.id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (response.data.success) {
                await Swal.fire('Updated', 'Role updated successfully', 'success');
                router.get('/admin/roles'); // Redirect to roles index
            }
        } catch (error: any) {
            console.error('Update error:', error);

            if (error.response) {
                // Server responded with error status
                if (error.response.status === 422) {
                    // Validation errors
                    setErrors(error.response.data.errors || {});
                    Swal.fire('Validation Error', 'Please check the form for errors.', 'error');
                } else if (error.response.status === 404) {
                    Swal.fire('Error', 'Role not found.', 'error');
                } else {
                    Swal.fire('Error', error.response.data.message || 'There was an error updating the role.', 'error');
                }
            } else if (error.request) {
                // Request was made but no response received
                Swal.fire('Error', 'No response from server. Please check your connection.', 'error');
            } else {
                // Something else happened
                Swal.fire('Error', 'An unexpected error occurred.', 'error');
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleCancel = () => {
        router.get('/admin/roles');
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl py-6">
                <div className="flex h-64 items-center justify-center">
                    <div className="text-lg">Loading role data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl py-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Role</h1>
                <Link href="/admin/roles" className="text-blue-600 hover:text-blue-800">
                    ← Back to Roles
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-md">
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
                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.name && (
                        <span className="mt-1 block text-sm text-red-600">{Array.isArray(errors.name) ? errors.name[0] : errors.name}</span>
                    )}
                </div>

                {/* Permissions */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Permissions</label>
                    <div
                        className={`grid max-h-64 grid-cols-2 gap-2 overflow-y-auto rounded border p-3 ${
                            errors.permissions ? 'border-red-300' : 'border-gray-300'
                        }`}
                    >
                        {data.permissions.length > 0 ? (
                            data.permissions.map((permission, index) => (
                                <div key={permission.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`permission-${permission.id}`}
                                        checked={permission.checked}
                                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor={`permission-${permission.id}`} className="cursor-pointer text-sm text-gray-700">
                                        {permission.name}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 py-4 text-center text-gray-500">No permissions available</div>
                        )}
                    </div>
                    {errors.permissions && (
                        <span className="mt-1 block text-sm text-red-600">
                            {Array.isArray(errors.permissions) ? errors.permissions[0] : errors.permissions}
                        </span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={processing}
                        className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
