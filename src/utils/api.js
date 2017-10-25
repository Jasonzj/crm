const api = '/api/v1'

export const signIn = `${api}/login`
export const getUserList = `${api}/userList`
export const getUserListPage = page => `${api}/userList?page=${page}`
export const getUserListUid = uid => `${api}/userList?uid=${uid}`
export const editorUser = `${api}/editUser`
export const deleteUser = `${api}/deleteUser`