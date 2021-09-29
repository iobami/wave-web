import React, { Fragment } from 'react';

export default function Pause({ id }) {

  return (
    <Fragment>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.9995 15C15.9995 15.55 15.5495 16 14.9995 16C14.4495 16 13.9995 15.55 13.9995 15V9C13.9995 8.45 14.4495 8 14.9995 8C15.5495 8 15.9995 8.45 15.9995 9V15ZM9.9995 15C9.9995 15.55 9.5495 16 8.9995 16C8.4495 16 7.9995 15.55 7.9995 15V9C7.9995 8.45 8.4495 8 8.9995 8C9.5495 8 9.9995 8.45 9.9995 9V15ZM11.9995 2C6.4855 2 1.9995 6.486 1.9995 12C1.9995 17.514 6.4855 22 11.9995 22C17.5145 22 21.9995 17.514 21.9995 12C21.9995 6.486 17.5145 2 11.9995 2Z" fill="currentColor" />
        <mask id={`Pause${id}`} mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="2" width="21" height="20">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.9995 15C15.9995 15.55 15.5495 16 14.9995 16C14.4495 16 13.9995 15.55 13.9995 15V9C13.9995 8.45 14.4495 8 14.9995 8C15.5495 8 15.9995 8.45 15.9995 9V15ZM9.9995 15C9.9995 15.55 9.5495 16 8.9995 16C8.4495 16 7.9995 15.55 7.9995 15V9C7.9995 8.45 8.4495 8 8.9995 8C9.5495 8 9.9995 8.45 9.9995 9V15ZM11.9995 2C6.4855 2 1.9995 6.486 1.9995 12C1.9995 17.514 6.4855 22 11.9995 22C17.5145 22 21.9995 17.514 21.9995 12C21.9995 6.486 17.5145 2 11.9995 2Z" fill="currentColor" />
        </mask>
        <g mask={`url(#Pause${id})`}>
          <rect width="24" height="24" fill="currentColor" />
        </g>
      </svg>
    </Fragment>
  );
}
