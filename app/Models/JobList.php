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
        'job_desc',
        'requirements',
        'benefit',
    ];

    public function applicants()
    {
        return $this->hasMany(Applicant::class, 'job_id');
    }
}