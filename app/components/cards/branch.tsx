'use client';

interface BranchStatsCardProps {
  branchName: string;
  servicesCount: number;
  employeesCount: number;
  activeOrdersCount: number;
}

export default function BranchStatsCard({
  branchName,
  servicesCount,
  employeesCount,
  activeOrdersCount,
}: BranchStatsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="space-y-6">
        {/* Branch Name */}
        <div className="flex items-center justify-between">
          <h3 className="h3">{branchName}</h3>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Active
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Services */}
          <div className="space-y-2 rounded-lg border border-gray-100 bg-neutral-100 p-4">
            <p className="text-sm text-gray-500">Services</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold text-primary">
                {servicesCount}
              </span>
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Employees */}
          <div className="space-y-2 rounded-lg border border-gray-100 bg-neutral-100 p-4">
            <p className="text-sm text-gray-500">Employees</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold text-primary">
                {employeesCount}
              </span>
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>

          {/* Active Orders */}
          <div className="space-y-2 rounded-lg border border-gray-100 bg-neutral-100 p-4">
            <p className="text-sm text-gray-500">Active Orders</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold text-primary">
                {activeOrdersCount}
              </span>
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-end space-x-2">
          <button className="btn-secondary">View Details</button>
          <button className="btn-primary">Manage</button>
        </div>
      </div>
    </div>
  );
}
