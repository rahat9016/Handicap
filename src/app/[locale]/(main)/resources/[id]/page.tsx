 
"use client";


import ResourceDetails from "@/components/common/ResourceDetails/ResourceDetails";
// type FileResource = {
//   id: number;
//   name: string;
//   type: string;
//   size: string;
//   url: string;
//   description: string;
//   pages?: number;
//   language: string;
//   accessible: boolean;
//   content?: string;
//   dimensions?: string;
//   altText?: string;
// };
// type Resource = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   sector: string;
//   language: string[];
//   author: string;
//   organization: string;
//   datePublished: string;
//   dateUpdated: string;
//   version: string;
//   downloads: number;
//   views: number;
//   rating: number;
//   ratingCount: number;
//   tags: string[];
//   featured: boolean;
//   files: {
//     id: number;
//     name: string;
//     type: string;
//     size: string;
//     url: string;
//     description: string;
//     pages?: number;
//     language: string;
//     accessible: boolean;
//     content?: string;
//     dimensions?: string;
//     altText?: string;
//   }[];
// };
// Sample resource data with real downloadable files
// const resourcesData: Record<string, Resource> = {
//   1: {
//     id: 1,
//     title: "Comprehensive Disability Inclusion Guidelines for WASH Programs",
//     description:
//       "This comprehensive resource package provides detailed guidelines, templates, and training materials for implementing disability-inclusive WASH programs in humanitarian settings. The package includes policy documents, practical implementation guides, assessment tools, and multimedia training content.",
//     category: "guidelines",
//     sector: "wash",
//     language: ["english", "bangla"],
//     author: "WASH Disability Inclusion Working Group",
//     organization: "Global WASH Cluster",
//     datePublished: "2024-01-15",
//     dateUpdated: "2024-02-20",
//     version: "2.1",
//     downloads: 1247,
//     views: 3456,
//     rating: 4.8,
//     ratingCount: 156,
//     tags: ["accessibility", "WASH", "humanitarian", "inclusion", "guidelines"],
//     featured: true,
//     files: [
//       {
//         id: 1,
//         name: "Main Guidelines Document",
//         type: "pdf",
//         size: "3.2 MB",
//         url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
//         description:
//           "Complete guidelines for disability-inclusive WASH programming",
//         pages: 45,
//         language: "english",
//         accessible: true,
//       },
//       {
//         id: 2,
//         name: "Quick Reference Guide",
//         type: "doc",
//         size: "1.1 MB",
//         url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
//         description: "Condensed checklist and quick reference for field staff",
//         pages: 8,
//         language: "english",
//         accessible: true,
//       },
//       {
//         id: 3,
//         name: "Implementation Checklist",
//         type: "text",
//         size: "45 KB",
//         url:
//           "data:text/plain;charset=utf-8," +
//           encodeURIComponent(`# WASH Disability Inclusion Implementation Checklist

// ## Pre-Implementation Phase

// ### 1. Needs Assessment
// - [ ] Conduct disability-inclusive needs assessment
// - [ ] Use Washington Group Questions for data collection
// - [ ] Identify barriers to WASH access for persons with disabilities
// - [ ] Map existing accessible WASH facilities
// - [ ] Consult with disability organizations and advocates

// ### 2. Planning and Design
// - [ ] Include accessibility requirements in facility design
// - [ ] Plan for assistive devices and adaptive equipment
// - [ ] Ensure pathways to facilities are accessible
// - [ ] Design gender-segregated accessible facilities
// - [ ] Plan for different types of disabilities (physical, sensory, intellectual)

// ### 3. Community Engagement
// - [ ] Engage persons with disabilities in planning process
// - [ ] Conduct focus group discussions with disability community
// - [ ] Establish feedback mechanisms
// - [ ] Train community volunteers on disability inclusion
// - [ ] Create awareness campaigns on inclusive WASH

// ## Implementation Phase

// ### 4. Construction and Setup
// - [ ] Follow universal design principles
// - [ ] Install appropriate handrails and support structures
// - [ ] Ensure adequate lighting for persons with visual impairments
// - [ ] Create tactile indicators and signage
// - [ ] Test accessibility with persons with disabilities

