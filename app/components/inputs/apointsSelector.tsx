'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAllBranches } from '@/app/lib/dbBranch';
import { getServicesByBranchID } from '@/app/lib/dbService';
import { getStaffByServiceID } from '@/app/lib/dbStaff';

interface DropdownItem {
  id: string;
  title?: string;
}

interface BranchServiceStaffProps {
  nameBranch: string;
  nameServices: string;
  nameStaff: string;
  branchError: string;
  serviceError: string;
  staffError: string;
}

export default function BranchServiceStaff({
  nameBranch,
  nameServices,
  nameStaff,
  branchError,
  serviceError,
  staffError,
}: BranchServiceStaffProps) {
  const locale = usePathname().split('/')[1];

  // State for dropdown options
  const [branches, setBranches] = useState<DropdownItem[]>([]);
  const [services, setServices] = useState<DropdownItem[]>([]);
  const [staffList, setStaffList] = useState<DropdownItem[]>([]);

  // State for selected values
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  // State for loading states
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(false);

  // Fetch branches on mount
  const fetchBranches = useCallback(async () => {
    setLoadingBranches(true);
    try {
      const data = await getAllBranches();
      setBranches(data);
    } finally {
      setLoadingBranches(false);
    }
  }, []);

  // Fetch services when branch changes
  const fetchServices = useCallback(
    async (branchId: string) => {
      if (!branchId) return;
      setLoadingServices(true);
      try {
        const data = await getServicesByBranchID(locale, branchId);
        setServices(data);
        setSelectedService(''); // Reset service selection
        setStaffList([]); // Reset staff list
        setSelectedStaff(''); // Reset staff selection
      } finally {
        setLoadingServices(false);
      }
    },
    [locale]
  );

  // Fetch staff when service changes
  const fetchStaff = useCallback(
    async (serviceId: string) => {
      if (!serviceId) {
        setStaffList([]);
        setSelectedStaff('');
        return;
      }
      setLoadingStaff(true);
      try {
        const staff = await getStaffByServiceID(locale, serviceId);
        setStaffList(staff.map((s) => ({ id: s.id, title: s.name || s.id })));
      } finally {
        setLoadingStaff(false);
      }
    },
    [locale]
  );

  // Handle branch selection change
  const handleBranchChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const branchId = e.target.value;
      setSelectedBranch(branchId);
      await fetchServices(branchId);
    },
    [fetchServices]
  );

  // Handle service selection change
  const handleServiceChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const serviceId = e.target.value;
      setSelectedService(serviceId);
      await fetchStaff(serviceId);
    },
    [fetchStaff]
  );

  // Handle staff selection change
  const handleStaffChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedStaff(e.target.value);
    },
    []
  );

  // Fetch branches on component mount
  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return (
    <div className="space-y-4">
      {/* Branch Select */}
      <div>
        <label
          htmlFor="branchSelect"
          className="block font-medium text-gray-700"
        >
          Select Branch
        </label>
        <select
          name={nameBranch}
          id="branchSelect"
          value={selectedBranch}
          onChange={handleBranchChange}
          className="mt-1 block w-full border p-2"
          disabled={loadingBranches}
        >
          <option value="">
            {loadingBranches ? 'Loading branches...' : 'Choose Branch'}
          </option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.title || branch.id}
            </option>
          ))}
        </select>
        {branchError && <p className="text-sm text-red-500">{branchError}</p>}
      </div>

      {/* Service Select */}
      <div>
        <label
          htmlFor="serviceSelect"
          className="block font-medium text-gray-700"
        >
          Select Service
        </label>
        <select
          name={nameServices}
          id="serviceSelect"
          value={selectedService}
          onChange={handleServiceChange}
          className="mt-1 block w-full border p-2"
          disabled={!selectedBranch || loadingServices}
        >
          <option value="">
            {loadingServices ? 'Loading services...' : 'Choose Service'}
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title || service.id}
            </option>
          ))}
        </select>
        {serviceError && <p className="text-sm text-red-500">{serviceError}</p>}
      </div>

      {/* Staff Select */}
      <div>
        <label
          htmlFor="staffSelect"
          className="block font-medium text-gray-700"
        >
          Select Staff
        </label>
        <select
          name={nameStaff}
          id="staffSelect"
          value={selectedStaff}
          onChange={handleStaffChange}
          className="mt-1 block w-full border p-2"
          disabled={!selectedService || loadingStaff}
        >
          <option value="">
            {loadingStaff ? 'Loading staff...' : 'Choose Staff'}
          </option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.title || staff.id}
            </option>
          ))}
        </select>
        {staffError && <p className="text-sm text-red-500">{staffError}</p>}
      </div>
    </div>
  );
}
