import React from 'react';
import { memberList } from '../helper/memberList';
import { AboutUs } from '../components/AboutUs';

const AboutUsPage = () => {
  return (
    <div className="about_us_box">
      <div className="about_us_box_header"> </div>
      <section className="about_us_box_main">
        {memberList.map((item) => (
          <AboutUs name={item.name} position={item.position} info={item.info} />
        ))}
      </section>
    </div>
  );
};

export default AboutUsPage;
