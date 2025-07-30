import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function PermitRenewalStats() {
  // Mock data
  const renewedCount = 1250;
  const notRenewedCount = 350;
  const total = renewedCount + notRenewedCount;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permit Renewal Statistics</CardTitle>
        <CardDescription>
          Overview of business permit renewals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Renewed
            </p>
            <p className="text-lg font-semibold">{renewedCount.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Not Renewed
            </p>
            <p className="text-lg font-semibold">{notRenewedCount.toLocaleString()}</p>
          </div>
           <div className="flex items-center justify-between border-t pt-4">
            <p className="text-sm font-medium">
              Total Businesses
            </p>
            <p className="text-lg font-semibold">{total.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
