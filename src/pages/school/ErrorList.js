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
		message2: "Please enter valid pin of length 6"
	},
	{
		fieldNam: "mobile",
		message: "Please enter mobile",
		status: false
	},
	{
		fieldNam: "email",
		message: "Please enter email",
		status: false,
		regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/,
		message2: "Please enter valid email",
	},
]
export default Error
