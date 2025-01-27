"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getAllBranches } from "@/app/lib/createBranch";
import { getServicesByBranchID } from "@/app/lib/createService";

interface BranchAndServiceProps {
  nameBranch: string;    // name attribute for the branch
  nameServices: string;  // name attribute for the selected services
}

export default function BranchAndService({
  nameBranch,
  nameServices,
}: BranchAndServiceProps) {
  const locale = usePathname().split("/")[1];

  const [branches, setBranches] = useState<{ id: string }[]>([]);
  const [services, setServices] = useState<{ id: string; title: string }[]>([]);

  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  const [isBranchesLoading, setIsBranchesLoading] = useState(false);
  const [isServicesLoading, setIsServicesLoading] = useState(false);

  // Refs to handle click outside
  const branchRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);

  // Fetch all branches on mount
  useEffect(() => {
    let ignore = false;
    async function fetchBranches() {
      setIsBranchesLoading(true);
      const result = await getAllBranches();
      if (!ignore) {
        setBranches(result);
        setIsBranchesLoading(false);
      }
    }
    fetchBranches();
    return () => {
      ignore = true;
    };
  }, []);

  // Fetch services when a branch is selected
  useEffect(() => {
    let ignore = false;
    async function fetchServices() {
      setIsServicesLoading(true);
      const data = await getServicesByBranchID(locale, selectedBranch!);
      if (!ignore) {
        setServices(data);
        setIsServicesLoading(false);
      }
    }
    if (selectedBranch) {
      fetchServices();
      setSelectedServices([]);
    } else {
      setServices([]);
    }
    return () => {
      ignore = true;
    };
  }, [selectedBranch, locale]);

  // Toggle branch dropdown
  const handleBranchToggle = () => {
    setBranchDropdownOpen((prev) => !prev);
    // Also close services dropdown if open
    setServiceDropdownOpen(false);
  };

  // Toggle services dropdown
  const handleServiceToggle = () => {
    if (!selectedBranch) return;
    setServiceDropdownOpen((prev) => !prev);
    // Also close branch dropdown if open
    setBranchDropdownOpen(false);
  };

  // Handle single branch selection
  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);
    setBranchDropdownOpen(false);
  };

  // Handle multiple services selection
  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Close dropdowns if user clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        branchRef.current &&
        !branchRef.current.contains(e.target as Node)
      ) {
        setBranchDropdownOpen(false);
      }
      if (
        serviceRef.current &&
        !serviceRef.current.contains(e.target as Node)
      ) {
        setServiceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Arrow rotation helpers
  const branchArrowClass = branchDropdownOpen ? "rotate-180" : "";
  const serviceArrowClass = serviceDropdownOpen ? "rotate-180" : "";

  return (
    <div className="flex w-full flex-row items-start gap-4">
      {/* Branch Section */}
      <div className="relative flex-1" ref={branchRef}>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Select Branch
        </label>
        <button
          type="button"
          onClick={handleBranchToggle}
          className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {isBranchesLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-gray-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37258 0 0 5.37258 0 12h4zm2 5.29102A7.96358 7.96358 0 014 12H0c0 3.04222 1.13403 5.82435 3 7.93762l3-2.6466z"
                />
              </svg>
              Loading...
            </div>
          ) : selectedBranch ? (
            // Show the branch's name or ID
            branches.find((b) => b.id === selectedBranch)?.id ?? "Choose Branch"
          ) : (
            "Choose Branch"
          )}
          <svg
            className={`ml-2 h-4 w-4 transition-transform duration-200 text-gray-400 ${branchArrowClass}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 8l4 4 4-4"
            />
          </svg>
        </button>
        <input type="hidden" name={nameBranch} value={selectedBranch ?? ""} />

        {/* Branch Dropdown */}
        {branchDropdownOpen && !isBranchesLoading && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <ul className="max-h-48 overflow-y-auto py-2 text-sm text-gray-700">
              {branches.map((branch) => (
                <li key={branch.id}>
                  <button
                    type="button"
                    onClick={() => handleBranchSelect(branch.id)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {branch.id}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Services Section */}
      <div className="relative flex-1" ref={serviceRef}>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Select Services
        </label>
        <button
          type="button"
          onClick={handleServiceToggle}
          disabled={!selectedBranch}
          className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition enabled:hover:bg-gray-50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isServicesLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-gray-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37258 0 0 5.37258 0 12h4zm2 5.29102A7.96358 7.96358 0 014 12H0c0 3.04222 1.13403 5.82435 3 7.93762l3-2.6466z"
                />
              </svg>
              Loading...
            </div>
          ) : selectedServices.length > 0 ? (
            `${selectedServices.length} service(s) selected`
          ) : (
            "Choose Services"
          )}
          <svg
            className={`ml-2 h-4 w-4 transition-transform duration-200 text-gray-400 ${serviceArrowClass}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 8l4 4 4-4"
            />
          </svg>
        </button>

        <input type="hidden" name={nameServices} value={selectedServices.join(",")} />

        {/* Services Dropdown */}
        {serviceDropdownOpen && !isServicesLoading && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {services.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">
                No services available for this branch.
              </div>
            ) : (
              <ul className="max-h-48 overflow-y-auto py-2 text-sm text-gray-700">
                {services.map((service) => (
                  <li key={service.id}>
                    <label className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleServiceChange(service.id)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {service.title}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
