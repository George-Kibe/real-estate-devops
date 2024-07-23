import AnimatedText from '@/components/AnimatedText';
import React from 'react'
import casestudies from '../../../data/casestudies';

const CaseStudiesPage = () => {
  return (
    <div>
      <AnimatedText text={"Case Studies"} />
      {
        casestudies.map((caseStudy, index) => (
          <CaseStudyCard key={index}index={index} caseStudy={caseStudy} />
        ))
      }
    </div>
  )
}

export default CaseStudiesPage;

const Testimonials = () => {
    return (
        <div>
          <AnimatedText text={"Case Studies"} />
        </div>
    )
}


const CaseStudyCard = ({ caseStudy, index }) => {
  return (
    <div className="max-w-6xl mx-auto p-6  shadow-lg rounded-lg my-8">
      <h2 className="text-2xl font-bold mb-4">Case Study {caseStudy.caseStudy}{index+1}: {caseStudy.title}</h2>
      <p className=" mb-2"><span className="font-semibold">Client:</span> {caseStudy.client}</p>
      <p className=" mb-4"><span className="font-semibold">Challenge:</span> {caseStudy.challenge}</p>
      <p className=" mb-4"><span className="font-semibold">Solution:</span> {caseStudy.solution}</p>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Results:</h3>
        <ul className="list-disc list-inside">
          {Object.entries(caseStudy.results).map(([key, value], index) => (
            <li key={index}><span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
