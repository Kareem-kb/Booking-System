'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAllBranches } from '@/app/lib/createBranch';
import { getServicesByBranchID } from '@/app/lib/createService';

interface DropdownItem {
  id: string;
  title?: string;
}

interface BranchAndServiceProps {
  nameBranch: string;
  nameServices: string;
}

export default function BranchAndService({
  nameBranch,
  nameServices,
}: BranchAndServiceProps) {
  const locale = usePathname().split('/')[1];
  const [branches, setBranches] = useState<DropdownItem[]>([]);
  const [services, setServices] = useState<DropdownItem[]>([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);

  // Load branches on mount
  useEffect(() => {
    getAllBranches()
      .then(setBranches)
      .finally(() => setLoadingBranches(false));
  }, []);

  // Fetch services when branch changes
  useEffect(() => {
    if (!selectedBranch) {
      setServices([]);
      setSelectedServices(new Set());
      return;
    }
    setLoadingServices(true);
    getServicesByBranchID(locale, selectedBranch)
      .then((data) => {
        setServices(data);
        setSelectedServices(new Set());
      })
      .finally(() => setLoadingServices(false));
  }, [selectedBranch, locale]);

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranch(e.target.value);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // For multi-select, get all selected option values
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedServices(new Set(selected));
  };

  return (
    <div className="space-y-4">
      {/* Branch Select */}
      <div>
        <label htmlFor="branchSelect" className="block font-medium">
          Select Branch
        </label>
        <select
          id="branchSelect"
          name={nameBranch}
          value={selectedBranch}
          onChange={handleBranchChange}
          className="w-full border p-2"
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
      </div>

      {/* Services Select */}
      <div>
        <label htmlFor="serviceSelect" className="block font-medium">
          Select Services
        </label>
        <select
          id="serviceSelect"
          name={nameServices}
          multiple
          value={Array.from(selectedServices)}
          onChange={handleServiceChange}
          className="w-full border p-2"
          disabled={!selectedBranch || loadingServices}
        >
          {loadingServices ? (
            <option>Loading services...</option>
          ) : (
            services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title || service.id}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}