// ### 5. Service Delivery
// - [ ] Train staff on disability awareness and etiquette
// - [ ] Provide assistance when requested
// - [ ] Ensure hygiene materials are accessible
// - [ ] Adapt information materials for different communication needs
// - [ ] Monitor usage by persons with disabilities

// ## Monitoring and Evaluation

// ### 6. Data Collection
// - [ ] Disaggregate data by disability status
// - [ ] Track accessibility improvements
// - [ ] Monitor satisfaction levels
// - [ ] Document lessons learned
// - [ ] Report on inclusion indicators

// ### 7. Continuous Improvement
// - [ ] Regular accessibility audits
// - [ ] Update facilities based on feedback
// - [ ] Strengthen partnerships with disability organizations
// - [ ] Share best practices with other programs
// - [ ] Advocate for policy changes when needed`),
//         description: "Step-by-step checklist for program implementation",
//         content: `# WASH Disability Inclusion Implementation Checklist

// ## Pre-Implementation Phase

// ### 1. Needs Assessment
// - [ ] Conduct disability-inclusive needs assessment
// - [ ] Use Washington Group Questions for data collection
// - [ ] Identify barriers to WASH access for persons with disabilities
// - [ ] Map existing accessible WASH facilities
// - [ ] Consult with disability organizations and advocates

// ### 2. Planning and Design
// - [ ] Include accessibility requirements in facility design
// - [ ] Plan for assistive devices and adaptive equipment
// - [ ] Ensure pathways to facilities are accessible
// - [ ] Design gender-segregated accessible facilities
// - [ ] Plan for different types of disabilities (physical, sensory, intellectual)

// ### 3. Community Engagement
// - [ ] Engage persons with disabilities in planning process
// - [ ] Conduct focus group discussions with disability community
// - [ ] Establish feedback mechanisms
// - [ ] Train community volunteers on disability inclusion
// - [ ] Create awareness campaigns on inclusive WASH

// ## Implementation Phase

// ### 4. Construction and Setup
// - [ ] Follow universal design principles
// - [ ] Install appropriate handrails and support structures
// - [ ] Ensure adequate lighting for persons with visual impairments
// - [ ] Create tactile indicators and signage
// - [ ] Test accessibility with persons with disabilities

// ### 5. Service Delivery
// - [ ] Train staff on disability awareness and etiquette
// - [ ] Provide assistance when requested
// - [ ] Ensure hygiene materials are accessible
// - [ ] Adapt information materials for different communication needs
// - [ ] Monitor usage by persons with disabilities

// ## Monitoring and Evaluation

// ### 6. Data Collection
// - [ ] Disaggregate data by disability status
// - [ ] Track accessibility improvements
// - [ ] Monitor satisfaction levels
// - [ ] Document lessons learned
// - [ ] Report on inclusion indicators

// ### 7. Continuous Improvement
// - [ ] Regular accessibility audits
// - [ ] Update facilities based on feedback
// - [ ] Strengthen partnerships with disability organizations
// - [ ] Share best practices with other programs
// - [ ] Advocate for policy changes when needed`,
//         language: "english",
//         accessible: true,
//       },
//       {
//         id: 4,
//         name: "Accessible Facility Design Examples",
//         type: "image",
//         size: "2.8 MB",
//         url: "/placeholder.svg?height=800&width=1200&text=Accessible+WASH+Facility+Design",
//         description:
//           "Visual examples of accessible WASH facility designs and layouts",
//         dimensions: "1200x800",
//         language: "visual",
//         accessible: true,
//         altText:
//           "Diagram showing accessible WASH facility design with ramps, handrails, and appropriate dimensions for wheelchair access",
//       },
//       {
//         id: 5,
//         name: "বাংলা নির্দেশিকা",
//         type: "pdf",
//         size: "3.5 MB",
//         url: "https://www.w3.org/WAI/WCAG21/wcag2.1.pdf",
//         description:
//           "প্রতিবন্ধী-অন্তর্ভুক্তিমূলক ওয়াশ প্রোগ্রামের জন্য বাংলা নির্দেশিকা",
//         pages: 48,
//         language: "bangla",
//         accessible: true,
//       },
//     ],
//   },
// };

export default function ResourceDetailPage() {

  return (
    <div>
      <ResourceDetails />
    </div>
  );
}
