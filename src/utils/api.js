const api = '/api/v1'

export const signIn = `${api}/login`
export const getUserList = `${api}/userList`
export const getUserListPage = page => `${api}/userList?page=${page}`
export const getUserListUid = uid => `${api}/userList?uid=${uid}`
export const searchUser = name => `${api}/searchUser?eName=${name}`
export const editorUser = `${api}/editUser`
export const deleteUser = `${api}/deleteUser`
export const getUserBusiness = name => `${api}/searchBusiness?eName=${name}`