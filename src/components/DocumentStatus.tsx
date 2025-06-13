import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText } from 'lucide-react';

interface DocumentStatusProps {
  generatedDocuments: string[];
}

const documentNames = {
  warrant: 'Warrant to Act',
  consent: 'Consent for Medical Information',
  demand: 'Letter of Demand',
  notice: 'Statutory Notice',
};

export function DocumentStatus({ generatedDocuments }: DocumentStatusProps) {
  if (generatedDocuments.length === 0) {
    return null;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-6 w-6" />
          Documents Generated Successfully
        </CardTitle>
        <CardDescription>
          The following documents have been generated and downloaded:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {generatedDocuments.map((docType) => (
            <div key={docType} className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
              <FileText className="h-4 w-4 text-green-600" />
              <span className="text-green-800">
                {documentNames[docType as keyof typeof documentNames] || docType}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Check your downloads folder for the generated Word documents.
        </p>
      </CardContent>
    </Card>
  );
}