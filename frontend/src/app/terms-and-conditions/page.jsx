import AnimatedText from '@/components/AnimatedText';
import { Solutions } from '@/components/Solutions';
import React from 'react'

const TermsAndConditionsPAge = () => {
  return (
    <div className='p-2 md:p-16'>
      <TermsAndConditions />
    </div>
  )
}

export default TermsAndConditionsPAge;

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center">AptTrack Terms and Conditions</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 ">Introduction</h2>
        <p className="">
          Welcome to AptTrack, a comprehensive platform designed to support Housing Stabilization Services (HSS) and streamline operations for agencies. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Compliance and Accuracy</h2>
        <p className="">
          All information provided by AptTrack is thoroughly reviewed to ensure clarity and accuracy. However, AptTrack cannot guarantee that all material is up to date or compliant with applicable laws. Health care laws, including but not limited to HIPAA and state, national, or local privacy laws, are constantly changing. By using the information provided, you agree not to hold AptTrack liable for any inaccuracies, omissions, or errors in any information provided.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">User Responsibilities</h2>
        <ul className="list-disc list-inside ">
          <li className="mb-2">
            <strong>Use of Platform:</strong> You agree to use AptTrack in compliance with all applicable laws and regulations. Unauthorized use of the platform is strictly prohibited.
          </li>
          <li className="mb-2">
            <strong>Data Security:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
          </li>
          <li className="mb-2">
            <strong>Accuracy of Information:</strong> You agree to provide accurate, current, and complete information when using the platform. You are responsible for the accuracy of the data entered into the platform.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">HIPAA Compliance</h2>
        <ul className="list-disc list-inside ">
          <li className="mb-2">
            <strong>Protected Health Information (PHI):</strong> AptTrack is designed to comply with the Health Insurance Portability and Accountability Act (HIPAA) requirements. We implement industry-standard practices to safeguard PHI.
          </li>
          <li className="mb-2">
            <strong>Data Encryption:</strong> All PHI stored on AptTrack is encrypted to ensure the highest level of security and confidentiality.
          </li>
          <li className="mb-2">
            <strong>Access Control:</strong> Only authorized users with appropriate permissions can access PHI. Role-based access controls are implemented to ensure compliance with HIPAA standards.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Liability</h2>
        <ul className="list-disc list-inside ">
          <li className="mb-2">
            <strong>Limitation of Liability:</strong> AptTrack shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of AptTrack, even if we have been advised of the possibility of such damages.
          </li>
          <li className="mb-2">
            <strong>Indemnification:</strong> You agree to indemnify and hold harmless AptTrack from any claims, damages, liabilities, and expenses (including reasonable attorneys' fees) arising out of your use of the platform, your violation of these terms, or your violation of any rights of another.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Changes to Terms and Conditions</h2>
        <p className="">
          AptTrack reserves the right to modify these terms and conditions at any time. We will notify you of any changes by posting the new terms and conditions on our website. Your continued use of the platform after such modifications will constitute your acknowledgment of the modified terms and your agreement to abide by them.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
        <p className="">
          These terms and conditions are governed by and construed in accordance with the laws of the State of Minnesota, without regard to its conflict of law principles.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Contact Information</h2>
        <p className="">
          If you have any questions about these terms and conditions, please contact us at: AptTrack [Contact Information]
        </p>
      </section>
      <p className=" mt-4">
        By using AptTrack, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
      </p>
    </div>
  );
};
