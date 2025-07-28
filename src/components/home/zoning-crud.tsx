import { useTheme } from "@/theme/theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const zoningData = [
  {
    id: "1",
    fileName: "zoning-plan-A.pdf",
    fileType: "PDF",
    uploadDate: "2025-07-20",
    status: "Approved",
  },
  {
    id: "2",
    fileName: "land-use-map.png",
    fileType: "Image",
    uploadDate: "2025-07-22",
    status: "Pending",
  },
  {
    id: "3",
    fileName: "building-codes.docx",
    fileType: "Word Document",
    uploadDate: "2025-07-25",
    status: "Rejected",
  },
];

export function ZoningCrud() {
  const theme = useTheme();

  return (
    <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Zoning Management</CardTitle>
          <Button>Upload File</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>File Type</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zoningData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fileName}</TableCell>
                <TableCell>{item.fileType}</TableCell>
                <TableCell>{item.uploadDate}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Update</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
