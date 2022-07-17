// export const API_HOST_URL = window.location.hostname === 'localhost' ? "http://localhost:3020" : 'https://swarnratnaindia.com/dev-apiman';
export const API_HOST_URL = process.env.REACT_APP_API_URL;
export const API_MIDD = "/api";
export const API_MIDD_2 = "/users";
export const LOGIN_API = "/auth/user/login";
export const REGISTER_API = "/new-school-user";
export const EDIT_SCHOOL_API = "/edit-school";


export const API_ADMIN_URL = API_HOST_URL + API_MIDD
export const API_ADMIN_URL_2 = API_HOST_URL + API_MIDD_2
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
export const API_BASE_JAVA_URL = process.env.REACT_APP_API_BASE_JAVA_URL;
export const API_END_POINTS = {
	getCountry: 'api/country',
	getIndianState: 'api/indian-state',
	getInternationalCities: 'api/international-cities?countrycode=',
	getIndainSchools: 'api/search-indian-school',
	getInternationalSchools: 'api/search-international-school',
	getSchoolDetail: 'api/school-detail',
	saveNewSchool: 'api/new-user',
	login: "api/login",
	updateShoolData: "api/update-info",
	uploadStudantdata: 'api/upload',
	getStudantData: 'api/get-studant',
	payment: 'api/payment',

	getTimeSlot: 'api/get-slot',
	updatePaymentStatus: 'api/update-payment',
	bookSlot: 'api/update-studant-slot',
	getStudantStatus: 'api/get-studant-status',
	getpaymentdetails: 'api/getpaymentdetails',
	uploadApi: 'terry/uploadSchoolData',
	// slotting api endpoints
	isSlottingAllowed: 'api/isSlottingAllowed',
	getslots: 'terry/getSlotsData',
	submitslot: 'terry/updateSchoolSlotDetail',

	//  application status
	applicationStatus: 'api/applicationStatus',
	applicationIndStatus: 'api/applicationIndStatus',


	// payment api
	ispaymentallowed: 'api/ispaymentallowed',
	updatePaymentDetails: 'terry/updatePaymentDetails',

	insertPaymentDetails: 'terry/insertPaymentDetails',

	// otp:
	generateOtp: 'api/generateOtp',

	// register student.  for teri

	registerStudent: 'terry/registerStudent',
	studentLogin: 'api/studentLogin',
	viewIndividualStudentDetails: 'terry/viewIndividualStudentDetails',
	updateIndividualStudentDetails: 'terry/updateIndividualStudentDetails',
	getSlotsDataForIndividualStudent: 'terry/getSlotsDataForIndividualStudent',
	updateSlotsDataForIndividualStudent: 'terry/updateSlotsDataForIndividualStudent',
	// updateSchoolAndSlotDetail: 'terry/updateSchoolAndSlotDetail',
	sendEmailToCandidate: 'api/sendEmailToCandidate',
	getPaymentDetailsForIndividualStudent: 'terry/getPaymentDetailsForIndividualStudent',
	sendEmail: 'api/sendEmail',

	downloadExcelTemplate: 'terry/downloadExcelTemplate',

	checkpaymentDone: 'api/checkpaymentDone',
	isStudentUploadMax: 'api/isStudentUploadMax'



	// getCategory: 'api/get-category',
	// createTicket: 'api/create-help-ticket',
	// getAllTickets: 'api/get-ticket-by-id'



}