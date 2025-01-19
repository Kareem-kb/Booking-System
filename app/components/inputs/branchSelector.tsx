'use client';
import { useState, useEffect } from 'react';
import { getAllBranches } from '@/app/lib/createBranch';

interface BranchSelectorProps {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function BranchSelector({
  name,
  onChange,
}: BranchSelectorProps) {
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    getAllBranches().then((branches) => {
      setBranches(branches);
    });
  }, []);
  return (
    <select name={name} onChange={onChange}>
      <option key={1} value="" className="cursor-pointer p-2 hover:bg-blue-50">
        select a branch
      </option>
      {branches.map((branch) => (
        <option key={branch.id} value={branch.id}>
          {branch.name}
        </option>
      ))}
    </select>
  );
}
