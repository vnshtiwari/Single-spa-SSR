import React, { Suspense } from "react";
import InsuranceForLife from "./InsuranceForLife";
import YourGoal from "./yourGoal";
import WhatsHot from "./whatsHot";
import PersonalizedInsight from "./personalizedInsight";
import OurPurpose from "./OurPurpose";
import "../styles/HomeMainPage.css";
const Footer = React.lazy(() => import("AppFooter/Footer"));

export default function HomeMainPage() {
  return (
    <div className="home">
      <OurPurpose />
      <Suspense fallback={<p>loading...</p>}>
        <Footer />
      </Suspense>
      <YourGoal />
      {/* <Testimonial/> */}
      <div style={{ height: 50 }}></div>
      <InsuranceForLife />
      <WhatsHot />
      <PersonalizedInsight />
    </div>
  );
}
