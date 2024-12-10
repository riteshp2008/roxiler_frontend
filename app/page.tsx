import DashboardLayout from "@/components/DashboardLayout";
import TransactionsTable from "@/components/TransactionsTable";
import { Suspense } from "react";

export default function TransactionsPage() {
  return (
    <>
      <h1 className="pt-4 text-4xl font-bold text-center">
        Welcome to Roxiler
      </h1>
      <p className="text-lg text-center">
        Roxiler is a simple and intuitive online store for all your needs.
      </p>
      <DashboardLayout title="Transactions Dashboard">
        <Suspense fallback={<div>Loading dashboard...</div>}>
          <TransactionsTable />
        </Suspense>
      </DashboardLayout>
    </>
  );
}
