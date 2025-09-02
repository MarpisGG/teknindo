<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\JobListController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\TypeProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisitorLogController;
use App\Http\Controllers\TranslateController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\QuotationProductController;
use App\Http\Controllers\SearchController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/demo', function () {
    return Inertia::render('demo');
})->name('demo');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/services', function(){
    return Inertia::render('service');
})->name('service');

Route::get('/career', function () {
    return Inertia::render('career');
})->name('career');

Route::get('/blog', function () {
    return Inertia::render('blog');
})->name('blog');

Route::get('/location', function () {
    return Inertia::render('location');
})->name('location');

Route::get('/products',function(){
    return Inertia::render('products');
})->name('products');

Route::get('/request-quote', function () {
    return Inertia::render('request-quote');
})->name('request-quote');

Route::get('/faq', function () {
    return Inertia::render('faq');
})->name('faq');

Route::prefix('business')->group(function () {
    Route::get('/heavy-equipment', function () {
        return Inertia::render('heavy-equipment');
    })->name('business.heavy-equipment');

    Route::get('/construction-equipment', function () {
        return Inertia::render('construction-equipment');
    })->name('business.construction-equipment');

    Route::get('/mining-transportation', function () {
        return Inertia::render('mining-transportation');
    })->name('business.mining-transportation');

    Route::get('/mining-contractor', function () {
        return Inertia::render('mining-contractor');
    })->name('business.mining-contractor');

    Route::get('/mining-services', function () {
        return Inertia::render('mining-services');
    })->name('business.mining-services');

    Route::get('/industry-supplies', function () {
        return Inertia::render('industry-supplies');
    })->name('business.industry-supplies');
});

Route::get('/career/jobs', function () {
    return Inertia::render('career/jobs');
});

Route::get('/career/jobs/{slug}', function ($slug) {
    return inertia('career/show', [
        'slug' => $slug,
    ]);
});

Route::get('/blogs/{slug}', function ($slug) {
    return Inertia::render('blogs/show', [
        'slug' => $slug,
    ]);
})->name('blogs.show');

