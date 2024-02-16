import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getInfo, postInfo} from '../api/api-request';
import { ApiResponse, IState } from "../interfaces/data";

export const fetchApi = createAsyncThunk <ApiResponse>(
  'api/fetchApi',
  async function () {
      const response = await getInfo();
      return response;
  }
)

export const postApi = createAsyncThunk <ApiResponse>(
  'api/postApi',
  async function () {
      const response = await postInfo(initialState.results.data);
      return response;
  }
)

const initialState:IState = {
  results: {data: [],
    teachers: []},
  loading: false,
  error: null
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addPodgroup(state, action){
      state.results.data[action.payload].countPodgroups = '2'
      state.results.data[action.payload].podgroups = [{
        ...state.results.data[action.payload].podgroups[0],
        countStudents: `${Math.round((Number(state.results.data[action.payload].studentsNumber) / 2))}`
      }, {
        ...state.results.data[action.payload].podgroups[0],
        countStudents: `${Number(state.results.data[action.payload].studentsNumber) - Math.round((Number(state.results.data[action.payload].studentsNumber) / 2))}`,
      }]
    },
    removePodgroup(state, action){
      state.results.data[action.payload].podgroups = [{
        ...state.results.data[action.payload].podgroups[0],
        countStudents: `${state.results.data[action.payload].studentsNumber}`
      }]
      state.results.data[action.payload].countPodgroups = '1'
    },
    addTeacher(state, action){
      state.results.data[action.payload.id].podgroups[action.payload.podgroup] = { ...state.results.data[action.payload.id].podgroups[action.payload.podgroup],
        [action.payload.studyType]: action.payload.teacherId
      }
    },
    pasteTeacher(state, action){
      state.results.data[action.payload.id].podgroups[action.payload.podgroup] = { ...state.results.data[action.payload.id].podgroups[action.payload.podgroup],
        laboratoryTeacher: state.results.data[action.payload.id].laboratoryHours != '0' ? action.payload.teacherId : '',
        lectureTeacher: state.results.data[action.payload.id].lecturesHours != '0' ? action.payload.teacherId : '',
        practiceTeacher: state.results.data[action.payload.id].practicHours != '0' ? action.payload.teacherId : '',
        seminarTeacher: state.results.data[action.payload.id].seminarHours != '0' ? action.payload.teacherId : '',
        examTeacher: state.results.data[action.payload.id].exam ? action.payload.teacherId : '',
        offsetTeacher: state.results.data[action.payload.id].offset ? action.payload.teacherId : '',
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.results = {data: [],
          teachers: []};
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchApi.rejected, (state, action) => {});
  },
});

export const {addPodgroup, removePodgroup, addTeacher, pasteTeacher} = apiSlice.actions
export default apiSlice.reducer;