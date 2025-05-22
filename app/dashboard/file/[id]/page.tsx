import React from 'react'

const ChatfilePage = ({params}:{params:{id:string}}) => {
    const fileId=params.id;
  return (
    <div className='grid grid-cols-5 h-full  overflow-hidden'>
        <div className='col-sapn-5 lg:col-span-2 overflow-y-auto'>
            Chat            
        </div>
        <div className='col-span-5 lg:col-span-3 bg-gray-100 border-r-2 border-amber-800 overflow-auto lg:-order-1'>
            PDF view 
        </div>

    </div>
  )
}

export default ChatfilePage