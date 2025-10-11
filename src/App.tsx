// import { useState } from 'react'
import CourseList from './components/CourseList';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { useJsonQuery } from './utilities/fetch';

interface Course {
  term: string,
  number: string,
  title: string,
  meets: string,
};

interface CourseList {
  title: string,
  courses: Record<string, Course>;
};

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading courses: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading courses...</h1>;
  if (!json) return <h1>No course data found</h1>;

  const schedule  = json as CourseList

  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-[calc(10px_+_2vmin)] text-[#e0e0e0]">
        <Banner title={schedule.title} />
        <div className="mx-50 mt-10 gap-5">
          <TermPage courses={schedule.courses}/>
        </div>
      </header>
    </div>
  )
}

export default App;
