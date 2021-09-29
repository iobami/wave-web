import React, { Fragment } from 'react';

export default function Checked({ id }) {

  return (
    <Fragment>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.5" fill="#50D86A" stroke="#50D86A" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75356 13.4999C8.59256 13.4999 8.43856 13.4334 8.32831 13.3162L5.49156 10.2951C5.27047 10.0606 5.28272 9.69134 5.51722 9.47084C5.75231 9.25034 6.12156 9.26201 6.34147 9.49651L8.74773 12.0579L13.6524 6.69009C13.8706 6.45151 14.2392 6.43576 14.4772 6.65276C14.7146 6.86976 14.731 7.23901 14.514 7.47642L9.18406 13.3098C9.07498 13.4299 8.91981 13.4988 8.75764 13.4999H8.75356Z" fill="white" />
        <mask id={`Checked${id}`} mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="6" width="10" height="8">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75356 13.4999C8.59256 13.4999 8.43856 13.4334 8.32831 13.3162L5.49156 10.2951C5.27047 10.0606 5.28272 9.69134 5.51722 9.47084C5.75231 9.25034 6.12156 9.26201 6.34147 9.49651L8.74773 12.0579L13.6524 6.69009C13.8706 6.45151 14.2392 6.43576 14.4772 6.65276C14.7146 6.86976 14.731 7.23901 14.514 7.47642L9.18406 13.3098C9.07498 13.4299 8.91981 13.4988 8.75764 13.4999H8.75356Z" fill="white" />
        </mask>
        <g mask={`url(#Checked${id})`}>
          <rect x="3" y="3" width="14" height="14" fill="white" />
        </g>
      </svg>
    </Fragment>
  );
}
