<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobList extends Model
{
    use HasFactory;

    protected $table = 'jobs_listing'; // optional, if table name is not plural of model

    protected $fillable = [
        'title',
        'slug',
        'division',
        'location',
        'type',
        'salary',
        'description',
        'job_desc',
        'requirements',
    ];

    public function applicants()
    {
        return $this->hasMany(Applicant::class, 'job_id');
    }
}