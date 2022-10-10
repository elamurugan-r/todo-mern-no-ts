export const GET = `${process.env.REACT_APP_END_POINT}/todos`;
export const POST = `${process.env.REACT_APP_END_POINT}/todos/add`;
export const UPDATE = (id) =>
  `${process.env.REACT_APP_END_POINT}/todos/update/${id}`;
export const COMPLETE = (id) =>
  `${process.env.REACT_APP_END_POINT}/todos/complete/${id}`;
export const DELETE = (id) =>
  `${process.env.REACT_APP_END_POINT}/todos/delete/${id}`;
