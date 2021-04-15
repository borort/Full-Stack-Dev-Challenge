<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerformanceReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'due_date'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    //public function pr_reviewees()
    //{
    //    return $this->hasMany(PerformanceReviewReviewee::class, 'pr_id', 'id');
    //}


    public function reviewees()
    {
        return $this->belongsToMany(User::class, 'performance_review_reviewees', 'pr_id', 'user_id')
                    ->withPivot('id', 'pr_id', 'user_id');
    }

}
