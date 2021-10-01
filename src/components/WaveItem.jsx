import React, { Fragment } from 'react';

const getUser = (account, address) => {
  try {
    return parseInt(account) === parseInt(address);
  } catch (error) {
    return false;
  }
};

export default function WaveItem({ account, wave }) {
  const myMessage = getUser(account, wave.address);

  return (
    <Fragment>
      <div className={`track-list-item mt-3 ${myMessage ? 'personal' : ''}`}>
        <div className="d-flex justify-content-between align-items-start mb-0">
          {wave.message}

          <span className="time">{wave.timestamp.toString()}</span>
        </div>
      </div>

      <style jsx="true">{`
        .track-list-item {
          width: 90%;
          height: fit-content;
        
          background: var(--bg-second-color);
          border-radius: 15px;
          padding: 20px;
        
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }  

        .track-list-item.personal {
          margin-left: auto;
          background: var(--blue-color);
          color: #EAEDF2;
        }
        
        .track-list-item span.time {
          min-width: max-content;
          font-size: 12px;
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
