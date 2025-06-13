import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ClientDetails } from '@/types/client';
import { DocumentGenerator } from '@/lib/documentGenerator';
import { FileText, Download, User, Mail, Phone, CreditCard, Package } from 'lucide-react';
import { toast } from 'sonner';

interface ClientFormProps {
  onDocumentsGenerated: (documents: string[]) => void;
}

const documentOptions = [
  { id: 'warrant', name: 'Warrant to Act', description: 'Authorization letter' },
  { id: 'consent', name: 'Medical Consent', description: 'Release of medical info' },
  { id: 'demand', name: 'Letter of Demand', description: 'Claim initiation letter' },
  { id: 'notice', name: 'Statutory Notice', description: 'Pre-litigation notice' },
];

export function ClientForm({ onDocumentsGenerated }: ClientFormProps) {
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    email: '',
    phoneNumber: '',
    identificationNumber: '',
  });
  
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Partial<ClientDetails>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ClientDetails> = {};
    
    if (!clientDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!clientDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(clientDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!clientDetails.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!clientDetails.identificationNumber.trim()) {
      newErrors.identificationNumber = 'Identification number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ClientDetails, value: string) => {
    setClientDetails(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDocumentSelection = (documentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments(prev => [...prev, documentId]);
    } else {
      setSelectedDocuments(prev => prev.filter(id => id !== documentId));
    }
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documentOptions.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documentOptions.map(doc => doc.id));
    }
  };

  const handleGenerateDocuments = async () => {
    if (!validateForm()) {
      return;
    }

    if (selectedDocuments.length === 0) {
      toast.error('Please select at least one document to generate.');
      return;
    }

    setIsGenerating(true);
    try {
      const generator = new DocumentGenerator(clientDetails);
      
      if (selectedDocuments.length === 1) {
        // Generate single document
        await generator.generateDocument(selectedDocuments[0]);
        onDocumentsGenerated(selectedDocuments);
        toast.success('Document generated successfully!');
      } else {
        // Generate multiple documents as ZIP
        await generator.generateDocumentsAsZip(selectedDocuments);
        onDocumentsGenerated(selectedDocuments);
        toast.success(`${selectedDocuments.length} documents generated and packaged in ZIP!`);
      }
    } catch (error) {
      console.error('Error generating documents:', error);
      toast.error('Error generating documents. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            Client Information
          </CardTitle>
          <CardDescription>
            Enter the client details to generate legal documents for motor vehicle accident claims.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter client's full name"
                value={clientDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter client's email"
                value={clientDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Enter client's phone number"
                value={clientDetails.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="id" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Identification Number
              </Label>
              <Input
                id="id"
                placeholder="Enter client's ID number"
                value={clientDetails.identificationNumber}
                onChange={(e) => handleInputChange('identificationNumber', e.target.value)}
                className={errors.identificationNumber ? 'border-red-500' : ''}
              />
              {errors.identificationNumber && <p className="text-sm text-red-500">{errors.identificationNumber}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Document Selection
          </CardTitle>
          <CardDescription>
            Select the documents you want to generate. Multiple documents will be packaged in a ZIP file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleSelectAll}
              variant="outline"
              size="sm"
            >
              {selectedDocuments.length === documentOptions.length ? 'Deselect All' : 'Select All'}
            </Button>
            <span className="text-sm text-muted-foreground">
              {selectedDocuments.length} of {documentOptions.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentOptions.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox
                  id={doc.id}
                  checked={selectedDocuments.includes(doc.id)}
                  onCheckedChange={(checked) => handleDocumentSelection(doc.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <Label htmlFor={doc.id} className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4" />
                      <span className="font-semibold">{doc.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </Label>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={handleGenerateDocuments}
              disabled={isGenerating || selectedDocuments.length === 0}
              size="lg"
              className="w-full"
            >
              {selectedDocuments.length > 1 ? (
                <Package className="h-5 w-5 mr-2" />
              ) : (
                <Download className="h-5 w-5 mr-2" />
              )}
              {isGenerating 
                ? 'Generating Documents...' 
                : selectedDocuments.length > 1 
                  ? `Generate ${selectedDocuments.length} Documents (ZIP)`
                  : selectedDocuments.length === 1
                    ? 'Generate Document'
                    : 'Select Documents to Generate'
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}