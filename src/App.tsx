import { useEffect, useState } from 'react'

interface Activity {
  title: string;
  complete: boolean;
}

function App() {
  const [activity, setActivity] = useState<string>("")
  const [activityList, setActivityList] = useState<Activity[]>([])
  // const [showCompletedList, setShowCompletedList] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0); // 0 all 1 incomplete 2 complete

  const addActivityList = (activity:string):void => {
    if(activity) {
      setActivityList(prev => [...prev, {title: activity, complete: false}])
      setActivity("")
    }
  }

  const removeActivity = (index:number):void => {
    const result = activityList.filter((_, idx)=>{
      return idx !== index
    })
    setActivityList(result)
  }

  const changeActivityStatus = (index:number):void => {
    setActivityList(prev => prev.map((activity,idx)=>
      idx === index ? {...activity, complete: true} : activity
    ))
  }

  // const showCompleted = () => {
  //   setShowCompletedList(true);
  // }

  // const showIncompleted = () => {
  //   setShowCompletedList(false);
  // }
  
  // const showTab = (index: number) => {
  //   setTab(index)
  // }

  // useEffect(()=>{
  //  console.log("Hi from useEffect") 
  // }, [activityList])

  useEffect(()=>{
    if (activityList.length > 0) {
      localStorage.setItem("ActivityList", JSON.stringify(activityList))
    }}, [activityList]
  )

  useEffect(()=>{
    const storedActivity = localStorage.getItem('ActivityList');
    if(storedActivity){
      setActivityList(JSON.parse(storedActivity));
    }
  },[])
  
  return (
    <> 
    <div className='flex justify-center mt-5'>
      <input className='bg-gray-200 rounded-lg mr-4 text-center' type='text' placeholder='Text Here' value={activity} onChange={(e) => {setActivity(e.target.value)}}></input>
      <button className='bg-green-500 rounded-lg p-2 cursor-pointer' onClick={()=>addActivityList(activity)}>Add</button>
    </div>

    <div className='flex justify-center space-x-8 mt-5'>
      <button className='bg-red-500 rounded-lg p-2 cursor-pointer' onClick={()=>{
        setTab(1)
      }} >Incomplete</button>
      <button className='bg-green-500 rounded-lg p-2 cursor-pointer' onClick={()=>{
        setTab(2)
      }}>Completed</button>
      <button className='bg-blue-500 rounded-lg p-2 pl-8 pr-8 cursor-pointer' onClick={()=>{       
        setTab(0)
      }}>All</button>

    </div>

    <div className='justify-center flex flex-col mt-3 items-center'>
      {activityList
      .filter((activity) => tab === 0 || (tab === 1 && !activity.complete) || (tab === 2 && activity.complete))
      .map((activity, index) => (
        <div className='flex space-x-2 mt-2 '>
        <p key={index} className={`bg-gray-300 rounded-lg w-[300px] justify-center flex text-center items-center ${activity.complete == true ? "line-through text-gray-500" : ""} `}>{activity.title}</p>
        <button className='bg-red-500 p-2 rounded-lg cursor-pointer hover:animate-spin' onClick={()=>removeActivity(index)}>Delete</button>
        <button className={`bg-green-500 p-2 rounded-lg cursor-pointer hover:animate-spin ${activity.complete == true ? "invisible" :""}`} onClick={()=>changeActivityStatus(index)}>Completed</button>
        </div>
      ))}

    </div>


    {/* <div className='border-2 flex justify-center'>
      <button className='bg-green-500 rounded-l p-2 cursor-pointer' onClick={handleClick}>{activity}Add Count Button</button>
      <span className={`font-bold ${count > 0 ? "text-red-300" : 'text-green-100'}`}>{count} {count > 1 ? "counts" : "count"}</span>
    </div> */}
    </>

  )
}

export default App
