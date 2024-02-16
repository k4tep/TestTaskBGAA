interface IState {
  results: ApiResponse
  loading: boolean,
  error: null | boolean
}

export interface ApiResponse {
  data: IData[]
  teachers: ITeachers[]
}

export interface IData {
  additionalInfo: string
  countPodgroups: string
  course: string
  exam: boolean
  groupName: string
  laboratoryHours: string
  lecturesHours: string
  offset: boolean
  podgroups: IPodgroups[]
  practicHours: string
  semestr: string
  seminarHours: string
  studentsNumber: string
  subjectName: string
  uniqueId: string
}

export interface ITeachers {
  id: string
  name: string
}

export interface IPodgroups {
  countStudents: string
  examTeacher: string
  laboratoryTeacher: string
  lectureTeacher: string
  offsetTeacher: string
  practiceTeacher: string
  seminarTeacher: string
}

