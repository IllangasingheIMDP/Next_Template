"use client";
import React from 'react'
import ProtectedRoute from "@/components/ProtectedRoute";
const page = () => {
  return (
    <ProtectedRoute allowedRoles={["Admin"]}>
      <div>User View</div>
    </ProtectedRoute>
  )
}

export default page