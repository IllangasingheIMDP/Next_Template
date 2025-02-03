"use client";
import api from "@/redux/api";

export const getAllUsers = async () => {
    try {
        const response=await api.get(`/admin/users`);
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || "Failed to fetch users");
    }
}