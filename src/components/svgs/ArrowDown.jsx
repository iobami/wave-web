import React, { Fragment } from 'react';

export default function ArrowDown() {

  return (
    <Fragment>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 16C11.772 16 11.545 15.923 11.36 15.768L5.36003 10.768C4.93603 10.415 4.87803 9.784 5.23203 9.36C5.58503 8.936 6.21503 8.879 6.64003 9.232L12.011 13.708L17.373 9.393C17.803 9.047 18.433 9.115 18.779 9.545C19.125 9.975 19.057 10.604 18.627 10.951L12.627 15.779C12.444 15.926 12.222 16 12 16Z" fill="#231F20" />
        <mask id="ArrowDown" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="9" width="14" height="7">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 16C11.772 16 11.545 15.923 11.36 15.768L5.36003 10.768C4.93603 10.415 4.87803 9.784 5.23203 9.36C5.58503 8.936 6.21503 8.879 6.64003 9.232L12.011 13.708L17.373 9.393C17.803 9.047 18.433 9.115 18.779 9.545C19.125 9.975 19.057 10.604 18.627 10.951L12.627 15.779C12.444 15.926 12.222 16 12 16Z" fill="white" />
        </mask>
        <g mask="url(#ArrowDown)">
          <rect width="24" height="24" fill="#5F5F6E" />
        </g>
      </svg>
    </Fragment>
  );
}
