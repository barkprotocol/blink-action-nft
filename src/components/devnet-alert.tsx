import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

export function DevnetAlert() {
  return (
    <Alert variant="caution" className="flex items-center space-x-3 p-4">
      <TriangleAlertIcon className="h-5 w-5 text-caution" aria-hidden="true" />
      <div className="flex flex-col">
        <AlertTitle className="font-semibold">Devnet ONLY</AlertTitle>
        <AlertDescription>
          This example action is configured to run on Solana&apos;s devnet. Make
          sure your wallet is set to devnet when testing this transaction.
        </AlertDescription>
      </div>
    </Alert>
  );
}
