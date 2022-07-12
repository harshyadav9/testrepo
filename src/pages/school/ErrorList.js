const Error = [
	{
		fieldNam: "principalName",
		message: "Please enter principalName",
		status: false
	},
	{
		fieldNam: "schoolName",
		message: "Please enter schoolName",
		status: false
	},
	{
		fieldNam: "country",
		message: "Please select country",
		status: false
	},
	{
		fieldNam: "state",
		message: "Please select state",
		status: false
	},
	{
		fieldNam: "pinCode",
		message: "Please enter pinCode",
		status: false,
		regex: /^.{6,}$/,
		message2: "Please enter valid pin code"
	},
	{
		fieldNam: "mobile",
		regex: /^\w{10}$/,
		message: "Please enter mobile",
		status: false,
		message2: "mobile length should be 10"
	},
	{
		fieldNam: "email",
		message: "Please enter email",
		status: false,
		regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
		message2: "Please enter valid email",
	},
	{
		fieldNam: "coordinatingTeacherEmail",
		message: "Please enter coordinating Teacher Email",
		status: false,
		regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/,
		message2: "Please enter valid coordinating Teacher Email",
	},
	{
		fieldNam: "phoneStd",
		message: "Please enter phone number",
		status: false
	},
	{
		fieldNam: "postalAddress",
		message: "Please enter postal address",
		status: false
	},
	{
		fieldNam: "district",
		message: "Please enter district",
		status: false
	},
	{
		fieldNam: "coordinatingTeacher",
		message: "Please enter coordinating Teacher",
		status: false
	},
	{
		fieldNam: "coordinatingTeacherMobile",
		message: "Please enter coordinating Teacher's Mobile",
		status: false
	},
]
export default Error
