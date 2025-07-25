<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Applicant;
use App\Models\JobList;
use Illuminate\Support\Facades\DB;

class ApplicantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil job pertama sebagai foreign key
        $job = JobList::first();

        if (!$job) {
            $this->command->warn("No job found. Please seed jobs_listing table first.");
            return;
        }

        // Hapus semua data lama jika perlu
        Applicant::truncate();

        Applicant::create([
            'job_id' => $job->id,
            'name' => 'Marvell Christofer',
            'email' => 'marvell@example.com',
            'phone' => '081234567890',
            'education' => 'S1 Teknik Informatika',
            'address' => 'Jakarta, Indonesia',
            'resume' => 'marvell_resume.pdf',
            'expected_salary' => 8000000,
            'start_date' => now()->addDays(14), // bisa mulai 2 minggu lagi
            'status' => 'Applied',
            'applied_at' => now(),
        ]);

        Applicant::create([
            'job_id' => $job->id,
            'name' => 'Yen Mariana',
            'email' => 'yen@example.com',
            'phone' => '081987654321',
            'education' => 'SMA',
            'address' => 'Bandung, Indonesia',
            'resume' => 'yen_cv.pdf',
            'expected_salary' => null, // tidak mencantumkan gaji
            'start_date' => now()->addDays(7),
            'status' => 'Under Review',
            'applied_at' => now()->subDays(1),
        ]);
    }
}
