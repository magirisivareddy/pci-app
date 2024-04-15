"use client"

import React, { useEffect } from 'react'
import MissedInspectionFilter from './MissedInspectionFilter'
import MissedInspectionTable from './MissedInspectionTable'
import { useAppDispatch } from '@/redux/hooks'
import { getInspectors, getVenue } from '@/redux/features/CommonSlice'

const MissedInspection = () => {
    const dispatch =useAppDispatch()
  const handelSubmit = () => { }
  const data=[
    {
      "venue_id": "153",
      "venue_name": "Banquets",
      "formattedDatetime": "2024-04-13T00:00:00",
      "dateDifference": 1,
      "weekNumber": "11",
      "inpsectorLastName": "Peltier",
      "inpsectorFirstName": "Kelsey",
      "totalDevices": 1,
      "inspector_enumber": 6896,
      "reportId": 0,
      "inspected": 0,
      "failed": 0,
      "questionable": 0,
      "resolutionFailed": 0,
      "resolutionQuestionable": 0,
      "reportDateTime": "03/16/2024 08:30 PM",
      "status": "To be inspected within the present week.",
      "title": " title=\"To be inspected within 144 hours\" width=22px alt=144"
    },
    {
      "venue_id": "150",
      "venue_name": "Aalpha ",
      "formattedDatetime": "2024-04-13T00:00:00",
      "dateDifference": 1,
      "weekNumber": "12",
      "inpsectorLastName": "Cappellano",
      "inpsectorFirstName": "John",
      "totalDevices": 1,
      "inspector_enumber": 60446,
      "reportId": 0,
      "inspected": 0,
      "failed": 0,
      "questionable": 0,
      "resolutionFailed": 0,
      "resolutionQuestionable": 0,
      "reportDateTime": "03/23/2024 08:30 PM",
      "status": "To be inspected within the present week.",
      "title": " title=\"To be inspected within 144 hours\" width=22px alt=144"
    },

    {
      "venue_id": "126",
      "venue_name": "Aarka Sports",
      "formattedDatetime": "2024-04-13T00:00:00",
      "dateDifference": 1,
      "weekNumber": "13",
      "inpsectorLastName": "Piper",
      "inpsectorFirstName": "Kinsey",
      "totalDevices": 5,
      "inspector_enumber": 8586,
      "reportId": 0,
      "inspected": 0,
      "failed": 0,
      "questionable": 0,
      "resolutionFailed": 0,
      "resolutionQuestionable": 0,
      "reportDateTime": "03/30/2024 08:30 PM",
      "status": "To be inspected within the present week.",
      "title": " title=\"To be inspected within 144 hours\" width=22px alt=144"
    },
    {
      "venue_id": "101",
      "venue_name": "Accounting - AC",
      "formattedDatetime": "2024-04-13T00:00:00",
      "dateDifference": 1,
      "weekNumber": "14",
      "inpsectorLastName": "Marchand",
      "inpsectorFirstName": "Tyson",
      "totalDevices": 9,
      "inspector_enumber": 11737,
      "reportId": 0,
      "inspected": 0,
      "failed": 0,
      "questionable": 0,
      "resolutionFailed": 0,
      "resolutionQuestionable": 0,
      "reportDateTime": "04/06/2024 08:30 PM",
      "status": "To be inspected within the present week.",
      "title": " title=\"To be inspected within 144 hours\" width=22px alt=144"
    }
  ]
  useEffect(() => {
    dispatch(getVenue())
    dispatch(getInspectors())
}, []);
  return (
    <>
      <MissedInspectionFilter
        handelSubmit={handelSubmit} />
      <MissedInspectionTable data={data} />
    </>
  )
}

export default MissedInspection