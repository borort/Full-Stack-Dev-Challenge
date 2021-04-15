<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PerformanceReview;
use App\Models\PerformanceReviewFeedback;
use App\Models\PerformanceReviewReviewee;
use App\Models\User;
use Faker\Provider\ar_JO\Person;

class PerformanceReviewController extends Controller
{
    public function index() {
        $performance_reviews = PerformanceReview::orderBy('id', 'DESC')->get();
        //return response($performance_reviews);
        $data =  [];
        foreach($performance_reviews as $performance_review) {
            $reviewees = $performance_review->reviewees;
            $performance_review->reviewees = $reviewees;
            $data[] = $performance_review;
        }
        return response($data);

    }


    public function show($id) {
        $review = PerformanceReview::find($id);
        if(!$review) {
            $response = ['message' => 'Performance review not found'];
            return response($response, 200);
        }
        return response($review);
    }


    public function store(Request $request) {
        $review = PerformanceReview::create($request->toArray());

        $review->reviewees()->sync($request->input('reviewee'));

        $reviewers = $request->input('reviewer');

        $feedback_request = [];
        $prf = new PerformanceReviewFeedback;
        foreach($review->reviewees as $reviewee) {
            foreach($reviewers as $reviewer) {
                $feedback_request = ['pr_reviewee_id'=>$reviewee->pivot->id, 'user_id'=>$reviewer];
                $prf->updateOrCreate($feedback_request);
            }      
        }

        $response = ['message' => 'Performance review created', $review];
        return response($response, 200);
    }


    public function update(Request $request, $id) {
        
        $review = PerformanceReview::find($id);

        $review->name = $request->input('name');
        $review->description = $request->input('description');
        $review->due_date = $request->input('due_date');
                
        $review->save();
        $review->reviewees()->sync($request->input('reviewee'));

        $reviewers = $request->input('reviewer');

        $feedback_request = [];
        $prf = new PerformanceReviewFeedback;
        foreach($review->reviewees as $reviewee) {
            foreach($reviewers as $reviewer) {
                $feedback_request = ['pr_reviewee_id'=>$reviewee->pivot->id, 'user_id'=>$reviewer];
                $prf->updateOrCreate($feedback_request);
            }      
        }
        //return($feedback_request);
        
        $response = ['message' => 'Performance review updated', $review];
        return response($response, 200);

    }





    public function reviewee_index($id) {
        $reviewees = PerformanceReview::find($id)->reviewees;
        return response($reviewees);
    }


    public function reviewee_show($id, $reviewee_id) {
        $reviewee = PerformanceReview::find($id)->reviewees->where('id', $reviewee_id)->first();
        return response($reviewee);
        
    }



    public function feedback_index($id, $reviewee_id) {
        $pr_reviewee_id = PerformanceReview::find($id)
            ->reviewees->where('id', $reviewee_id)->first()
            ->pivot->id;

        $feedbacks = PerformanceReviewReviewee::find($pr_reviewee_id)->feedbacks;
        return response($feedbacks);
        
    }


    public function reviewer_index($id, $reviewee_id) {
        $pr_reviewee_id = PerformanceReview::find($id)
            ->reviewees->where('id', $reviewee_id)->first()
            ->pivot->id;
        $feedbacks = PerformanceReviewReviewee::find($pr_reviewee_id)->feedbacks;
        $reviewer_ids = [];
        foreach($feedbacks as $feedback) {
            $reviewer_ids[] = $feedback->user_id;
        }
        $reviewers = User::whereIn('id', $reviewer_ids)->get();
        return response($reviewers);
        
    }


    public function feedback_requests($id) {
        $feedbacks = User::find($id)->feedbacks;
        $data =  [];
        foreach($feedbacks as $feedback) {
            $review = $feedback->reviewee->review;
            $reviewee = User::find($feedback->reviewee->user_id);
            
            $feedback->review = $review;
            $feedback->reviewee_user = $reviewee;
            //dd($feedback);
            $data[] = $feedback;
        }
        return response($data);
        
    }


    public function feedback_request_show($id, $feedback_id) {
        $feedback = User::find($id)->feedbacks->where('id', $feedback_id);
        //$review = $feedback->first()->reviewee->review;
        //$reviewee = User::find($feedback->first()->reviewee->user_id);
        //$feedback->review = $review;
        //$feedback->reviewee = $reviewee;
        
        return response($feedback);
 
    }


    public function feedback_request_update(Request $request, $id, $feedback_id) {
        $feedback = PerformanceReviewFeedback::where('user_id', $id)
                    ->where('id', $feedback_id)->get()->first();

        //dd($request->input('feedback'));
        $feedback->feedback = $request->input('feedback');
        $feedback->rating = $request->input('rating');
        $feedback->is_submitted = true;
        $feedback->submitted_at = now();
        $feedback->save();
        $response = ['message' => 'Feedback submitted', $feedback];
        return response($response, 200);

        //return response($feedback);
   
    }







}
