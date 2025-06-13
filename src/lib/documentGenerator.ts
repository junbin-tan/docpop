import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { ClientDetails } from '@/types/client';

export class DocumentGenerator {
  private clientDetails: ClientDetails;

  constructor(clientDetails: ClientDetails) {
    this.clientDetails = clientDetails;
  }

  private createHeader(title: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 28,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    });
  }

  private createParagraph(text: string, bold: boolean = false): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: bold,
          size: 24,
        }),
      ],
      spacing: { after: 200 },
    });
  }

  private createWarrantToAct(): Document {
    const currentDate = new Date().toLocaleDateString();
    
    return new Document({
      sections: [
        {
          children: [
            this.createHeader("WARRANT TO ACT"),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${currentDate}`,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 400 },
            }),

            this.createParagraph("TO: [LAW FIRM NAME]", true),
            this.createParagraph(""),
            this.createParagraph("RE: MOTOR VEHICLE ACCIDENT CLAIM", true),
            this.createParagraph(""),
            
            this.createParagraph(`I, ${this.clientDetails.name}, holder of ID Number ${this.clientDetails.identificationNumber}, hereby authorize and instruct you to act on my behalf in connection with my motor vehicle accident claim.`),
            
            this.createParagraph("I hereby warrant and authorize you to:"),
            this.createParagraph("1. Investigate the circumstances of the accident"),
            this.createParagraph("2. Obtain all necessary medical reports and documentation"),
            this.createParagraph("3. Negotiate with insurance companies and third parties"),
            this.createParagraph("4. Institute legal proceedings if necessary"),
            this.createParagraph("5. Take all steps necessary to recover damages on my behalf"),
            
            this.createParagraph(""),
            this.createParagraph("CLIENT DETAILS:", true),
            this.createParagraph(`Full Name: ${this.clientDetails.name}`),
            this.createParagraph(`ID Number: ${this.clientDetails.identificationNumber}`),
            this.createParagraph(`Email: ${this.clientDetails.email}`),
            this.createParagraph(`Phone: ${this.clientDetails.phoneNumber}`),
            
            this.createParagraph(""),
            this.createParagraph("I confirm that I have read and understood the terms of this warrant."),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: "________________________",
                  size: 24,
                }),
              ],
              spacing: { before: 600, after: 200 },
            }),
            this.createParagraph(`${this.clientDetails.name}`),
            this.createParagraph("CLIENT SIGNATURE"),
          ],
        },
      ],
    });
  }

  private createConsentForMedicalInfo(): Document {
    const currentDate = new Date().toLocaleDateString();
    
    return new Document({
      sections: [
        {
          children: [
            this.createHeader("CONSENT FOR RELEASE OF MEDICAL INFORMATION"),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${currentDate}`,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 400 },
            }),

            this.createParagraph("TO: ALL MEDICAL PRACTITIONERS AND HEALTHCARE PROVIDERS", true),
            this.createParagraph(""),
            
            this.createParagraph(`I, ${this.clientDetails.name}, ID Number ${this.clientDetails.identificationNumber}, hereby give my full and informed consent for the release of all medical information, reports, records, and documentation relating to my treatment following the motor vehicle accident.`),
            
            this.createParagraph("This consent specifically authorizes the release of:"),
            this.createParagraph("1. All medical reports and clinical notes"),
            this.createParagraph("2. Diagnostic test results including X-rays, MRI, CT scans"),
            this.createParagraph("3. Treatment records and rehabilitation reports"),
            this.createParagraph("4. Specialist consultation reports"),
            this.createParagraph("5. Any other medical documentation relevant to my claim"),
            
            this.createParagraph(""),
            this.createParagraph("This information may be released to:"),
            this.createParagraph("• My legal representatives"),
            this.createParagraph("• Insurance companies involved in the claim"),
            this.createParagraph("• Medical experts appointed for assessment"),
            this.createParagraph("• Court officials if legal proceedings are instituted"),
            
            this.createParagraph(""),
            this.createParagraph("CLIENT DETAILS:", true),
            this.createParagraph(`Full Name: ${this.clientDetails.name}`),
            this.createParagraph(`ID Number: ${this.clientDetails.identificationNumber}`),
            this.createParagraph(`Email: ${this.clientDetails.email}`),
            this.createParagraph(`Phone: ${this.clientDetails.phoneNumber}`),
            
            this.createParagraph(""),
            this.createParagraph("I understand that this consent remains valid until revoked by me in writing."),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: "________________________",
                  size: 24,
                }),
              ],
              spacing: { before: 600, after: 200 },
            }),
            this.createParagraph(`${this.clientDetails.name}`),
            this.createParagraph("CLIENT SIGNATURE"),
          ],
        },
      ],
    });
  }

  private createLetterOfDemand(): Document {
    const currentDate = new Date().toLocaleDateString();
    
    return new Document({
      sections: [
        {
          children: [
            this.createHeader("LETTER OF DEMAND"),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${currentDate}`,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 400 },
            }),

            this.createParagraph("TO: [THIRD PARTY/INSURANCE COMPANY]", true),
            this.createParagraph(""),
            this.createParagraph("RE: MOTOR VEHICLE ACCIDENT - CLAIM FOR DAMAGES", true),
            this.createParagraph(`OUR CLIENT: ${this.clientDetails.name.toUpperCase()}`, true),
            this.createParagraph(""),
            
            this.createParagraph("We act on behalf of the above-named client in connection with a motor vehicle accident that occurred on [DATE] at [LOCATION]."),
            
            this.createParagraph("FACTS:", true),
            this.createParagraph("Our client was involved in a motor vehicle accident caused by the negligent driving of your insured. As a result of this accident, our client sustained injuries and suffered damages."),
            
            this.createParagraph(""),
            this.createParagraph("DAMAGES CLAIMED:", true),
            this.createParagraph("1. General damages for pain, suffering and loss of amenities of life"),
            this.createParagraph("2. Medical expenses incurred and to be incurred"),
            this.createParagraph("3. Loss of income/earning capacity"),
            this.createParagraph("4. Vehicle damage and related expenses"),
            this.createParagraph("5. Any other damages that may be proven"),
            
            this.createParagraph(""),
            this.createParagraph("DEMAND:", true),
            this.createParagraph("We hereby demand that you settle our client's claim within 30 (thirty) days of receipt of this letter. Failing settlement within the stipulated period, we shall institute action against your insured without further notice."),
            
            this.createParagraph(""),
            this.createParagraph("CLIENT DETAILS:", true),
            this.createParagraph(`Full Name: ${this.clientDetails.name}`),
            this.createParagraph(`ID Number: ${this.clientDetails.identificationNumber}`),
            this.createParagraph(`Email: ${this.clientDetails.email}`),
            this.createParagraph(`Phone: ${this.clientDetails.phoneNumber}`),
            
            this.createParagraph(""),
            this.createParagraph("We await your urgent response."),
            
            this.createParagraph(""),
            this.createParagraph("Yours faithfully,"),
            this.createParagraph(""),
            this.createParagraph("[LAW FIRM NAME]"),
            this.createParagraph("Attorneys for Plaintiff"),
          ],
        },
      ],
    });
  }

  private createStatutoryNotice(): Document {
    const currentDate = new Date().toLocaleDateString();
    
    return new Document({
      sections: [
        {
          children: [
            this.createHeader("STATUTORY NOTICE"),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${currentDate}`,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 400 },
            }),

            this.createParagraph("TO: [THIRD PARTY DRIVER]", true),
            this.createParagraph(""),
            this.createParagraph("RE: MOTOR VEHICLE ACCIDENT - STATUTORY NOTICE", true),
            this.createParagraph(`PLAINTIFF: ${this.clientDetails.name.toUpperCase()}`, true),
            this.createParagraph(""),
            
            this.createParagraph("TAKE NOTICE that our client intends to institute action against you in the High Court/Magistrate's Court for damages arising from a motor vehicle accident."),
            
            this.createParagraph(""),
            this.createParagraph("PARTICULARS OF CLAIM:", true),
            this.createParagraph("Date of Accident: [DATE]"),
            this.createParagraph("Place of Accident: [LOCATION]"),
            this.createParagraph("Cause of Action: Negligent driving resulting in motor vehicle collision"),
            
            this.createParagraph(""),
            this.createParagraph("NATURE OF DAMAGES:", true),
            this.createParagraph("1. General damages for pain, suffering and loss of amenities of life"),
            this.createParagraph("2. Special damages including medical expenses"),
            this.createParagraph("3. Loss of income and earning capacity"),
            this.createParagraph("4. Vehicle damage"),
            this.createParagraph("5. Interest and costs"),
            
            this.createParagraph(""),
            this.createParagraph("This notice is served in terms of the relevant statutory provisions and court rules. Since no amicable resolution has been forthcoming despite our previous correspondence, legal proceedings will be instituted shortly."),
            
            this.createParagraph(""),
            this.createParagraph("PLAINTIFF DETAILS:", true),
            this.createParagraph(`Full Name: ${this.clientDetails.name}`),
            this.createParagraph(`ID Number: ${this.clientDetails.identificationNumber}`),
            this.createParagraph(`Email: ${this.clientDetails.email}`),
            this.createParagraph(`Phone: ${this.clientDetails.phoneNumber}`),
            
            this.createParagraph(""),
            this.createParagraph("You are advised to forward this notice to your insurance company immediately."),
            
            this.createParagraph(""),
            this.createParagraph("DATED at [CITY] on this _____ day of _________, 2024."),
            
            this.createParagraph(""),
            this.createParagraph("[LAW FIRM NAME]"),
            this.createParagraph("Attorneys for Plaintiff"),
          ],
        },
      ],
    });
  }

  async generateDocument(documentType: string): Promise<void> {
    let doc: Document;
    let filename: string;

    switch (documentType) {
      case 'warrant':
        doc = this.createWarrantToAct();
        filename = `Warrant_to_Act_${this.clientDetails.name.replace(/\s+/g, '_')}.docx`;
        break;
      case 'consent':
        doc = this.createConsentForMedicalInfo();
        filename = `Medical_Consent_${this.clientDetails.name.replace(/\s+/g, '_')}.docx`;
        break;
      case 'demand':
        doc = this.createLetterOfDemand();
        filename = `Letter_of_Demand_${this.clientDetails.name.replace(/\s+/g, '_')}.docx`;
        break;
      case 'notice':
        doc = this.createStatutoryNotice();
        filename = `Statutory_Notice_${this.clientDetails.name.replace(/\s+/g, '_')}.docx`;
        break;
      default:
        throw new Error('Invalid document type');
    }

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, filename);
  }

  async generateAllDocuments(): Promise<string[]> {
    const documentTypes = ['warrant', 'consent', 'demand', 'notice'];
    const generatedDocs: string[] = [];

    for (const docType of documentTypes) {
      try {
        await this.generateDocument(docType);
        generatedDocs.push(docType);
        // Add a small delay between downloads to prevent browser blocking
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error generating ${docType} document:`, error);
      }
    }

    return generatedDocs;
  }
}