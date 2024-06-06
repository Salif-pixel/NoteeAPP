import React, { useEffect } from 'react';
import { Table } from '../../layout/widget/table';
import { useNavigate } from 'react-router-dom';



function User({user, setuser ,Users, setUsers, fetched,loading}) {
  
    return (
        <div className='w-full h-[calc(100vh)] h-full bg-blue-gray-50/50'>
           <Table currentuser={user} Users={Users} setUsers={setUsers} loading={loading} fetched={fetched} setcurrentuser={setuser}/>
        </div>
    );
}

export default User;