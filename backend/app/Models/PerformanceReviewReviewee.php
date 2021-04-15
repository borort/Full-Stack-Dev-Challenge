<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PerformanceReviewReviewee extends Pivot
{
    use HasFactory;

    protected $table = 'performance_review_reviewees';

    public $incrementing = true;

    protected $fillable = [
        'user_id',
        'pr_id',
    ];


    public function review()
    {
        return $this->belongsTo(PerformanceReview::class, 'pr_id');
    }

    public function feedbacks()
    {
        return $this->hasMany(PerformanceReviewFeedback::class, 'pr_reviewee_id');
    }




}
