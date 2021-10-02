import React, { Fragment } from 'react';

const getUser = (account, address) => {
  try {
    return parseInt(account) === parseInt(address);
  } catch (error) {
    return false;
  }
};

export default function WaveItem({ account, sent, wave }) {
  const myMessage = getUser(account, wave.address);

  return (
    <Fragment>
      <div className={`track-list-item mt-4 ${myMessage ? 'personal' : ''} ${sent ? '' : ''}`}>
        <div className="d-flex justify-content-between align-items-start position-relative mb-0">
          <span className="message">{wave.message}</span>

          <span className="time">{wave.timestamp.toString()}</span>
        </div>
      </div>

      <style jsx="true">{`
        .track-list-item {
          max-width: 90%;
          width: max-content;
          height: fit-content;
        
          background: var(--bg-second-color);
          border-radius: 9px;
          padding: 3px 8px;
        
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        } 

        .track-list-item.personal {
          margin-left: auto;
          background: var(--blue-color);
          color: #EAEDF2;
        }
        
        .track-list-item span.message {
          width: 100%;
          max-width: 100%;
          word-wrap: break-word;
        }

        .track-list-item span.time {
          min-width: max-content;
          font-size: 11px;
          opacity: 0.75;
          position: absolute;
          left: -7px;
          top: -18px;
        }

        .track-list-item.personal span.time {
          left: auto;
          right: -7px;
          color: var(--tx-main-color);
        }

        @media (max-width: 767.98px) {
        }

        @media (max-width: 575.98px) {
          .track-list-item .user-info .name {
            font-size: 13px;
          }
        }        
      `}</style>
    </Fragment>
  );
}
