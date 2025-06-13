import React, { useState } from 'react';
import { ClientForm } from '@/components/ClientForm';
import { DocumentStatus } from '@/components/DocumentStatus';
import { Scale } from 'lucide-react';

function App() {
  const [generatedDocuments, setGeneratedDocuments] = useState<string[]>([]);

  const handleDocumentsGenerated = (documents: string[]) => {
    setGeneratedDocuments(documents);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Legal Document Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your motor vehicle accident claims with automated document generation. 
            Enter client details and generate professional legal documents instantly.
          </p>
        </header>

        <main className="space-y-8">
          <ClientForm onDocumentsGenerated={handleDocumentsGenerated} />
          <DocumentStatus generatedDocuments={generatedDocuments} />
        </main>

        <footer className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            Professional legal document generation for motor vehicle accident claims
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;