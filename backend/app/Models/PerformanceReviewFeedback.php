<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerformanceReviewFeedback extends Model
{
    use HasFactory;

    protected $table = 'performance_review_feedbacks';

    protected $fillable = [
        'user_id',
        'pr_reviewee_id',
        'feedback',
        'rating',
        'is_submitted',
        'submitted_at'
    ];

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reviewee()
    {
        return $this->belongsTo(PerformanceReviewReviewee::class, 'pr_reviewee_id');
    }
    


}
