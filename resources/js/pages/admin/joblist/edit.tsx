import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { ArrowLeft, Save, X } from 'lucide-react';
import axios from 'axios';
import ReactQuill from 'react-quill-new';

interface Job {
  id: number;
  title: string;
  division: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  job_desc: string;
  requirements: string;
  [key: string]: any;
}

interface PageProps {
  jobs?: Job;
  auth: {
    user: {
      id: number;
      name: string;
    };
  };
  [key: string]: any;
}

const Edit: React.FC = () => {
  const { jobs } = usePage<PageProps>().props;

  const { data, setData, processing, errors } = useForm<Job>({
    id: jobs?.id || 0,
    title: jobs?.title || '',
    division: jobs?.division || '',
    location: jobs?.location || '',
    type: jobs?.type || '',
    salary: jobs?.salary || '',
    description: jobs?.description || '',
    job_desc: jobs?.job_desc || '',
    requirements: jobs?.requirements || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/jobs/${data.id}`, data);
      Swal.fire('Success', 'Job updated successfully.', 'success').then(() => {
        window.location.href = '/admin/jobs';
      });
    } catch (error: any) {
      const responseErrors = error.response?.data?.errors;
      const message = responseErrors
        ? Object.values(responseErrors).flat().join('\n')
        : 'Update failed';
      Swal.fire('Error', message, 'error');
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Any unsaved changes will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/admin/jobs';
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto py-6">
          <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Edit Job</h1>
                  <Link 
                    href="/admin/jobs" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ← Back to Jobs
                  </Link>
            </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter job title"
                required
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Division *</label>
              <input
                name="division"
                value={data.division}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter division"
                required
              />
              {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                name="location"
                value={data.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter location"
                required
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary *</label>
              <input
                name="salary"
                value={data.salary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter salary"
                required
              />
              {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <ReactQuill
                theme="snow"
                value={data.description}
                onChange={(content) => setData({ ...data, description: content })}
                className="bg-white rounded-lg"
                placeholder="Enter job description"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'clean']
                  ]
                }}
                style={{ height: '200px', marginBottom: '48px' }}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Details *</label>
              <ReactQuill
                theme="snow"
                value={data.job_desc}
                onChange={(content) => setData({ ...data, job_desc: content })}
                className="bg-white rounded-lg"
                placeholder="Enter job details"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'clean']
                  ]
                }}
                style={{ height: '200px', marginBottom: '48px' }}
              />
              {errors.job_desc && <p className="mt-1 text-sm text-red-600">{errors.job_desc}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
              <ReactQuill
                theme="snow"
                value={data.requirements}
                onChange={(content) => setData({ ...data, requirements: content })}
                className="bg-white rounded-lg"
                placeholder="Enter requirements"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'clean']
                  ]
                }}
                style={{ height: '200px', marginBottom: '48px' }}
              />
              {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={processing}
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={processing}
            >
              <Save size={18} />
              {processing ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
  );
};

export default Edit;