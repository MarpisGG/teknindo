<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Applicant;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DeleteRejected extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-rejected';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //delete applicants with status 'rejected' within 5 minutes after rejected
        $rejectedApplicants = Applicant::where('status', 'rejected')
            ->where('updated_at', '<=', now()->subMinutes(5))
            ->get();
        foreach ($rejectedApplicants as $applicant) {
            // Log the applicant's ID and name
            Log::info('Deleting rejected applicant', [
                'id' => $applicant->id,
                'name' => $applicant->name,
            ]);
            // Delete the applicant's resume file if it exists
            if ($applicant->resume && Storage::exists($applicant->resume)) {
                Storage::delete($applicant->resume);
                Log::info('Deleted resume file for applicant', [
                    'id' => $applicant->id,
                    'resume' => $applicant->resume,
                ]);
            }

            if ($applicant->coverletter && Storage::exists($applicant->coverletter)) {
                Storage::delete($applicant->coverletter);
                Log::info('Deleted resume file for applicant', [
                    'id' => $applicant->id,
                    'cover_letter' => $applicant->coverletter,
                ]);
            }

            // Delete the applicant record
            $applicant->delete();
        }

    }
}
