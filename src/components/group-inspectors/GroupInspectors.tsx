"use client"
import React, { useEffect, useState } from 'react'
import { GroupInspectorsTable } from './group-inspectors-table/GroupInspectorsTable'
import GroupInspectorsFilter from './group-inspectors-filter/GroupInspectorsFilter'
import { searchGroupInspectors } from '@/actions/api';
import { useAppDispatch } from '@/redux/hooks';
import { getGroupInspectors } from '@/redux/features/GroupInspectorsSlice';
type Dropdowns = {
  venueDropdown: any; // replace with the actual type
  inspectorsDropdown: any; // replace with the actual type
}
type VenuesProps = {
  dropdowns: Dropdowns;
}

interface FormData {
  venue: string;
  inspector: string;
}
const GroupInspectors: React.FC<VenuesProps> = ({ dropdowns }) => {
  const dispatch = useAppDispatch()
  const [groupInspectorsData, setGroupInspectorsData] = useState([])
  const [isloading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    venue: 'All',
    inspector: 'All'
  });
  const onChange = (value: any, name: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  useEffect(() => {
    const obj = {
      venueId: 'All',
      inspectorEmployeeNumber: 'All',
      is_It: '1'
    }
    dispatch(getGroupInspectors(obj))

  }, []);
  const handelSubmit = (event: any) => {
    const obj: any = {
      venueId: 'All',
      inspectorEmployeeNumber: 'All',
      is_It: '1'
    }
    Object.keys(obj).forEach(key => {
      obj[key] = String(obj[key]);
    });
    dispatch(getGroupInspectors(obj))
  }
  return (
    <div>
      <GroupInspectorsFilter
        dropdowns={dropdowns}
        handelSubmit={handelSubmit}
        onChange={onChange}
        formData={formData}

      />
      <GroupInspectorsTable
        venues={dropdowns.venueDropdown}
        // isloading={isloading}
        // groupInspectorsData={groupInspectorsData}
      />
    </div>
  )
}

export default GroupInspectors

