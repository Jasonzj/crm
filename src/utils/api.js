const api = '/api/v1'

export const signIn = `${api}/login`
export const signUp = `${api}/register`
export const getUserList = `${api}/userList`
export const getUserListPage = page => `${api}/userList?page=${page}`
export const getUserListUid = uid => `${api}/userList?uid=${uid}`
export const searchUser = name => `${api}/searchUser?eName=${name}`
export const editorUser = `${api}/editUser`
export const deleteUser = `${api}/deleteUser`
export const getUserBusiness = name => `${api}/searchBusiness?eName=${name}`
export const getCompanyBusiness = name => `${api}/searchBusiness?companyName=${name}`
export const getBusinessPage = page => `${api}/business?page=${page}`
export const deleteBusiness = `${api}/deleteBusiness`
export const editBusiness = `${api}/editBusiness`
export const addBusiness = `${api}/addBusiness`
export const getVisitPage = page => `${api}/visit?page=${page}`
export const getUserVisit = name => `${api}/searchVisit?eName=${name}`
export const getCompanyVisit = name => `${api}/searchVisit?companyName=${name}`
export const addVisit = `${api}/addVisit`
export const editorVisit = `${api}/editVisit`
export const deleteVisit = `${api}/deleteVisit`