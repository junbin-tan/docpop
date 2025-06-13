import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientDetails } from '@/types/client';
import { DocumentGenerator } from '@/lib/documentGenerator';
import { FileText, Download, User, Mail, Phone, CreditCard } from 'lucide-react';

interface ClientFormProps {
  onDocumentsGenerated: (documents: string[]) => void;
}

export function ClientForm({ onDocumentsGenerated }: ClientFormProps) {
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    email: '',
    phoneNumber: '',
    identificationNumber: '',
  });
  
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

  const handleGenerateDocuments = async () => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    try {
      const generator = new DocumentGenerator(clientDetails);
      const generatedDocs = await generator.generateAllDocuments();
      onDocumentsGenerated(generatedDocs);
    } catch (error) {
      console.error('Error generating documents:', error);
      alert('Error generating documents. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSingleDocument = async (docType: string) => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    try {
      const generator = new DocumentGenerator(clientDetails);
      await generator.generateDocument(docType);
      onDocumentsGenerated([docType]);
    } catch (error) {
      console.error(`Error generating ${docType} document:`, error);
      alert(`Error generating ${docType} document. Please try again.`);
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
            Document Generation
          </CardTitle>
          <CardDescription>
            Generate individual documents or all documents at once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => handleGenerateSingleDocument('warrant')}
              disabled={isGenerating}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Warrant to Act</div>
                <div className="text-sm text-muted-foreground">Authorization letter</div>
              </div>
            </Button>

            <Button
              onClick={() => handleGenerateSingleDocument('consent')}
              disabled={isGenerating}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Medical Consent</div>
                <div className="text-sm text-muted-foreground">Release of medical info</div>
              </div>
            </Button>

            <Button
              onClick={() => handleGenerateSingleDocument('demand')}
              disabled={isGenerating}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Letter of Demand</div>
                <div className="text-sm text-muted-foreground">Claim initiation letter</div>
              </div>
            </Button>

            <Button
              onClick={() => handleGenerateSingleDocument('notice')}
              disabled={isGenerating}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Statutory Notice</div>
                <div className="text-sm text-muted-foreground">Pre-litigation notice</div>
              </div>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={handleGenerateDocuments}
              disabled={isGenerating}
              size="lg"
              className="w-full"
            >
              <Download className="h-5 w-5 mr-2" />
              {isGenerating ? 'Generating Documents...' : 'Generate All Documents'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}