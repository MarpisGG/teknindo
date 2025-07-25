<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    use ValidatesRequests;

    public function __construct()
    {
        $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:role-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:role-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }

    public function index()
    {
        return Inertia::render('admin/roles/index');
    }

    public function create()
    {
        return Inertia::render('admin/roles/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            'permissions' => 'required|array',
            'permissions.*' => 'required|string|exists:permissions,name',
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    public function show($id)
    {
        return Inertia::render('admin/roles/show', [
            'roleId' => $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('admin/roles/edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $this->validate($request, [
                'name' => 'required|unique:roles,name,' . $id,
                'permissions' => 'required|array',
                'permissions.*.name' => 'required|string|exists:permissions,name',
            ]);

            $selectedPermissions = collect($request->input('permissions'))
                ->pluck('name')
                ->toArray();

            $role = Role::findOrFail($id);
            $role->name = $request->input('name');
            $role->save();

            $role->syncPermissions($selectedPermissions);

            // Check if it's an AJAX/API request (from axios)
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Role updated successfully'
                ]);
            }

            // For regular form submissions, redirect
            return redirect()->route('roles.index')->with('success', 'Role updated successfully');

        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'errors' => $e->errors()
                ], 422);
            }
            return redirect()->back()->withErrors($e->errors())->withInput();
            
        } catch (\Exception $e) {
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occurred while updating the role'
                ], 500);
            }
            return redirect()->back()->with('error', 'An error occurred while updating the role');
        }
    }

    public function destroy($id): RedirectResponse
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully');
    }

    // API Endpoints

    public function apiRoles()
    {
        return Role::with('permissions')->get();
    }

    public function apiRole($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return response()->json($role);
    }

    public function apiPermissions()
    {
        return Permission::all();
    }

    
    public function editApi($id)
    {
        try {
            $role = Role::findOrFail($id);
            $permissions = Permission::all();
            $rolePermissions = $role->permissions->pluck('id')->toArray();

            $permissionsWithChecked = $permissions->map(function ($permission) use ($rolePermissions) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'checked' => in_array($permission->id, $rolePermissions),
                ];
            });

            return response()->json([
                'role' => $role,
                'permissions' => $permissionsWithChecked,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Role not found'
            ], 404);
        }
    }
}