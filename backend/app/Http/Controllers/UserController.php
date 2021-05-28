<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage');
        $page = $request->input('page') - 1;
        $sortBy = $request->input('sortBy');
        $orderBy = $request->input('orderBy');
        $searchValue = $request->input('search');

        $data = User::where('estado', '1')
            ->with('rol')
            ->whereHas('rol', function ($q) {
                $q->where('estado', '1');
            })
            ->where(function ($query) use ($searchValue) {
                $query->where("id", "LIKE", "%$searchValue%")
                    ->orWhere('email', "LIKE", "%$searchValue%");
            });

        $total = $data->count();

        $data = $data
            ->skip($page * $perPage)
            ->take($perPage)
            ->orderBy($sortBy, $orderBy)->get();

        return response()->json(['rows' => $data, 'totalRecords' => $total], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = User::where('estado', '1')
            ->where('id', $id)
            ->first();

        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
