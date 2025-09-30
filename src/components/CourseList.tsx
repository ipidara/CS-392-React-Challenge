interface CourseListProps {
  courses: Record<string, {
    term: string;
    number: string;
    title: string;
    meets: string
  }>
}

const CourseList = ({ courses }: CourseListProps) => (
  <ul>
    {
        Object.entries(courses).map(([id, course]) => (
      <li key={id}>
        <div className="bg-[#e0e0e0] text-[#282c34] rounded-xl min-h-75 border-5 border-[#4a505f] text-left p-4">
          <h3 className="mx-5 mt-8 ml-4"> {course.term} CS {course.number} </h3>
          <p className="mt-3 text-2xl ml-4 mb-8 min-h-25 font-light"> {course.title} </p>
          <div className="border-t border-[#475161]">
            <p className="text-center text-xl mt-3 font-light"> 
              {course.meets}
            </p>
          </div>
        </div>
        
      </li>
      ))
     }
  </ul>
)

export default CourseList;