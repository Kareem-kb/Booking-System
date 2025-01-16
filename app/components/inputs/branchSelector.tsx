'use client';
import { useState, useEffect } from 'react';
import { getAllBranches } from '@/app/lib/createBranch';

interface BranchSelectorProps {
  name: string;
}

export default function BranchSelector({ name }: BranchSelectorProps) {
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    getAllBranches().then((branches) => {
      setBranches(branches);
    });
  }, []);
  return (
    <select name={name}>
      {branches.map((branch) => (
        <option key={branch.id} value={branch.id}>
          {branch.name}
        </option>
      ))}
    </select>
  );
}
