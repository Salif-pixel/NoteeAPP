import React, { useEffect } from 'react';
import { Table } from '../../layout/widget/table';
import { useNavigate } from 'react-router-dom';



function User({user, setuser}) {
  
    return (
        <div className='w-full h-[calc(100vh)] h-full bg-blue-gray-50/50'>
           <Table currentuser={user} setcurrentuser={setuser}/>
        </div>
    );
}

export default User;