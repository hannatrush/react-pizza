import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="425" y="541" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="267" rx="10" ry="10" width="280" height="20" /> 
    <rect x="0" y="306" rx="10" ry="10" width="280" height="80" /> 
    <rect x="0" y="410" rx="10" ry="10" width="95" height="30" /> 
    <rect x="127" y="401" rx="25" ry="25" width="152" height="45" /> 
    <circle cx="135" cy="130" r="120" />
  </ContentLoader>
)
export default Skeleton;