import React from 'react';

const HomeLinks = () => {
  return (
    <div className="">
      <SingleItem />
      <SingleItem  reverse={true}/>
    </div>
  );
};

export default HomeLinks;

const SingleItem = ({ reverse }) => {
  return (
    <div className="container mx-auto p-2 ">
        <div className={`rounded-lg shadow-lg overflow-hidden md:flex md:items-center ${reverse?  'flex-row-reverse' : ''} `}>
            <img className="w-full object-cover self-center m-2 md:p-4 md:w-1/3 md:h-full" src="/images/1.jpg" alt="Placeholder Image" />
            <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Title Goes Here</h2>
                <p className="mb-4">This is some placeholder content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
                <p className="text-sm">Bottom text goes here.</p>
            </div>
        </div>
    </div>
  )
};