import React, { Fragment } from 'react';

export default function Question({ id }) {

  return (
    <Fragment>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13 12.8369V13.9999C13 14.5529 12.553 14.9999 12 14.9999C11.447 14.9999 11 14.5529 11 13.9999V11.9999C11 11.4469 11.447 10.9999 12 10.9999C12.827 10.9999 13.5 10.3269 13.5 9.4999C13.5 8.6729 12.827 7.9999 12 7.9999C11.173 7.9999 10.5 8.6729 10.5 9.4999C10.5 10.0529 10.053 10.4999 9.5 10.4999C8.947 10.4999 8.5 10.0529 8.5 9.4999C8.5 7.5699 10.07 5.9999 12 5.9999C13.93 5.9999 15.5 7.5699 15.5 9.4999C15.5 11.0799 14.44 12.4029 13 12.8369ZM12 17.9999C11.447 17.9999 11 17.5529 11 16.9999C11 16.4469 11.447 15.9999 12 15.9999C12.553 15.9999 13 16.4469 13 16.9999C13 17.5529 12.553 17.9999 12 17.9999ZM12 1.9999C6.486 1.9999 2 6.4859 2 11.9999C2 17.5139 6.486 21.9999 12 21.9999C17.514 21.9999 22 17.5139 22 11.9999C22 6.4859 17.514 1.9999 12 1.9999Z" fill="#231F20" />
        <mask id={`Question${id}`} mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
          <path fillRule="evenodd" clipRule="evenodd" d="M13 12.8369V13.9999C13 14.5529 12.553 14.9999 12 14.9999C11.447 14.9999 11 14.5529 11 13.9999V11.9999C11 11.4469 11.447 10.9999 12 10.9999C12.827 10.9999 13.5 10.3269 13.5 9.4999C13.5 8.6729 12.827 7.9999 12 7.9999C11.173 7.9999 10.5 8.6729 10.5 9.4999C10.5 10.0529 10.053 10.4999 9.5 10.4999C8.947 10.4999 8.5 10.0529 8.5 9.4999C8.5 7.5699 10.07 5.9999 12 5.9999C13.93 5.9999 15.5 7.5699 15.5 9.4999C15.5 11.0799 14.44 12.4029 13 12.8369ZM12 17.9999C11.447 17.9999 11 17.5529 11 16.9999C11 16.4469 11.447 15.9999 12 15.9999C12.553 15.9999 13 16.4469 13 16.9999C13 17.5529 12.553 17.9999 12 17.9999ZM12 1.9999C6.486 1.9999 2 6.4859 2 11.9999C2 17.5139 6.486 21.9999 12 21.9999C17.514 21.9999 22 17.5139 22 11.9999C22 6.4859 17.514 1.9999 12 1.9999Z" fill="white" />
        </mask>
        <g mask={`url(#Question${id})`}>
          <rect width="24" height="24" fill="currentColor" />
        </g>
      </svg>
    </Fragment>
  );
}
