// app/admin/Dashboard/page.tsx
"use client";

import React from "react";
import { Users } from "lucide-react";

export default function Dashboard() {
  const totalUsers = "150"; // placeholder value

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <div className="content-page w-full max-w-4xl p-6">
        <div className="container-fluid">
          <div className="row page-title align-items-center mb-6">
            <div className="col-sm-4 col-xl-6">
              <h4 className="mb-1 mt-0 text-xl font-bold">Dashboard</h4>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-md-6 col-xl-3">
              <div className="card bg-white shadow rounded-lg">
                <div className="card-body p-0">
                  <div className="media flex items-center justify-center px-4 py-5 border-b border-gray-200">
                    <div className="media-body flex-1 text-center">
                      <h4 className="mt-0 mb-1 text-2xl font-normal">{totalUsers}</h4>
                      <span className="text-gray-500">Total Users</span>
                    </div>
                    <Users className="align-self-center icon-dual icon-lg w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
