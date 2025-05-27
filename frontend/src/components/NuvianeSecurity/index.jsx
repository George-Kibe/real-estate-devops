import { Dot } from "lucide-react";

const securityFeatures = [
  {
    "id": 1,
    "title": "HIPAA & HITRUST Compliant",
    "intro": "Certified for safety. trusted for care.",
    "description": "Nuviane meets the rigorous standards of HIPAA and is certified through the HITRUST CSF framework—ensuring your practice stays fully compliant with the highest benchmarks for data protection in healthcare."
  },
  {
    "id": 2,
    "title": "Advanced Encryption & Bank-Level Security",
     "intro": "With encryption--at rest and in transit",
    "description": "With end-to-end encryption, multi-layered firewalls, and SSL protocols, Nuviane protects sensitive data whether it’s stored, accessed, or shared. Our security architecture mirrors that used by leading financial institutions."
  },
  {
    "id": 3,
    "title": "24/7 Monitored Secure Servers",
    "intro": "Your data stays protected--day and night.",
    "description": "Nuviane servers are housed in highly secured facilities monitored 24/7/365 with biometric access controls and redundant power sources to ensure nonstop uptime and physical security."
  },
  {
    "id": 4,
    "title": "Simplified Login with 2-Factor Authentication",
    "intro": "Access control, made simple and secure",
    "description": "Enable 2-step verification across all accounts. Manage password security, contact details, and user roles directly from a centralized security dashboard."
  },
  {
    "id": 5,
    "title": "Routine Vulnerability Testing",
     "intro": "We test so you stay protected.",
    "description": "Nuviane conducts automated and manual security testing—including third-party audits—to defend against emerging threats such as cross-site scripting, SQL injection, and other malicious attacks."
  },
  {
    "id": 6,
    "title": "Built for Solo Practitioners & Group Practices",
    "intro": "Whether you are a solo provider or a growing team, Nuviane scales securely.",
    "description": "Our platform is optimized for mental health professionals, social workers, nutritionists, and other care providers who prioritize client confidentiality."
  },
  {
    "id": 7,
    "title": "Business Associate Agreement (BAA) Included",
    "intro": "Secure partnerships, from day one",
    "description": "Every Nuviane account comes with a Business Associate Agreement to maintain HIPAA compliance and protect your clients’ data from the very first login."
  }
]


export default function NuvianeSecurity() {
  return (
    <section className="w-full text-[#0B2B5F] bg-[#F1F1F1] p-4 md:p-16">
      <div className="text-[#0B2B5F] relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />

        <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          EHR Security You Can Trust with Nuviane <br />
        </h2>
        <h2 className="text-center mb-4 md:mb-8">Every apartment search, every landlord reply. Every client action preserved forever in excel. Confidently protect client health information with enterprise-grade safeguards built into every layer of the Nuviane platform.</h2>
      </div>

      <div className="flex flex-wrap">
        {
          securityFeatures.slice(0,3).map((feature, index) => (
            <div key={feature.id} class="w-full px-4 md:w-1/2 lg:w-1/3 gap-2">
              <div className="bg-white p-4 rounded-xl">
                <h2 className="text-2xl font-bold">{feature.title}</h2>
                <p className="text-xl mt-4">{feature.intro}</p>
                <p className="mt-4">{feature.description}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className="flex flex-wrap mt-4 md:mt-8 ">
        {
          securityFeatures.slice(3,5).map((feature, index) => (
            <div key={feature.id} class="w-full px-4 md:w-1/2 gap-2">
              <div className="bg-white p-4 rounded-xl">
                <h2 className="text-2xl font-bold">{feature.title}</h2>
                <p className="text-xl mt-4">{feature.intro}</p>
                <p className="mt-4">{feature.description}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className="flex flex-wrap mt-4 md:mt-8 ">
        {
          securityFeatures.slice(5,7).map((feature, index) => (
            <div key={feature.id} class="w-full px-4 md:w-1/2 gap-2">
              <div className="bg-white p-4 rounded-xl">
                <h2 className="text-2xl font-bold">{feature.title}</h2>
                <p className="text-xl mt-4">{feature.intro}</p>
                <p className="mt-4">{feature.description}</p>
              </div>
            </div>
          ))
        }
      </div>
      
      <div className="mb-4 grid grid-cols-2 p-4 md:p-16 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
        <figure className="max-w-2xl">
          <img
            className="max-h-[45rem] max-md:max-w-[90%] max-md:justify-self-center"
            src={"/pictures/hipaa.png"}
            alt="Smart Organization graphic"
          />
        </figure>
        <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
          <p className="mb-8 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
            Why Providers Trust Nuviane
          </p>
          <div className="gap-6 ">
              <p className="mt-2 flex"><Dot /> Fully HIPAA and HITRUST certified </p>
              <p className="mt-2 flex "><Dot />Continuous monitoring and threat detection </p>
              <p className="mt-2 flex "> <Dot />Easy-to-use client data controls</p>
              <p className="mt-2 flex "> <Dot />Reliable uptime and encrypted backups</p>
              <p className="mt-2 flex "> <Dot />2FA and access permission settings</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
