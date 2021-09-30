import React, { Fragment } from 'react';

export default function WaveItem({ wave }) {

  return (
    <Fragment>
      <div className="track-list-item mt-3">
        <div className="d-flex justify-content-between align-items-start user-info mb-0">
          <div className="">
            <div>Address: {wave.address}</div>
            <div>Time: {wave.timestamp.toString()}</div>
            <div>Message: {wave.message}</div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .track-list-item {
          width: 100%;
          height: fit-content;
        
          background: var(--bg-second-color);
          border-radius: 15px;
          padding: 20px;
        
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .track-list-item .user-info {
          margin-bottom: 20px;
        }

        .track-list-item .user-info .avatar {
          width: 50px;
          max-width: 50px;
          height: 50px;
          max-height: 50px;
          object-fit: cover;
          border-radius: 50%;
        }
        
        .track-list-item .user-info .name {
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
        }
        
        .track-list-item img.track-image {
          height: 180px;
          min-height: 180px;
          max-height: 180px;
          width: 100%;
          max-width: 100%;
        
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 20px;
        }

        @media (max-width: 767.98px) {
          .track-list-item .user-info {
            margin-bottom: 15px;
          }
        
          .track-list-item img.track-image {
            height: 145px;
            min-height: 145px;
            max-height: 145px;
          
            margin-bottom: 15px;
          }
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
