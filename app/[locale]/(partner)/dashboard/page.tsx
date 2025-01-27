import BranchStatsCard from '@/app/components/cards/branch';
export default function admin() {
  return (
    <div>
      <BranchStatsCard
        branchName="Main Branch"
        servicesCount={24}
        employeesCount={12}
        activeOrdersCount={8}
      />
      {/* Add more cards as needed */}
    </div>
  );
}
