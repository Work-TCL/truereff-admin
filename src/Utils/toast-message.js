"use client";
import React from 'react';
import { Info, TriangleAlert } from 'lucide-react';
import { toast } from "react-hot-toast";


export const toastMessage = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    info: (message) => toast(
        (t) => (
            <span className="text-[#7877EE]">
                {message}
            </span>
        ),
        {
            icon: <Info strokeWidth={1.5} color="#7877EE" />,
        }
    ),
    warning: (message) => toast(
        (t) => (
            <span className="text-[#FFE982]">
                {message}
            </span>
        ),
        {
            icon: <TriangleAlert strokeWidth={1.5} color="#FFE982" />,
        }
    ),

}