Route::get('/blogs', function () {
    return Inertia::render('blogs');
})->name('blogs');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'preventBack'])->prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
    
    // Roles
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create');
    Route::get('/roles/{id}', [RoleController::class, 'show'])->name('roles.show');
    Route::get('/roles/{id}/edit', [RoleController::class, 'edit'])->name('roles.edit');
    
    
    // Blogs
    Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::get('/blogs/create', [BlogController::class, 'create'])->name('blogs.create');
    Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show.admin');
    Route::get('/blogs/{id}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    
    // Jobs
    Route::get('/jobs', [JobListController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/create', [JobListController::class, 'create'])->name('jobs.create');
    Route::get('/jobs/{slug}', [JobListController::class, 'showSlug'])->name('jobs.show.slug')->where('slug', '[a-z0-9\-]+');
    Route::get('/jobs/{id}/edit', [JobListController::class, 'edit'])->name('jobs.edit')->where('id', '[0-9]+');
    
    // Product Categories
    Route::get('/categories', [ProductCategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [ProductCategoryController::class, 'create'])->name('categories.create');
    Route::get('/categories/{id}/edit', [ProductCategoryController::class, 'edit'])->name('categories.edit');
    
    // Product Types
    Route::get('/types', [TypeProductController::class, 'index'])->name('types.index');
    Route::get('/types/create', [TypeProductController::class, 'create'])->name('types.create');
    Route::get('/types/{id}/edit', [TypeProductController::class, 'edit'])->name('types.edit');
    Route::delete('/types/{id}', [TypeProductController::class, 'destroy'])->name('types.destroy.admin');
    
    
    // Products
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
    
    
    // Messages
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{id}', [MessageController::class, 'show'])->name('messages.show');
    
    // Quotation
    Route::get('/quotations', [QuotationController::class, 'index'])->name('quotations.index');
    Route::delete('/quotations/{id}', [QuotationController::class, 'destroy'])->name('quotations.destroy');

    //Quotation product
    Route::get('/quotation-products', [QuotationProductController::class, 'index'])->name('quotation-products.index');
    Route::get('/quotation-products/create', [QuotationProductController::class, 'create'])->name('quotation-products.create');
    Route::post('/quotation-products', [QuotationProductController::class, 'store'])->name('quotation-products.store');


    // Subscriptions
    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::get('/subscriptions/create', [SubscriptionController::class, 'create'])->name('subscriptions.create');
    
});

Route::middleware(['auth'])->group(function () {
    //roles
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{id}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->name('roles.destroy');
    
    // blogs
    Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store');
    Route::put('/blogs/{id}', [BlogController::class, 'update'])->name('blogs.update');
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy'])->name('blogs.destroy');
    Route::delete('/comments/{blogId}', [CommentController::class, 'destroy'])->name('comments.destroy');
    //jobs
    Route::post('/jobs', [JobListController::class, 'store'])->name('jobs.store');
    Route::put('/jobs/{id}', [JobListController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{id}', [JobListController::class, 'destroy'])->name('jobs.destroy');
    Route::delete('/applicants/{id}', [ApplicantController::class, 'destroy'])->name('applicants.destroy');
    Route::patch('/applicants/{id}/status', [ApplicantController::class, 'updateStatus'])->name('applicants.updateStatus');
    
    
    // categories
    Route::post('/categories', [ProductCategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{id}', [ProductCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [ProductCategoryController::class, 'destroy'])->name('categories.destroy');
    
    // types    
    Route::post('/types', [TypeProductController::class, 'store'])->name('types.store');
    Route::put('/types/{id}', [TypeProductController::class, 'update'])->name('types.update');
    
    Route::delete('/types/{id}', [TypeProductController::class, 'destroy'])->name('types.destroy');
    
    // products
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    
    
    // messages
    Route::delete('/messages/{id}', [MessageController::class, 'destroy'])->name('messages.destroy');
    Route::put('/messages/{id}/follow-up', [MessageController::class, 'toggleFollowUp'])->name('messages.toggleFollowUp');
    
    //quotations
    Route::put('/quotations/{id}/follow-up', [QuotationController::class, 'toggleFollowUp'])->name('quotations.toggleFollowUp');



    
    // subscriptions
    Route::delete('/subscriptions/{id}', [SubscriptionController::class, 'destroy'])->name('subscriptions.destroy');

    
    
    
    
    // API routes
    Route::prefix('api')->group(function () {
        Route::get('/roles', [RoleController::class, 'apiRoles'])->name('api.roles');
        Route::get('/roles/{id}/edit', [RoleController::class, 'editApi'])->name('api.roles.edit');
        Route::get('/permissions', [RoleController::class, 'apiPermissions'])->name('api.permissions');
        
        Route::get('/blogs/{id}/edit', [BlogController::class, 'editApi'])->name('api.blogs.edit');
        Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
        
        Route::get('/jobs/{id}/edit', [JobListController::class, 'editApi'])->name('api.jobs.edit');
        
        Route::get('/visitors/daily', [VisitorLogController::class, 'dailyVisitors'])->name('api.visitors.daily');
    });
});

Route::get('/blogs/{slug}/comments', [CommentController::class, 'getCommentsBySlug']);
Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

Route::get('/types/{id}', [TypeProductController::class, 'show'])->name('types.show');
Route::get('/api/types', [TypeProductController::class, 'apiIndex']);

Route::post('/api/quotations', [QuotationController::class, 'store'])->name('quotations.store');

Route::get('/api/blogs', [BlogController::class, 'apiBlogs'])->name('api.blogs');
Route::get('/api/blogs/{slug}', [BlogController::class, 'showSlug'])->name('api.blogs.showSlug');


Route::get('/products/spare-part', [ProductController::class, 'sparepartLanding'])->name('products.sparepart');
Route::get('/products/{slug}', [ProductController::class, 'productsByType'])->name('products.byType');
Route::get('/products/{typeSlug}/{productSlug}', [ProductController::class, 'showByType'])->name('products.showByType');
Route::patch('/admin/products/{product}/move', [ProductController::class, 'moveOrder']);


Route::get('/api/products', [ProductController::class, 'apiIndex'])->name('api.products.index');
Route::get('/api/landing-products', [ProductController::class, 'landingCarousel']);

Route::get('/api/jobs', [JobListController::class, 'apiJobs'])->name('api.jobs');
Route::get('/api/jobs/{slug}', [JobListController::class, 'showApi'])->name('api.jobs.show');
Route::post('/applicants', [ApplicantController::class, 'store']);
Route::post('/api/blogs/{id}/comments', [CommentController::class, 'store']);
Route::post('/api/blogs/{id}/like', [BlogController::class, 'like']);
Route::post('/api/blogs/{id}/unlike', [BlogController::class, 'unlike']);
Route::get('/api/blogs/{id}/related-random', [BlogController::class, 'relatedRandom']);

Route::get('/api/product-quotations', [QuotationProductController::class, 'indexQuotation']);

Route::get('/search', [SearchController::class, 'search'])->name('search');



Route::get('/translate', [TranslateController::class, 'translate']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/{any}', function () {
    return Inertia::render('notfound');
})->where('any', '.*');