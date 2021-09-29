import React, { Fragment } from 'react';

export default function Person( {id }) {

  return (
    <Fragment>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Icon/Fill/person">
          <path id="Mask" fillRule="evenodd" clipRule="evenodd" d="M16 7C16 9.206 14.206 11 12 11C9.794 11 8 9.206 8 7C8 4.794 9.794 3 12 3C14.206 3 16 4.794 16 7ZM19 20C19 20.552 18.553 21 18 21H6C5.447 21 5 20.552 5 20C5 16.14 8.141 13 12 13C15.859 13 19 16.14 19 20Z" fill="#231F20" />
          <mask id={`Person${id}`} mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="3" width="14" height="18">
            <path id="Mask_2" fillRule="evenodd" clipRule="evenodd" d="M16 7C16 9.206 14.206 11 12 11C9.794 11 8 9.206 8 7C8 4.794 9.794 3 12 3C14.206 3 16 4.794 16 7ZM19 20C19 20.552 18.553 21 18 21H6C5.447 21 5 20.552 5 20C5 16.14 8.141 13 12 13C15.859 13 19 16.14 19 20Z" fill="white" />
          </mask>
          <g mask={`url(#Person${id})`}>
            <g id="&#240;&#159;&#142;&#168; Color">
              <rect id="Base" width="24" height="24" fill="currentColor" />
            </g>
          </g>
        </g>
      </svg>
    </Fragment>
  );
}
