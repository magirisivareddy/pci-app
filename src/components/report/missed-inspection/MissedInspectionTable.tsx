import React from 'react'

import { Tooltip } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomTable from '@/components/common/table/Table';
type Header = {
    id: string;
    label: string;
    customRender?: (_value: any, row: any) => JSX.Element;
    width: string
  
  };


const MissedInspectionTable = ({data}:any) => {
    const missedInspectionsTableHeaders: Header[] = [
        {
          id: 'status',
          label: 'Status',
          width: "100px",
          customRender: (value: any, row: any): JSX.Element => {
            const extractedTitle = row.title.match(/title="([^"]+)"/);
            const tooltipTitle = extractedTitle ? extractedTitle[1] : '';
    
            return (
              <span>
                <Tooltip title={"Was not inspected"}>
                <CloseRoundedIcon color='error' />
              </Tooltip>
              </span>
            )
          }
        },
    
    
    
        { id: 'reportId', label: 'Report Id', width: "100px", },
        { id: 'weekNumber', label: 'Week', width: "100px", },
        {
          id: 'reportDateTime', label: 'Report Date', width: "100px",
        },
        { id: 'venue_name', label: 'Venue', width: "100px", },
        {
          id: 'inspector Employee',
          label: 'Inspector Employee', width: "100px",
          customRender: (value: any, row: any): JSX.Element => {
            const name = `${row.inpsectorLastName} ${row.inpsectorFirstName}`;
    
            return (
              name.trim() !== '' ? (
                <span>{name} {row.inspector_enumber}</span>
              ) : (
                <span style={{ color: "#F00" }}>
                  {row.venue_name !== "SPARE DEVICES" &&
                    row.venue_name !== "ARCHIVED DEVICES" &&
                    row.venue_name !== "IT STORAGE" &&
                    (row.inspector_enumber === 0)
                    ? "No Main Inspector assigned"
                    : ""}
                </span>
              )
            );
          }
    
        },
        { id: 'totalDevices', label: 'Total Devices', width: "100px", },
      
      
      ];
  return (
    <CustomTable data={data} headers={missedInspectionsTableHeaders}/>
  )
}

export default MissedInspectionTable