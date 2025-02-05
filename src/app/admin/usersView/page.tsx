"use client";
import React from 'react'
import ProtectedRoute from "@/components/ProtectedRoute";
const page = () => {
  return (
    <ProtectedRoute allowedRoles={["Admin"]}>
      <div className='text-white bg-red-700'>User View</div>
    </ProtectedRoute>
  )
}

export default page