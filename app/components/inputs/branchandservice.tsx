'use client';

import BranchSelector from './branchSelector';
import { useState, useEffect } from 'react';
import { getServicesByBranchID } from '@/app/lib/createService';
import { usePathname as realpath } from 'next/navigation';

interface BranchAndServiceProps {
  name1: string;
  name2: string;
}

export default function BranchAndService({
  name1,
  name2,
}: BranchAndServiceProps) {
  const localnow = realpath().split('/')[1];
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [services, setServices] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (selectedBranch) {
      getServicesByBranchID(localnow, selectedBranch).then((services) => {
        setServices(services);
      });
    }
  }, [selectedBranch, localnow]);

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranch(event.target.value);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedServices(selectedOptions);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col space-y-4 rounded-lg bg-gray-50 p-6 shadow-md">
      {/* Branch Selector */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="branch-selector"
          className="text-sm font-medium text-gray-700"
        >
          Select Branch
        </label>
        <BranchSelector name={name1} onChange={handleBranchChange} />
      </div>

      {/* Services Selector */}
      {selectedBranch && (
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="services-selector"
            className="text-sm font-medium text-gray-700"
          >
            Select Services
          </label>
          <select
            multiple
            onChange={handleServiceChange} // Remove the `name` attribute
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {services.map((service) => (
              <option
                key={service.id}
                value={service.id}
                className="cursor-pointer p-2 hover:bg-blue-50"
              >
                {service.title}
              </option>
            ))}
          </select>
          {/* Hidden input to store selected services as a comma-separated string */}
          <input
            type="hidden"
            name={name2}
            value={selectedServices.join(',')}
          />
        </div>
      )}
    </div>
  );
}