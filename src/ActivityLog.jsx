import React from 'react'

const ActivityLog = () => {
  let activities = [];

  const localStorageLog = JSON.parse(localStorage.getItem('cogoReactLog'));
  if (localStorageLog && localStorageLog.activity.length > 0) activities = localStorageLog.activity;

  return (
    <div className='px-[10vw] py-8'>
      <table className="table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className='border border-slate-500 px-8 py-2'>Time</th>
            <th className='border border-slate-500 px-8 py-2'>Activity Type</th>
            <th className='border border-slate-500 px-8 py-2'>Activity Description</th>
          </tr>
        </thead>
        <tbody>
          {
            activities.map(activity => {
              let description = <></>;
              switch (activity.activityType) {
                case "add":
                  description = <>Todo <b>"{activity.todo}"</b> added</>;
                  break;
                case "edit":
                  description = <>Todo <b>"{activity.todo}"</b> edited</>;
                  break;
                case "delete":
                  description = <>Todo <b>"{activity.todo}"</b> deleted</>;
                  break;
                case "done":
                  description = <>Todo <b>"{activity.todo}"</b> marked as Done</>;
                  break;
                case "undone":
                  description = <>Todo <b>"{activity.todo}"</b> marked as Undone</>;
                  break;
              }

              return (<tr>
                <td className='border border-slate-500 px-8 py-2'>{activity.time}</td>
                <td className='border border-slate-500 px-8 py-2 uppercase'>{activity.activityType}</td>
                <td className='border border-slate-500 px-8 py-2'>{description}</td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ActivityLog