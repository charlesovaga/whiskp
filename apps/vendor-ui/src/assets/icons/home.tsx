import React from "react";

const Home = ({fill} : {fill?: string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
     className="nextui-c-PJLV nextui-c-PJLV-ibxboXQ-css"
    >
     <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM12.5 2H9.5C8.67 2 8 2.67 8 3.5V12C8 13.1 8.9 14 10 14H16C17.1 14 18 13.1 18 12V3.5C18 2.67 17.33 2 16.5 2H13.5C12.67 2 12 2.67 12 3.5V6H14V4H16V12H10V4H12V6H14V8H16V12H10V8H8V12H6V4H8V6H10V8H12V6H14V4H16V6H18V4H20V12C20 13.1 19.1 14 18 14H10C8.9 14 8 13.1 8 12V4C8 2.9 8.9 2 10 2H12.5Z"
        fill={fill}
        className="nextui-c-PJLV">
        </path>
    </svg>
  );
}
export default Home;